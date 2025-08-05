/**
 * SunuID SDK - Package d'intégration pour partenaires
 * 
 * @version 1.0.0
 * @author SunuID Team
 * @license MIT
 */

(function(window) {
    'use strict';

    // Configuration par défaut
    const DEFAULT_CONFIG = {
        apiUrl: window.SunuIDConfig?.apiUrl || 'https://api.sunuid.fayma.sn',
        clientId: null,
        secretId: null,
        type: 2, // Type par défaut (2 = authentification)
        partnerName: 'SunuID', // Nom du partenaire par défaut
        theme: 'light',
        language: 'fr',
        autoRefresh: true,
        refreshInterval: 30000, // 30 secondes
        onSuccess: null,
        onError: null,
        onStatusUpdate: null,
        onExpired: null,
        // Nouvelles options de sécurité
        enableSecurityLogs: true,
        validateInputs: true,
        maxRetries: 3,
        requestTimeout: 10000, // 10 secondes
        // Options d'initialisation sécurisée
        secureInit: false,
        secureInitUrl: (() => {
            if (window.SunuIDConfig?.apiUrl?.includes('api.sunuid.fayma.sn')) {
                return 'https://api.sunuid.fayma.sn/secure-init.php';
            }
            return window.SunuIDConfig?.apiUrl?.replace('/api', '') + '/secure-init.php' || 'https://api.sunuid.fayma.sn/secure-init.php';
        })(),
        token: null
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
            
            // Initialisation asynchrone
            this.initPromise = this.init();
        }

        /**
         * Initialisation du SDK
         */
        async init() {
            try {
                // Initialisation sécurisée si activée
                if (this.config.secureInit) {
                    await this.secureInit();
                } else {
                    // Validation sécurisée des paramètres
                    if (this.config.validateInputs) {
                        this.validateSecurityParams();
                    }
                }

                // Log de sécurité pour l'initialisation
                this.logSecurityEvent('SDK_INIT_START', {
                    apiUrl: this.config.apiUrl,
                    type: this.config.type,
                    partnerName: this.config.partnerName,
                    secureInit: this.config.secureInit
                });

                // Obscurcir les credentials dans les logs
                this.obfuscateCredentials();

                this.isInitialized = true;
                console.log('SunuID SDK initialisé avec succès');
                
                this.logSecurityEvent('SDK_INIT_SUCCESS');
                
                // Initialiser la connexion WebSocket
                this.initWebSocket();
                
            } catch (error) {
                this.logSecurityEvent('SDK_INIT_ERROR', { error: error.message });
                throw error;
            }
        }

        /**
         * Initialisation sécurisée via PHP
         */
        async secureInit() {
            try {
                this.logSecurityEvent('SECURE_INIT_START');
                
                const initData = {
                    type: this.config.type,
                    partnerName: this.config.partnerName,
                    theme: this.config.theme
                };

                const response = await fetch(this.config.secureInitUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify(initData)
                });

                if (!response.ok) {
                    throw new Error(`Erreur HTTP: ${response.status}`);
                }

                const result = await response.json();
                
                if (!result.success) {
                    throw new Error(result.error || 'Erreur lors de l\'initialisation sécurisée');
                }

                // Stocker le token et les données sécurisées
                this.config.token = result.data.token;
                this.config.apiUrl = result.data.api_url;
                
                // Décoder le token pour récupérer les credentials
                const decodedToken = this.decodeSecureToken(result.data.token);
                if (decodedToken) {
                    this.config.clientId = decodedToken.client_id;
                    this.config.secretId = decodedToken.secret_id;
                } else {
                    throw new Error('Impossible de décoder le token sécurisé');
                }
                
                this.config.expiresIn = result.data.expires_in;
                this.config.maxRequests = result.data.max_requests;
                this.config.requestCount = 0;

                this.logSecurityEvent('SECURE_INIT_SUCCESS', {
                    expiresIn: result.data.expires_in,
                    maxRequests: result.data.max_requests
                });

                console.log('✅ Initialisation sécurisée réussie');
                
            } catch (error) {
                this.logSecurityEvent('SECURE_INIT_ERROR', { error: error.message });
                throw new Error(`Échec de l'initialisation sécurisée: ${error.message}`);
            }
        }

        /**
         * Décoder le token sécurisé
         */
        decodeSecureToken(token) {
            try {
                const parts = token.split('.');
                if (parts.length !== 2) {
                    console.error('❌ Format de token invalide');
                    return null;
                }
                
                const [payload, signature] = parts;
                
                // Décoder le payload (base64)
                const decodedPayload = atob(payload);
                const tokenData = JSON.parse(decodedPayload);
                
                // Vérifier l'expiration
                if (tokenData.exp && tokenData.exp < Date.now() / 1000) {
                    console.error('❌ Token expiré');
                    return null;
                }
                
                console.log('✅ Token décodé avec succès');
                return tokenData;
                
            } catch (error) {
                console.error('❌ Erreur décodage token:', error);
                return null;
            }
        }

        /**
         * Initialiser la connexion WebSocket
         */
        initWebSocket() {
            try {
                // Vérifier si Socket.IO est disponible
                if (typeof io === 'undefined') {
                    console.warn('⚠️ Socket.IO non disponible, WebSocket sera initialisé plus tard');
                    // Réessayer après un délai
                    setTimeout(() => this.initWebSocket(), 1000);
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
         * Obtenir le nom du type à partir du numéro
         */
        getTypeName(type) {
            switch(type) {
                case 1: return 'KYC';
                case 2: return 'AUTH';
                case 3: return 'SIGNATURE';
                default: return `TYPE-${type}`;
            }
        }

        /**
         * Validation sécurisée des paramètres
         */
        validateSecurityParams() {
            const errors = [];
            
            // Validation du clientId
            if (!this.config.clientId || typeof this.config.clientId !== 'string') {
                errors.push('clientId invalide ou manquant');
            } else if (this.config.clientId.length < 10) {
                errors.push('clientId trop court');
            }
            
            // Validation du secretId
            if (!this.config.secretId || typeof this.config.secretId !== 'string') {
                errors.push('secretId invalide ou manquant');
            } else if (this.config.secretId.length < 32) {
                errors.push('secretId trop court (minimum 32 caractères)');
            }
            
            // Validation de l'URL API
            if (!this.config.apiUrl || !this.isValidUrl(this.config.apiUrl)) {
                errors.push('apiUrl invalide');
            }
            
            // Validation du type
            if (![1, 2, 3].includes(this.config.type)) {
                errors.push('type invalide (doit être 1, 2 ou 3)');
            }
            
            if (errors.length > 0) {
                this.logSecurityEvent('VALIDATION_ERROR', { errors });
                throw new Error(`Paramètres de sécurité invalides: ${errors.join(', ')}`);
            }
            
            this.logSecurityEvent('VALIDATION_SUCCESS');
        }

        /**
         * Validation d'URL sécurisée
         */
        isValidUrl(string) {
            try {
                const url = new URL(string);
                return url.protocol === 'https:' || url.protocol === 'http:';
            } catch (_) {
                return false;
            }
        }

        /**
         * Logs de sécurité
         */
        logSecurityEvent(event, data = {}) {
            if (!this.config.enableSecurityLogs) return;
            
            const securityLog = {
                timestamp: new Date().toISOString(),
                event: event,
                data: data,
                userAgent: navigator.userAgent,
                url: window.location.href
            };
            
            console.warn('🔒 [SECURITY]', securityLog);
            
            // Stocker les logs de sécurité (optionnel)
            if (!window.SunuIDSecurityLogs) {
                window.SunuIDSecurityLogs = [];
            }
            window.SunuIDSecurityLogs.push(securityLog);
        }

        /**
         * Chiffrement simple des credentials (pour éviter l'exposition en clair)
         */
        obfuscateCredentials() {
            // Stocker les vraies valeurs pour les logs de sécurité
            this.config.originalClientId = this.config.clientId;
            this.config.originalSecretId = this.config.secretId;
            
            // Créer des versions obfusquées pour l'affichage uniquement
            if (this.config.clientId) {
                this.config.clientIdDisplay = this.config.clientId.replace(/(.{3}).*(.{3})/, '$1***$2');
            }
            if (this.config.secretId) {
                this.config.secretIdDisplay = this.config.secretId.replace(/(.{4}).*(.{4})/, '$1***$2');
            }
        }

        /**
         * Validation des entrées utilisateur
         */
        sanitizeInput(input) {
            if (typeof input !== 'string') return input;
            
            // Protection contre les injections XSS basiques
            return input
                .replace(/[<>]/g, '') // Supprimer les balises HTML
                .replace(/javascript:/gi, '') // Supprimer les protocoles dangereux
                .trim();
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
            // Attendre l'initialisation si nécessaire
            if (this.initPromise) {
                await this.initPromise;
                this.initPromise = null;
            }
            
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
                    this.currentQRUrl = qrImageUrl; // Stocker l'URL pour getQRCode()
                    this.displayQRCode(containerId, qrImageUrl, this.config.type, options);
                    
                    // Générer le QR code personnalisé avec le type + code de l'API + socket ID
                    if (this.pendingQRInfo && response.data.code) {
                        // Attendre que le socket ID soit bien défini
                        const waitForSocketId = () => {
                            if (this.socket && this.socket.id && this.socket.id !== 'unknown') {
                                const socketId = this.socket.id;
                                const qrContent = `${this.config.type}-${response.data.code}-${socketId}`;
                                
                                // Utiliser le partnerName de la réponse API et le nom du type
                                const partnerName = response.data.partnerName || this.config.partnerName || 'SunuID';
                                const typeName = this.getTypeName(this.config.type);
                                const qrLabel = `${typeName} - ${partnerName}`;
                                
                                this.generateCustomQRCode(qrContent, qrLabel, this.pendingQRInfo.options);
                                this.pendingQRInfo = null; // Nettoyer
                            } else {
                                // Réessayer après un délai si le socket ID n'est pas encore disponible
                                setTimeout(waitForSocketId, 100);
                            }
                        };
                        
                        waitForSocketId();
                    }
                    
                    this.startAutoRefresh(containerId, this.config.type, options);
                    
                    // Émettre un événement WebSocket pour la génération du QR
                    this.emitWebSocketEvent('qr_generated', {
                        serviceId: response.data.service_id,
                        type: this.config.type,
                        qrCodeUrl: qrImageUrl,
                        code: response.data.code,
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
                console.error('Stack trace complet:', error.stack);
                console.error('Configuration SDK:', {
                    apiUrl: this.config.apiUrl,
                    type: this.config.type,
                    secureInit: this.config.secureInit,
                    clientId: this.config.clientId ? '***' + this.config.clientId.slice(-4) : 'null',
                    secretId: this.config.secretId ? '***' + this.config.secretId.slice(-4) : 'null'
                });
                console.log('Affichage du message "Service non disponible" pour type ' + this.config.type);
                this.displayServiceUnavailable(containerId, this.config.type);
                throw new Error('Service non disponible');
            }
        }



        /**
         * Générer un QR code avec un type personnalisé
         */
        async generateCustomQR(containerId, type, options = {}) {
            // Attendre l'initialisation si nécessaire
            if (this.initPromise) {
                await this.initPromise;
                this.initPromise = null;
            }
            
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
                    this.displayQRCode(containerId, qrImageUrl, type, options);
                    
                    // Générer le QR code personnalisé avec le type + code de l'API + socket ID
                    if (this.pendingQRInfo && response.data.code) {
                        // Attendre que le socket ID soit bien défini
                        const waitForSocketId = () => {
                            if (this.socket && this.socket.id && this.socket.id !== 'unknown') {
                                const socketId = this.socket.id;
                                const qrContent = `${type}-${response.data.code}-${socketId}`;
                                
                                // Utiliser le partnerName de la réponse API et le nom du type
                                const partnerName = response.data.partnerName || this.config.partnerName || 'SunuID';
                                const typeName = this.getTypeName(type);
                                const qrLabel = `${typeName} - ${partnerName}`;
                                
                                this.generateCustomQRCode(qrContent, qrLabel, this.pendingQRInfo.options);
                                this.pendingQRInfo = null; // Nettoyer
                            } else {
                                // Réessayer après un délai si le socket ID n'est pas encore disponible
                                setTimeout(waitForSocketId, 100);
                            }
                        };
                        
                        waitForSocketId();
                    }
                    
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
                console.error('Stack trace complet:', error.stack);
                console.error('Configuration SDK (Custom):', {
                    apiUrl: this.config.apiUrl,
                    type: type,
                    secureInit: this.config.secureInit,
                    clientId: this.config.clientId ? '***' + this.config.clientId.slice(-4) : 'null',
                    secretId: this.config.secretId ? '***' + this.config.secretId.slice(-4) : 'null'
                });
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
            this.config.type = 1;
            try {
                return await this.generateQR(containerId, options);
            } finally {
                // Restaurer le type original
                this.config.type = originalType;
            }
        }

        async generateSignatureQR(containerId, options = {}) {
            // Sauvegarder le type actuel
            const originalType = this.config.type;
            // Changer temporairement le type pour Signature
            this.config.type = 3;
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
         * Afficher un QR code dans un conteneur
         */
        displayQRCode(containerId, qrUrl, type, options = {}) {
            const container = document.getElementById(containerId);
            if (!container) {
                throw new Error(`Conteneur avec l'ID "${containerId}" non trouvé`);
            }

            // Nettoyer le conteneur
            container.innerHTML = '';

            // Créer l'élément QR code
            const qrElement = document.createElement('div');
            qrElement.className = 'sunuid-qr-code';
            
            // Afficher un loader en attendant la réponse API et la connexion socket
            const typeName = this.getTypeName(type);
            qrElement.innerHTML = `
                <div class="sunuid-qr-header">
                    <h3>${type === 1 ? 'Vérification KYC' : type === 2 ? 'Authentification' : type === 3 ? 'Signature' : 'Service Type ' + type}</h3>
                </div>
                <div class="sunuid-qr-image" id="sunuid-qr-container">
                    <div style="text-align: center; padding: 40px;">
                        <div class="sunuid-loader">
                            <div class="sunuid-spinner"></div>
                            <p style="margin-top: 20px; color: #666;">Initialisation en cours...</p>
                            <p style="font-size: 12px; color: #999; margin-top: 10px;">Connexion API et WebSocket</p>
                            <p style="font-size: 11px; color: #ccc; margin-top: 5px;">Attente du Socket ID...</p>
                        </div>
                    </div>
                </div>
                <div class="sunuid-qr-instructions" style="display: none;">
                    <p>Scannez ce QR code avec l'application ${this.config.partnerName} pour vous connecter</p>
                </div>
                <div class="sunuid-qr-status" id="sunuid-status" style="display: none;">
                    <p>En attente de scan...</p>
                </div>
            `;

            container.appendChild(qrElement);

            // Stocker les informations pour la génération ultérieure
            this.pendingQRInfo = {
                containerId,
                type,
                options
            };

            // Appliquer le thème
            this.applyTheme(options.theme || this.config.theme);
        }

        /**
         * Générer un QR code personnalisé avec PHP Endroid
         */
        async generateCustomQRCode(content, label, options = {}) {
            try {
                console.log('🎨 Début génération QR personnalisé avec PHP...');
                console.log('📄 Contenu:', content);
                console.log('🏷️ Label:', label);
                
                const qrContainer = document.getElementById('sunuid-qr-container');
                if (!qrContainer) {
                    console.error('❌ QR container not found');
                    this.displayFallbackImage();
                    return;
                }
                
                console.log('✅ QR container trouvé');

                // Nettoyer le conteneur
                qrContainer.innerHTML = '<div style="text-align: center; padding: 20px;"><p>Génération QR code avec PHP...</p></div>';

                // Appeler l'endpoint PHP
                console.log('🔄 Appel endpoint PHP...');
                // Construire l'URL du QR generator de manière plus robuste
                let qrGeneratorUrl;
                if (this.config.apiUrl.includes('api.sunuid.fayma.sn')) {
                    qrGeneratorUrl = 'https://api.sunuid.fayma.sn/qr-generator.php';
                } else {
                    qrGeneratorUrl = this.config.apiUrl.replace('/api', '') + '/qr-generator.php';
                }
                console.log('🔗 URL QR Generator:', qrGeneratorUrl);
                const response = await fetch(qrGeneratorUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify({
                        content: content,
                        label: label,
                        size: 300,
                        margin: 10
                    })
                });
                
                console.log('📥 Réponse PHP reçue - Status:', response.status);
                
                if (!response.ok) {
                    throw new Error(`Erreur HTTP: ${response.status}`);
                }
                
                const responseData = await response.json();
                
                if (!responseData.success) {
                    throw new Error(`Erreur PHP: ${responseData.error}`);
                }
                
                console.log('✅ QR code généré par PHP avec succès');
                console.log('📊 Taille:', responseData.data.size + 'px');
                console.log('📊 Longueur base64:', responseData.data.length + ' caractères');

                // Stocker l'URL du QR code pour getQRCode()
                this.currentQRUrl = responseData.data.dataUrl;
                
                // Créer le conteneur avec le QR code PHP
                qrContainer.innerHTML = `
                    <div class="sunuid-qr-ready" style="text-align: center; padding: 20px;">
                        <img src="${responseData.data.dataUrl}" alt="QR Code ${this.config.partnerName}" style="max-width: 300px; border: 2px solid #ddd; border-radius: 10px;">
                    </div>
                `;
                
                // Afficher les instructions et le statut maintenant que le QR est prêt
                const instructionsElement = qrContainer.parentElement.querySelector('.sunuid-qr-instructions');
                const statusElement = qrContainer.parentElement.querySelector('.sunuid-qr-status');
                
                if (instructionsElement) {
                    instructionsElement.style.display = 'block';
                    instructionsElement.classList.add('sunuid-qr-ready');
                }
                if (statusElement) {
                    statusElement.style.display = 'block';
                    statusElement.classList.add('sunuid-qr-ready');
                }
                
                console.log('✅ QR code PHP affiché dans le conteneur');

            } catch (error) {
                console.error('❌ Erreur génération QR PHP:', error);
                console.error('Stack trace:', error.stack);
                
                // Détecter les erreurs CORS ou 404 pour activer le fallback côté client
                if (error.message.includes('Failed to fetch') || 
                    error.message.includes('CORS') || 
                    error.message.includes('404') ||
                    error.message.includes('Not Found')) {
                    console.warn('🚫 Erreur PHP détectée (CORS/404), tentative de génération QR côté client...');
                    this.generateQRCodeClientSide(content, label, qrContainer);
                } else {
                    this.displayFallbackImage();
                }
            }
        }

        /**
         * Générer un QR code côté client en cas d'erreur CORS
         */
        generateQRCodeClientSide(content, label, qrContainer) {
            try {
                console.log('🎨 Génération QR côté client...');
                
                // Vérifier si QRCode est disponible
                if (typeof QRCode === 'undefined') {
                    console.error('❌ QRCode library non disponible');
                    this.displayFallbackImage();
                    return;
                }
                
                // Créer un canvas pour le QR code
                const canvas = document.createElement('canvas');
                canvas.width = 300;
                canvas.height = 320; // Plus d'espace pour le label
                const ctx = canvas.getContext('2d');
                
                // Remplir le fond en blanc
                ctx.fillStyle = '#FFFFFF';
                ctx.fillRect(0, 0, 300, 320);
                
                // Générer le QR code avec QRCode library
                QRCode.toCanvas(canvas, content, {
                    width: 280,
                    margin: 10,
                    color: {
                        dark: '#000000',
                        light: '#FFFFFF'
                    }
                }, (error) => {
                    if (error) {
                        console.error('❌ Erreur génération QR côté client:', error);
                        this.displayFallbackImage();
                        return;
                    }
                    
                    // Ajouter le label en bas du QR code (sans afficher le contenu)
                    ctx.fillStyle = '#333333';
                    ctx.font = 'bold 14px Arial';
                    ctx.textAlign = 'center';
                    ctx.fillText(label, 150, 305);
                    
                    // Convertir en data URL
                    const dataUrl = canvas.toDataURL('image/png');
                    
                    // Stocker l'URL du QR code pour getQRCode()
                    this.currentQRUrl = dataUrl;
                    
                    // Afficher le QR code (sans le contenu)
                    qrContainer.innerHTML = `
                        <div class="sunuid-qr-ready" style="text-align: center; padding: 20px;">
                            <img src="${dataUrl}" alt="QR Code ${this.config.partnerName}" style="max-width: 300px; border: 2px solid #ddd; border-radius: 10px;">
                        </div>
                    `;
                    
                    // Afficher les instructions et le statut
                    const instructionsElement = qrContainer.parentElement.querySelector('.sunuid-qr-instructions');
                    const statusElement = qrContainer.parentElement.querySelector('.sunuid-qr-status');
                    
                    if (instructionsElement) {
                        instructionsElement.style.display = 'block';
                        instructionsElement.classList.add('sunuid-qr-ready');
                    }
                    if (statusElement) {
                        statusElement.style.display = 'block';
                        statusElement.classList.add('sunuid-qr-ready');
                    }
                    
                    console.log('✅ QR code côté client généré avec succès');
                });
                
            } catch (error) {
                console.error('❌ Erreur génération QR côté client:', error);
                this.displayFallbackImage();
            }
        }

        /**
         * Ajouter le logo au centre du QR code
         */
        addLogoToCenter(ctx, x, y, width, height) {
            try {
                // Créer une image pour le logo
                const logo = new Image();
                logo.onload = () => {
                    const logoSize = 40;
                    const logoX = x + (width - logoSize) / 2;
                    const logoY = y + (width - logoSize) / 2;

                    // Dessiner un fond blanc pour le logo
                    ctx.fillStyle = 'white';
                    ctx.fillRect(logoX - 2, logoY - 2, logoSize + 4, logoSize + 4);

                    // Dessiner le logo
                    ctx.drawImage(logo, logoX, logoY, logoSize, logoSize);
                };
                logo.src = 'src/logoqr.png';
            } catch (error) {
                console.warn('Logo non disponible:', error);
            }
        }

        /**
         * Afficher l'image de fallback
         */
        displayFallbackImage() {
            console.log('⚠️ Affichage de l\'image de fallback');
            const qrContainer = document.getElementById('sunuid-qr-container');
            if (qrContainer) {
                qrContainer.innerHTML = `
                    <div style="text-align: center; padding: 20px; color: #666;">
                        <p>⚠️ Génération QR personnalisé non disponible</p>
                        <p>Utilisation de l'image par défaut</p>
                        <p><strong>Debug:</strong> QRCode disponible: ${typeof QRCode !== 'undefined'}</p>
                        <p><strong>Debug:</strong> Container trouvé: ${qrContainer !== null}</p>
                    </div>
                `;
            } else {
                console.error('❌ Container QR non trouvé pour fallback');
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
                        Type: ${String(type).toUpperCase()}
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
         * Effectuer une requête API sécurisée
         */
        async makeRequest(endpoint, data) {
            // Validation de sécurité
            if (!this.isInitialized) {
                this.logSecurityEvent('REQUEST_BEFORE_INIT', { endpoint });
                throw new Error('SDK non initialisé');
            }

            // Vérifier les limites de requêtes pour l'initialisation sécurisée
            if (this.config.secureInit) {
                this.config.requestCount++;
                if (this.config.requestCount > this.config.maxRequests) {
                    this.logSecurityEvent('API_REQUEST_LIMIT_EXCEEDED', { 
                        requestCount: this.config.requestCount,
                        maxRequests: this.config.maxRequests 
                    });
                    throw new Error('Limite de requêtes dépassée');
                }
            }

            // Sanitisation des données
            const sanitizedData = this.sanitizeRequestData(data);
            
            // Debug: Afficher les données envoyées
            console.log('🔍 Debug makeRequest - endpoint:', endpoint);
            console.log('🔍 Debug makeRequest - apiUrl:', this.config.apiUrl);
            console.log('🔍 Debug makeRequest - url:', `${this.config.apiUrl}${endpoint}`);
            console.log('🔍 Debug makeRequest - data:', JSON.stringify(sanitizedData, null, 2));
            console.log('🔍 Debug makeRequest - secureInit:', this.config.secureInit);
            console.log('🔍 Debug makeRequest - isInitialized:', this.isInitialized);
            
            // Utiliser l'endpoint depuis la configuration si disponible
            const endpointPath = window.SunuIDConfig?.endpoints?.[endpoint.replace('/', '')] || endpoint;
            const url = `${this.config.apiUrl}${endpointPath}`;
            
            // Debug: Afficher l'URL finale
            console.log('🔍 URL finale construite:', url);
            console.log('🔍 EndpointPath:', endpointPath);
            console.log('🔍 SunuIDConfig endpoints:', JSON.stringify(window.SunuIDConfig?.endpoints));
            
            // Log de sécurité pour la requête
            this.logSecurityEvent('API_REQUEST_START', {
                endpoint: endpointPath,
                url: url,
                dataKeys: Object.keys(sanitizedData),
                secureInit: this.config.secureInit
            });
            
            let retryCount = 0;
            const maxRetries = this.config.maxRetries;
            
            while (retryCount <= maxRetries) {
                try {
                    const controller = new AbortController();
                    const timeoutId = setTimeout(() => controller.abort(), this.config.requestTimeout);
                    
                    // Headers minimaux (API SunuID n'accepte que les headers essentiels)
                    const headers = {
                        'Content-Type': 'application/json'
                    };

                    // Note: En mode sécurisé, les credentials sont dans le body
                    // Pas besoin d'ajouter de header spécial pour éviter les problèmes CORS
                    // if (this.config.secureInit && this.config.token) {
                    //     headers['X-Secure-Token'] = this.config.token;
                    // }
                    
                    const response = await fetch(url, {
                        method: 'POST',
                        headers: headers,
                        body: JSON.stringify(sanitizedData),
                        signal: controller.signal
                    });

                    clearTimeout(timeoutId);

                    if (!response.ok) {
                        const errorText = await response.text();
                        let errorData;
                        try {
                            errorData = JSON.parse(errorText);
                        } catch (e) {
                            errorData = { message: errorText };
                        }
                        
                        this.logSecurityEvent('API_REQUEST_ERROR', {
                            status: response.status,
                            statusText: response.statusText,
                            error: errorData.message
                        });
                        
                        throw new Error(errorData.message || `Erreur HTTP: ${response.status}`);
                    }

                    const result = await response.json();
                    
                    this.logSecurityEvent('API_REQUEST_SUCCESS', {
                        endpoint: endpointPath,
                        responseKeys: Object.keys(result)
                    });
                    
                    return result;
                    
                } catch (error) {
                    retryCount++;
                    
                    if (error.name === 'AbortError') {
                        this.logSecurityEvent('API_REQUEST_TIMEOUT', { retryCount });
                        if (retryCount > maxRetries) {
                            throw new Error('Timeout de la requête API');
                        }
                        continue;
                    }
                    
                    if (retryCount > maxRetries) {
                        this.logSecurityEvent('API_REQUEST_MAX_RETRIES', { 
                            retryCount, 
                            error: error.message 
                        });
                        throw error;
                    }
                    
                    // Attendre avant de réessayer
                    await new Promise(resolve => setTimeout(resolve, 1000 * retryCount));
                }
            }
        }

        /**
         * Sanitisation des données de requête
         */
        sanitizeRequestData(data) {
            const sanitized = {};
            
            for (const [key, value] of Object.entries(data)) {
                if (typeof value === 'string') {
                    sanitized[key] = this.sanitizeInput(value);
                } else if (typeof value === 'object' && value !== null) {
                    sanitized[key] = this.sanitizeRequestData(value);
                } else {
                    sanitized[key] = value;
                }
            }
            
            // Ajouter les credentials dans le body (API SunuID les attend ici)
            // Utiliser les vraies valeurs (originales) si disponibles, sinon les valeurs directes
            sanitized.client_id = this.config.originalClientId || this.config.clientId;
            sanitized.secret_id = this.config.originalSecretId || this.config.secretId;
            
            // Debug: Vérifier les credentials
            console.log('🔍 Credentials dans sanitizeRequestData - clientId:', this.config.clientId);
            console.log('🔍 Credentials dans sanitizeRequestData - secretId:', this.config.secretId ? '***' + this.config.secretId.slice(-4) : 'null');
            console.log('🔍 Credentials dans sanitizeRequestData - sanitizedClientId:', sanitized.client_id);
            console.log('🔍 Credentials dans sanitizeRequestData - sanitizedSecretId:', sanitized.secret_id ? '***' + sanitized.secret_id.slice(-4) : 'null');
            console.log('🔍 Credentials dans sanitizeRequestData - data complet:', JSON.stringify(sanitized, null, 2));
            
            // Debug: Vérifier les credentials
            console.log('🔍 Credentials dans sanitizeRequestData - clientId:', this.config.clientId);
            console.log('🔍 Credentials dans sanitizeRequestData - secretId:', this.config.secretId ? '***' + this.config.secretId.slice(-4) : 'null');
            console.log('🔍 Credentials dans sanitizeRequestData - sanitizedClientId:', sanitized.client_id);
            console.log('🔍 Credentials dans sanitizeRequestData - sanitizedSecretId:', sanitized.secret_id ? '***' + sanitized.secret_id.slice(-4) : 'null');
            console.log('🔍 Credentials dans sanitizeRequestData - data complet:', JSON.stringify(sanitized, null, 2));
            
            return sanitized;
        }

        /**
         * Générer un ID de requête unique
         */
        generateRequestId() {
            return 'req_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
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
         * Obtenir l'URL du QR code généré
         */
        getQRCode() {
            // Retourner l'URL du QR code si disponible
            if (this.currentQRUrl) {
                return this.currentQRUrl;
            }
            
            // Sinon, retourner une URL par défaut ou null
            return null;
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
            this.logSecurityEvent('SDK_DESTROY');
            console.log('SunuID SDK détruit');
        }

        /**
         * Obtenir les logs de sécurité
         */
        getSecurityLogs() {
            return window.SunuIDSecurityLogs || [];
        }

        /**
         * Nettoyer les logs de sécurité
         */
        clearSecurityLogs() {
            window.SunuIDSecurityLogs = [];
            this.logSecurityEvent('SECURITY_LOGS_CLEARED');
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