/**
 * SunuID SDK - Package d'intégration pour partenaires
 * 
 * @version 1.0.0
 * @author SunuID Team
 * @license MIT
 */

// Import QRCode pour génération de QR codes
import QRCode from 'qrcode';

(function(window) {
    'use strict';

    // Configuration par défaut
    const DEFAULT_CONFIG = {
        apiUrl: window.SunuIDConfig?.apiUrl || 'https://api.sunuid.fayma.sn',
        clientId: null,
        secretId: null,
        type: 1, // Type par défaut (1 = authentification)
        theme: 'light',
        language: 'fr',
        autoRefresh: true,
        refreshInterval: 30000, // 30 secondes
        onSuccess: null,
        onError: null,
        onStatusUpdate: null,
        onExpired: null
    };

    /**
     * Classe principale SunuID
     */
    class SunuID {
        constructor(config = {}) {
            this.config = { ...DEFAULT_CONFIG, ...config };
            this.qrCode = null;
            this.refreshTimer = null;
            this.isInitialized = false;
            this.socket = null;
            this.websocketRetryCount = 0;
            this.maxWebSocketRetries = 5;
            
            this.init();
        }

        /**
         * Initialisation du SDK
         */
        init() {
            if (!this.config.clientId || !this.config.secretId) {
                throw new Error('SunuID: clientId et secretId sont requis');
            }

            this.isInitialized = true;
            console.log('SunuID SDK initialisé avec succès');
            
            // Initialiser la connexion WebSocket
            this.initWebSocket();
        }

        /**
         * Initialiser la connexion WebSocket
         */
        initWebSocket() {
            try {
                // Vérifier si Socket.IO est disponible
                if (typeof io === 'undefined') {
                    this.websocketRetryCount++;
                    
                    if (this.websocketRetryCount <= this.maxWebSocketRetries) {
                        console.warn(`⚠️ Socket.IO non disponible (tentative ${this.websocketRetryCount}/${this.maxWebSocketRetries}), WebSocket sera initialisé plus tard`);
                        // Réessayer après un délai
                        setTimeout(() => this.initWebSocket(), 1000);
                    } else {
                        console.warn('⚠️ Socket.IO non disponible après plusieurs tentatives, WebSocket désactivé');
                    }
                    return;
                }
                
                // Obtenir l'IP du client (simulation)
                const ip = this.getClientIP();
                
                // Initialiser la connexion WebSocket si elle n'existe pas
                if (!this.socket) {
                    this.socket = io('wss://samasocket.fayma.sn:9443', {
                        query: {
                            token: this.config.clientId,
                            type: 'web',
                            userId: this.config.clientId,
                            username: ip
                        }
                    });

                    // Gestion des événements WebSocket
                    this.socket.on('connect', () => {
                        console.log('🌐 WebSocket connecté avec succès');
                        console.log('📊 Socket ID:', this.socket.id);
                    });

                    this.socket.on('disconnect', (reason) => {
                        console.log('❌ WebSocket déconnecté:', reason);
                    });

                    this.socket.on('connect_error', (error) => {
                        console.error('❌ Erreur connexion WebSocket:', error);
                    });

                    // Écouter les événements spécifiques
                    this.socket.on('qr_status_update', (data) => {
                        console.log('📱 Mise à jour statut QR reçue:', data);
                        this.handleQRStatusUpdate(data);
                    });

                    this.socket.on('qr_scan_success', (data) => {
                        console.log('✅ Scan QR réussi reçu:', data);
                        this.handleQRScanSuccess(data);
                    });

                    this.socket.on('qr_expired', (data) => {
                        console.log('⏰ QR expiré reçu:', data);
                        this.handleQRExpired(data);
                    });
                }
            } catch (error) {
                console.error('❌ Erreur initialisation WebSocket:', error);
            }
        }

        /**
         * Obtenir l'IP du client (simulation)
         */
        getClientIP() {
            // Simulation - en production, vous pourriez utiliser un service d'IP
            return '127.0.0.1';
        }

        /**
         * Gérer la mise à jour du statut QR
         */
        handleQRStatusUpdate(data) {
            if (this.config.onStatusUpdate) {
                this.config.onStatusUpdate(data);
            }
        }

        /**
         * Gérer le succès du scan QR
         */
        handleQRScanSuccess(data) {
            if (this.config.onSuccess) {
                this.config.onSuccess(data);
            }
        }

        /**
         * Gérer l'expiration du QR
         */
        handleQRExpired(data) {
            if (this.config.onExpired) {
                this.config.onExpired(data);
            }
        }

        /**
         * Émettre un événement WebSocket
         */
        emitWebSocketEvent(event, data) {
            if (this.socket && this.socket.connected) {
                this.socket.emit(event, data);
                console.log(`📤 Événement WebSocket émis: ${event}`, data);
            } else if (typeof io === 'undefined') {
                console.warn('⚠️ Socket.IO non disponible, impossible d\'émettre l\'événement:', event);
            } else {
                console.warn('⚠️ WebSocket non connecté, impossible d\'émettre l\'événement:', event);
            }
        }

        /**
         * Obtenir le statut de la connexion WebSocket
         */
        getWebSocketStatus() {
            if (!this.socket) {
                return 'not_initialized';
            }
            return this.socket.connected ? 'connected' : 'disconnected';
        }

        /**
         * Forcer l'initialisation WebSocket (si Socket.IO devient disponible plus tard)
         */
        forceWebSocketInit() {
            if (typeof io !== 'undefined' && !this.socket) {
                console.log('🔄 Forçage de l\'initialisation WebSocket...');
                this.initWebSocket();
            }
        }

        /**
         * Générer un QR code avec le type configuré
         */
        async generateQR(containerId, options = {}) {
            if (!this.isInitialized) {
                throw new Error('SunuID: SDK non initialisé');
            }

            try {
                const response = await this.makeRequest('/qr-generate', {
                    type: this.config.type, // Utilise le type configuré
                    ...options
                });

                if (response.success) {
                    // Construire l'URL complète de l'image QR avec la base URL pour les images
                    const imageBaseUrl = 'https://sunuid.fayma.sn';
                    const qrImageUrl = `${imageBaseUrl}${response.data.qrcode}`;
                    await this.displayQRCode(containerId, qrImageUrl, this.config.type, options);
                    this.startAutoRefresh(containerId, this.config.type, options);
                    
                    // Émettre un événement WebSocket pour la génération du QR
                    this.emitWebSocketEvent('qr_generated', {
                        serviceId: response.data.service_id,
                        type: this.config.type,
                        qrCodeUrl: qrImageUrl,
                        timestamp: Date.now()
                    });
                    
                    return {
                        ...response.data,
                        qrCodeUrl: qrImageUrl,
                        sessionId: response.data.service_id
                    };
                } else {
                    throw new Error(response.message || 'Erreur lors de la génération du QR code');
                }
            } catch (error) {
                console.error('Erreur API détectée:', error.message);
                console.log('Affichage du message "Service non disponible" pour type ' + this.config.type);
                this.displayServiceUnavailable(containerId, this.config.type);
                throw new Error('Service non disponible');
            }
        }



        /**
         * Générer un QR code avec un type personnalisé
         */
        async generateCustomQR(containerId, type, options = {}) {
            if (!this.isInitialized) {
                throw new Error('SunuID: SDK non initialisé');
            }

            try {
                const response = await this.makeRequest('/qr-generate', {
                    type: type, // Type personnalisé (1, 2, 3, etc.)
                    ...options
                });

                if (response.success) {
                    // Construire l'URL complète de l'image QR avec la base URL pour les images
                    const imageBaseUrl = 'https://sunuid.fayma.sn';
                    const qrImageUrl = `${imageBaseUrl}${response.data.qrcode}`;
                    await this.displayQRCode(containerId, qrImageUrl, type, options);
                    this.startAutoRefresh(containerId, type, options);
                    return {
                        ...response.data,
                        qrCodeUrl: qrImageUrl,
                        sessionId: response.data.service_id
                    };
                } else {
                    throw new Error(response.message || 'Erreur lors de la génération du QR code');
                }
            } catch (error) {
                console.error('Erreur API détectée:', error.message);
                console.log('Affichage du message "Service non disponible" pour type ' + type);
                this.displayServiceUnavailable(containerId, type);
                throw new Error('Service non disponible');
            }
        }

        // Alias pour maintenir la compatibilité
        async generateAuthQR(containerId, options = {}) {
            return this.generateQR(containerId, options);
        }

        async generateKYCQR(containerId, options = {}) {
            // Sauvegarder le type actuel
            const originalType = this.config.type;
            // Changer temporairement le type pour KYC
            this.config.type = 2;
            try {
                return await this.generateQR(containerId, options);
            } finally {
                // Restaurer le type original
                this.config.type = originalType;
            }
        }

        /**
         * Vérifier le statut d'un QR code
         */
        async checkQRStatus(sessionId) {
            if (!this.isInitialized) {
                throw new Error('SunuID: SDK non initialisé');
            }

            try {
                const response = await this.makeRequest('/qr-status', {
                    serviceId: sessionId
                });

                if (response.success) {
                    return response.data;
                } else {
                    throw new Error(response.message || 'Erreur lors de la vérification du statut');
                }
            } catch (error) {
                this.handleError(error);
                throw error;
            }
        }

        /**
         * Afficher un QR code personnalisé dans un conteneur
         */
        async displayQRCode(containerId, qrUrl, type, options = {}) {
            const container = document.getElementById(containerId);
            if (!container) {
                throw new Error(`Conteneur avec l'ID "${containerId}" non trouvé`);
            }

            // Nettoyer le conteneur
            container.innerHTML = '';

            try {
                // Générer le contenu du QR code
                const socketId = this.socket ? this.socket.id : 'no-socket';
                const qrContent = `code-${socketId}`;
                
                // Nom du partenaire (peut être configuré)
                const partnerName = options.partnerName || 'SunuID';
                const labelText = `type-${partnerName}`;

                // Générer le QR code avec QRCode.js
                const qrDataUrl = await QRCode.toDataURL(qrContent, {
                    width: 200,
                    margin: 2,
                    color: {
                        dark: '#000000',
                        light: '#FFFFFF'
                    }
                });

                // Créer l'élément QR code personnalisé
                const qrElement = document.createElement('div');
                qrElement.className = 'sunuid-qr-code';
                qrElement.innerHTML = `
                    <div class="sunuid-qr-header">
                        <h3>${type === 1 ? 'Authentification' : type === 2 ? 'Vérification KYC' : type === 3 ? 'Service Type 3' : 'Service Type ' + type}</h3>
                    </div>
                    <div class="sunuid-qr-image">
                        <div class="sunuid-qr-wrapper" style="position: relative; display: inline-block;">
                            <img src="${qrDataUrl}" alt="QR Code SunuID" style="max-width: 300px; height: auto;">
                            <div class="sunuid-qr-center-logo" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); background: white; border-radius: 50%; padding: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                                <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="20" cy="20" r="18" fill="#007bff" stroke="#0056b3" stroke-width="2"/>
                                    <path d="M12 16 L16 16 L16 20 L20 20 L20 24 L16 24 L16 28 L12 28 Z" fill="white"/>
                                    <path d="M24 12 L28 12 L28 16 L24 16 Z" fill="white"/>
                                    <path d="M24 24 L28 24 L28 28 L24 28 Z" fill="white"/>
                                    <path d="M28 16 L32 16 L32 20 L28 20 Z" fill="white"/>
                                </svg>
                            </div>
                            <div class="sunuid-qr-label" style="position: absolute; bottom: -30px; left: 50%; transform: translateX(-50%); background: #007bff; color: white; padding: 4px 12px; border-radius: 15px; font-size: 12px; font-weight: bold;">
                                <span class="sunuid-label-text">${labelText}</span>
                            </div>
                        </div>
                    </div>
                    <div class="sunuid-qr-instructions">
                        <p>Scannez ce QR code avec l'application SunuID pour vous connecter</p>
                    </div>
                    <div class="sunuid-qr-status" id="sunuid-status">
                        <p>En attente de scan...</p>
                    </div>
                `;

                container.appendChild(qrElement);

                // Appliquer le thème
                this.applyTheme(options.theme || this.config.theme);

                console.log('🎨 QR code personnalisé généré:', {
                    content: qrContent,
                    label: labelText,
                    socketId: socketId
                });

            } catch (error) {
                console.error('❌ Erreur génération QR code:', error);
                
                // Fallback vers l'image originale
                const qrElement = document.createElement('div');
                qrElement.className = 'sunuid-qr-code';
                qrElement.innerHTML = `
                    <div class="sunuid-qr-header">
                        <h3>${type === 1 ? 'Authentification' : type === 2 ? 'Vérification KYC' : type === 3 ? 'Service Type 3' : 'Service Type ' + type}</h3>
                    </div>
                    <div class="sunuid-qr-image">
                        <img src="${qrUrl}" alt="QR Code SunuID" style="max-width: 300px; height: auto;">
                    </div>
                    <div class="sunuid-qr-instructions">
                        <p>Scannez ce QR code avec l'application SunuID pour vous connecter</p>
                    </div>
                    <div class="sunuid-qr-status" id="sunuid-status">
                        <p>En attente de scan...</p>
                    </div>
                `;

                container.appendChild(qrElement);
                this.applyTheme(options.theme || this.config.theme);
            }
        }

        /**
         * Afficher "Service non disponible"
         */
        displayServiceUnavailable(containerId, type) {
            console.log(`displayServiceUnavailable appelée pour ${containerId}, type: ${type}`);
            const container = document.getElementById(containerId);
            if (!container) {
                console.error(`Container ${containerId} non trouvé`);
                return;
            }

            container.innerHTML = `
                <div class="sunuid-service-unavailable" style="
                    text-align: center;
                    padding: 40px 20px;
                    background: #f8f9fa;
                    border: 2px dashed #dee2e6;
                    border-radius: 10px;
                    color: #6c757d;
                    font-family: Arial, sans-serif;
                ">
                    <div style="font-size: 48px; margin-bottom: 20px;">⚠️</div>
                    <h3 style="margin: 0 0 10px 0; color: #495057;">Service Non Disponible</h3>
                    <p style="margin: 0; font-size: 14px;">
                        Le service d'authentification est temporairement indisponible.<br>
                        Veuillez réessayer plus tard.
                    </p>
                    <div style="margin-top: 20px; font-size: 12px; color: #adb5bd;">
                        Type: ${type.toUpperCase()}
                    </div>
                </div>
            `;
        }

        /**
         * Rafraîchir un QR code
         */
        async refreshQR(containerId, options = {}) {
            try {
                const result = await this.generateQR(containerId, options);
                return result;
            } catch (error) {
                console.error('Erreur lors du rafraîchissement:', error.message);
                this.displayServiceUnavailable(containerId, this.config.type);
                throw error;
            }
        }

        /**
         * Démarrer le rafraîchissement automatique
         */
        startAutoRefresh(containerId, type, options) {
            if (!this.config.autoRefresh) return;

            this.refreshTimer = setInterval(async () => {
                try {
                    await this.refreshQR(containerId, type, options);
                } catch (error) {
                    console.warn('Erreur lors du rafraîchissement automatique:', error);
                }
            }, this.config.refreshInterval);
        }

        /**
         * Démarrer le timer de compte à rebours
         */


        /**
         * Effectuer une requête API
         */
        async makeRequest(endpoint, data) {
            // Utiliser l'endpoint depuis la configuration si disponible
            const endpointPath = window.SunuIDConfig?.endpoints?.[endpoint.replace('/', '')] || endpoint;
            const url = `${this.config.apiUrl}${endpointPath}`;
            
            // Log pour déboguer l'envoi du type
            if (data.type !== undefined) {
                console.log(`🌐 Envoi requête API - Type: ${data.type}, Endpoint: ${endpoint}`);
            }
            
            try {
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${this.config.clientId}:${this.config.secretId}`,
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify({
                        ...data,
                        client_id: this.config.clientId,
                        secret_id: this.config.secretId
                    })
                });

                if (!response.ok) {
                    const errorText = await response.text();
                    let errorData;
                    try {
                        errorData = JSON.parse(errorText);
                    } catch (e) {
                        errorData = { message: errorText };
                    }
                    
                    throw new Error(errorData.message || `Erreur HTTP: ${response.status}`);
                }

                const result = await response.json();
                return result;
            } catch (error) {
                console.error('Erreur API SunuID:', error);
                throw error;
            }
        }

        /**
         * Appliquer le thème
         */
        applyTheme(theme) {
            const container = document.querySelector('.sunuid-qr-code');
            if (container) {
                container.className = `sunuid-qr-code sunuid-theme-${theme}`;
            }
        }

        /**
         * Gérer les erreurs
         */
        handleError(error) {
            console.error('SunuID SDK Error:', error);
            
            if (this.config.onError) {
                this.config.onError(error);
            }
        }

        /**
         * Nettoyer les ressources
         */
        destroy() {
            if (this.refreshTimer) {
                clearInterval(this.refreshTimer);
            }
            
            // Fermer la connexion WebSocket
            if (this.socket) {
                this.socket.disconnect();
                this.socket = null;
                console.log('🌐 WebSocket déconnecté');
            }
            
            this.isInitialized = false;
            console.log('SunuID SDK détruit');
        }
    }

    // Exposer la classe globalement
    window.SunuID = SunuID;
    window.sunuidInstance = null;

    // Fonction d'initialisation globale
    window.initSunuID = function(config) {
        try {
            window.sunuidInstance = new SunuID(config);
            return window.sunuidInstance;
        } catch (error) {
            console.error('Erreur lors de l\'initialisation de SunuID:', error);
            throw error;
        }
    };

})(window); 