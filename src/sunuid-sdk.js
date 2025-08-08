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
        partnerName: null, // Nom du partenaire récupéré depuis l'API
        theme: 'light',
        language: 'fr',
        autoRefresh: false, // Désactivé par défaut pour éviter les appels répétitifs
        refreshInterval: 30000, // 30 secondes
        autoInit: false, // Désactivé par défaut pour éviter les boucles
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
        token: null,
        // Configuration pour forcer l'utilisation du serveur distant
        forceRemoteServer: true,
        useLocalFallback: false,
        // Nouvelles options pour les callbacks
        redirectAfterSuccess: null,
        verifySignature: false,
        tokenMaxAge: 300, // 5 minutes par défaut
        onAuthenticationSuccess: null,
        onAuthenticationError: null,
        state: null
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
            this.initPromise = null;
            
            // DÉSACTIVÉ : Initialisation automatique pour éviter les boucles
            // L'utilisateur doit appeler init() manuellement
            console.log('🔧 SDK SunuID créé - Appelez init() manuellement');
        }

        /**
         * Initialisation du SDK
         */
        async init() {
            // Protection stricte contre les boucles
            if (this.isInitialized) {
                console.log('⚠️ SDK déjà initialisé, ignoré');
                return;
            }
            
            // Protection contre les initialisations simultanées
            if (this.initPromise) {
                console.log('⚠️ Initialisation déjà en cours, attente...');
                return this.initPromise;
            }
            
            // Protection contre les appels multiples rapides
            if (this._initInProgress) {
                console.log('⚠️ Initialisation en cours, ignoré');
                return;
            }
            
            this._initInProgress = true;
            this.initPromise = this._doInit();
            
            try {
                await this.initPromise;
            } finally {
                this._initInProgress = false;
            }
            
            return this.initPromise;
        }

        /**
         * Initialisation interne du SDK
         */
        async _doInit() {
            try {
                // Vérifier s'il y a un callback à traiter en premier
                if (this.handleCallback()) {
                    console.log('✅ Callback traité, initialisation terminée');
                    return;
                }

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
                    secureInit: this.config.secureInit
                });

                // Récupérer les informations du partenaire depuis l'API
                await this.fetchPartnerInfo();

                // Obscurcir les credentials dans les logs
                this.obfuscateCredentials();

                this.isInitialized = true;
                console.log('SunuID SDK initialisé avec succès');
                console.log('📋 Configuration SDK:', {
                    apiUrl: this.config.apiUrl,
                    type: this.config.type,
                    partnerName: this.config.partnerName,
                    clientId: this.config.clientId ? '***' + this.config.clientId.slice(-4) : 'null',
                    secretId: this.config.secretId ? '***' + this.config.secretId.slice(-4) : 'null',
                    secureInit: this.config.secureInit,
                    theme: this.config.theme
                });
                
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
                
                console.log('📋 Réponse initialisation sécurisée:', result);
                
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
                    console.log('🌐 Initialisation Socket.IO...');
                    
                    this.socket = io('wss://samasocket.fayma.sn:9443', {
                        query: {
                            token: this.config.clientId,
                            type: 'web',
                            userId: this.config.clientId,
                            username: ip
                        },
                        transports: ['websocket', 'polling']
                    });

                    // Gestion des événements WebSocket
                    this.socket.on('connect', () => {
                        console.log('🌐 WebSocket connecté avec succès');
                        console.log('📊 Socket ID:', this.socket.id);
                        this.socket.connected = true;
                    });

                    this.socket.on('disconnect', (reason) => {
                        console.log('❌ WebSocket déconnecté:', reason);
                        this.socket.connected = false;
                    });

                    this.socket.on('connect_error', (error) => {
                        console.error('❌ Erreur connexion WebSocket:', error);
                        this.socket.connected = false;
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

                    // Écouter l'événement qr_scan_initiated spécifiquement
                    this.socket.on('qr_scan_initiated', (data) => {
                        console.log('🔍 QR Scan Initiated reçu:', data);
                        this.showQRLoader();
                    });

                    // Écouter l'événement message générique (fallback)
                    this.socket.on('message', (data) => {
                        console.log('📨 Message socket reçu:', data);
                        if (data && data.type === 'qr_scan_initiated') {
                            console.log('🔍 QR Scan Initiated détecté dans message:', data);
                            this.showQRLoader();
                        }
                    });

                    // Écouter tous les événements socket pour le debugging
                    this.socket.onAny = this.socket.onAny || function(eventName, callback) {
                        // Fallback pour les versions de Socket.IO qui n'ont pas onAny
                        console.log(`🌐 Socket Event [${eventName}]:`, callback);
                    };
                    
                    // Logger tous les événements reçus
                    this.socket.onAny((eventName, ...args) => {
                        console.log(`🌐 Socket Event [${eventName}]:`, args);
                    });
                } else {
                    console.log('🌐 WebSocket déjà connecté');
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
            console.log('📱 QR Status Update:', data);
            if (this.config.onStatusUpdate) {
                this.config.onStatusUpdate(data);
            }
        }

        /**
         * Gérer le succès du scan QR
         */
        handleQRScanSuccess(data) {
            console.log('✅ QR Scan Success reçu:', data);
            
            try {
                // Traiter l'authentification comme un callback
                this.processAuthentication(data);
                
                // Afficher un message de succès
                this.showSuccessMessage(data);
                
                // Appeler le callback de succès (pour compatibilité)
                if (this.config.onSuccess) {
                    this.config.onSuccess(data);
                }
                
                console.log('✅ Authentification WebSocket traitée avec succès');
                
            } catch (error) {
                console.error('❌ Erreur lors du traitement WebSocket:', error);
                
                // Appeler le callback d'erreur
                if (this.config.onAuthenticationError) {
                    this.config.onAuthenticationError(error, data);
                }
            }
        }

        /**
         * Gérer l'expiration du QR
         */
        handleQRExpired(data) {
            console.log('⏰ QR Expired:', data);
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
        async generateQR(containerId = 'sunuid-qr-container', options = {}) {
            // Attendre l'initialisation si nécessaire
            if (this.initPromise) {
                await this.initPromise;
                this.initPromise = null;
            }
            
            if (!this.isInitialized) {
                throw new Error('SunuID: SDK non initialisé');
            }
            
            console.log('🎯 generateQR appelé avec containerId:', containerId);
            
            // Attendre que les connexions soient prêtes
            console.log('🔍 Attente connexions API et WebSocket...');
            try {
                const connectionStatus = await this.waitForConnections(5000); // 5 secondes max
                console.log('✅ Connexions prêtes:', connectionStatus);
            } catch (connectionError) {
                console.error('❌ Erreur connexions:', connectionError.message);
                throw new Error('Connexions non disponibles - Impossible de générer le QR code');
            }

            try {
                // Utiliser uniquement le socketID comme contenu du QR
                const socketId = this.socket ? this.socket.id : 'timeout-socket-id';
                const qrContent = socketId;
                
                console.log('📄 Contenu QR préparé:', qrContent);
                console.log('🔌 Socket ID:', socketId);
                
                                    // Générer le QR avec le contenu complet
                    const partnerName = this.config.partnerName || 'Partner_unknown';
                    const response = await this.makeRequest('/qr-generate', {
                        type: this.config.type,
                        data: qrContent, // Essayer data au lieu de content
                        label: `${this.getTypeName(this.config.type)} ${partnerName}`, // Label du QR avec nom du partenaire
                        ...options
                    });

                if (response.success) {
                    // Debug: Afficher la structure complète de la réponse
                    console.log('📋 Réponse QR API complète:', response);
                    console.log('📋 Structure response.data:', response.data);
                    
                    // Construire l'URL complète du QR code
                    let qrImageUrl = response.data.qrCodeUrl;
                    
                    // Si l'URL est relative, la rendre absolue
                    if (qrImageUrl && qrImageUrl.startsWith('/')) {
                        qrImageUrl = `${this.config.apiUrl}${qrImageUrl}`;
                    }
                    
                    // Vérifier si l'URL du QR code existe
                    if (!qrImageUrl) {
                        console.warn('⚠️ qrCodeUrl non trouvé dans la réponse, recherche d\'alternatives...');
                        
                        // Essayer d'autres champs possibles
                        qrImageUrl = response.data.qr_url || 
                                    response.data.qrUrl || 
                                    response.data.url || 
                                    response.data.image_url ||
                                    response.data.imageUrl;
                        
                        if (qrImageUrl) {
                            console.log('✅ URL QR trouvée dans un champ alternatif:', qrImageUrl);
                        } else {
                            console.error('❌ Aucune URL QR trouvée dans la réponse');
                            throw new Error('URL du QR code non trouvée dans la réponse API');
                        }
                    }
                    
                    this.currentQRUrl = qrImageUrl;
                    
                    console.log('✅ QR code généré par API principale:', qrImageUrl);
                    console.log('📄 Contenu QR final:', qrContent);
                    console.log('🏷️ Label QR:', response.data.label || 'N/A');
                    console.log('🆔 Session ID:', response.data.sessionId || 'N/A');
                    
                    // Afficher le QR code
                    this.displayQRCode(containerId, qrImageUrl, this.config.type, options);
                    
                    this.startAutoRefresh(containerId, this.config.type, options);
                    
                    // Émettre un événement WebSocket pour la génération du QR
                    this.emitWebSocketEvent('qr_generated', {
                        type: this.config.type,
                        qrCodeUrl: qrImageUrl,
                        socketId: socketId,
                        qrContent: qrContent,
                        label: response.data.label,
                        sessionId: response.data.sessionId,
                        timestamp: Date.now()
                    });
                    
                    return {
                        ...response.data,
                        qrCodeUrl: qrImageUrl,
                        qrContent: qrContent,
                        label: response.data.label,
                        sessionId: response.data.sessionId
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
                
                // Fallback vers le service local seulement si activé
                if (this.config.useLocalFallback) {
                    console.log('🔍 Vérification fallback local...');
                    console.log('🔍 Hostname:', window.location.hostname);
                    console.log('🔍 Protocol:', window.location.protocol);
                    console.log('🔍 URL complète:', window.location.href);
                    
                    const isLocal = window.location.hostname === 'localhost' || 
                                   window.location.hostname === '127.0.0.1' || 
                                   window.location.protocol === 'file:';
                    
                    console.log('🔍 Est local:', isLocal);
                    
                    if (isLocal) {
                        console.log('🔄 Tentative fallback vers service QR local...');
                        console.log('❌ Fallback local non implémenté - utilisation serveur distant uniquement');
                    } else {
                        console.log('❌ Pas en local, pas de fallback');
                    }
                } else {
                    console.log('🔒 Fallback local désactivé, utilisation serveur distant uniquement');
                }
                
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
                    
                    // Le QR code est déjà généré par l'API principale
                    console.log('✅ QR code personnalisé généré par API principale:', qrImageUrl);
                    console.log('📄 Code de session:', response.data.code);
                    console.log('🆔 Service ID:', response.data.service_id);
                    
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
         * Générer un QR code avec un contenu spécifique
         */
        async generateQRWithContent(content, containerId, type, options = {}) {
            console.log('🎨 Génération QR avec contenu:', content);
            
            try {
                // Essayer d'abord le service QR local
                if (window.location.hostname === 'localhost' || 
                    window.location.hostname === '127.0.0.1' || 
                    window.location.protocol === 'file:') {
                    
                    console.log('🏠 Utilisation service QR local...');
                    const localQRUrl = await this.generateQRLocal(content, containerId, type, options);
                    if (localQRUrl) {
                        return localQRUrl;
                    }
                }
                
                // Fallback vers le service QR distant
                console.log('🌐 Utilisation service QR distant...');
                return await this.generateQRRemote(content, containerId, type, options);
                
            } catch (error) {
                console.error('❌ Erreur génération QR:', error);
                // Fallback vers affichage simple du contenu
                this.displayQRContent(containerId, content, type, options);
                return null;
            }
        }
        
        /**
         * Générer QR code avec service local
         */
        async generateQRLocal(content, containerId, type, options = {}) {
            try {
                const response = await fetch('http://localhost:8000/api/generate/text', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body: `text=${encodeURIComponent(content)}&size=300`
                });
                
                if (response.ok) {
                    const data = await response.json();
                    const qrUrl = `data:image/png;base64,${data.qrcode}`;
                    this.displayQRCode(containerId, qrUrl, type, options);
                    return qrUrl;
                }
            } catch (error) {
                console.log('❌ Service QR local non disponible:', error.message);
            }
            return null;
        }
        
        /**
         * Générer QR code avec service distant
         */
        async generateQRRemote(content, containerId, type, options = {}) {
            try {
                const response = await fetch('https://api.sunuid.fayma.sn/qr-generate', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        text: content,
                        size: 300,
                        type: type
                    })
                });
                
                if (response.ok) {
                    const data = await response.json();
                    const qrUrl = `data:image/png;base64,${data.qrcode}`;
                    this.displayQRCode(containerId, qrUrl, type, options);
                    return qrUrl;
                }
            } catch (error) {
                console.error('❌ Erreur service QR distant:', error);
            }
            
            // Fallback vers affichage du contenu
            this.displayQRContent(containerId, content, type, options);
            return null;
        }
        
        /**
         * Afficher le contenu QR en texte (fallback)
         */
        displayQRContent(containerId, content, type, options = {}) {
            const container = document.getElementById(containerId);
            if (!container) {
                throw new Error(`Conteneur avec l'ID "${containerId}" non trouvé`);
            }

            const typeName = this.getTypeName(type);
            container.innerHTML = `
                <div class="sunuid-qr-code">
                    <div class="sunuid-qr-header">
                        <h3>${typeName}</h3>
                    </div>
                    <div class="sunuid-qr-content" style="text-align: center; padding: 20px; background: #f8f9fa; border: 1px solid #dee2e6; border-radius: 5px; margin: 10px 0;">
                        <p><strong>Contenu QR Code:</strong></p>
                        <p style="font-family: monospace; font-size: 14px; word-break: break-all;">${content}</p>
                    </div>
                    <div class="sunuid-qr-instructions">
                        <p>Contenu QR généré avec le format: {type}-{code}-{socketid}</p>
                    </div>
                </div>
            `;
            
            console.log('✅ Contenu QR affiché:', content);
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
            
            // Afficher l'image QR avec les informations
            const typeName = this.getTypeName(type);
            qrElement.innerHTML = `
                <div class="sunuid-qr-header">
                    <h3>${type === 1 ? 'Vérification KYC' : type === 2 ? 'Authentification' : type === 3 ? 'Signature' : 'Service Type ' + type}</h3>
                </div>
                <div class="sunuid-qr-image">
                    <img src="${qrUrl}" alt="QR Code ${typeName}" style="max-width: 300px; border: 1px solid #ddd; border-radius: 5px;" />
                </div>
               
            `;

            container.appendChild(qrElement);

            // Appliquer le thème
            this.applyTheme(options.theme || this.config.theme);
            
            console.log('✅ QR code affiché:', qrUrl);
        }

        /**
         * Générer un QR code personnalisé avec PHP Endroid
         */
        async generateCustomQRCode(content, label, options = {}) {
            console.log('🎨 Début génération QR personnalisé...');
            console.log('📄 Contenu:', content);
            console.log('🏷️ Label:', label);
            
            // Chercher le conteneur QR
            let qrContainer = document.getElementById('sunuid-qr-container');
            if (!qrContainer) {
                qrContainer = document.getElementById('qr-container');
            }
            if (!qrContainer) {
                console.error('❌ QR container not found');
                return;
            }
            
            console.log('✅ QR container trouvé');

            // Nettoyer le conteneur
            qrContainer.innerHTML = '<div style="text-align: center; padding: 20px;"><p>Génération QR code...</p></div>';

                         try {
                 // Utiliser directement l'API principale (plus fiable)
                 console.log('🎨 Tentative génération via API principale...');
                 await this.generateQRPHP(content, label, qrContainer);
                 console.log('✅ QR code généré avec succès');
                 
             } catch (error) {
                 console.error('❌ Erreur génération API:', error);
                 
                 // Fallback final : image par défaut
                 console.log('⚠️ Affichage image par défaut');
                 this.displayDefaultQR(qrContainer, content, label);
             }
        }

        /**
         * Générer un QR code côté client (méthode principale)
         */
        async generateQRClientSide(content, label, qrContainer) {
            // Charger QRCode si nécessaire
            await this.ensureQRCodeLibrary();
            
            if (typeof QRCode === 'undefined') {
                throw new Error('QRCode library non disponible');
            }
            
            // Créer un canvas
            const canvas = document.createElement('canvas');
            canvas.width = 300;
            canvas.height = 320;
            const ctx = canvas.getContext('2d');
            
            // Fond blanc
            ctx.fillStyle = '#FFFFFF';
            ctx.fillRect(0, 0, 300, 320);
            
            // Générer le QR code
            return new Promise((resolve, reject) => {
                QRCode.toCanvas(canvas, content, {
                    width: 280,
                    margin: 10,
                    color: {
                        dark: '#000000',
                        light: '#FFFFFF'
                    }
                }, (error) => {
                    if (error) {
                        reject(error);
                        return;
                    }
                    
                    // Ajouter le label
                    ctx.fillStyle = '#333333';
                    ctx.font = 'bold 14px Arial';
                    ctx.textAlign = 'center';
                    ctx.fillText(label, 150, 305);
                    
                    // Convertir en data URL
                    const dataUrl = canvas.toDataURL('image/png');
                    
                    // Stocker l'URL
                    this.currentQRUrl = dataUrl;
                    
                    // Afficher le QR code
                    qrContainer.innerHTML = `
                        <div style="text-align: center; padding: 20px;">
                            <img src="${dataUrl}" alt="QR Code" style="max-width: 300px; border: 2px solid #ddd; border-radius: 10px;">
                        </div>
                    `;
                    
                    // Afficher les instructions
                    this.showQRInstructions(qrContainer);
                    
                    resolve();
                });
            });
        }

        /**
         * Générer un QR code via endpoint PHP (fallback)
         */
        async generateQRPHP(content, label, qrContainer) {
                         // Construire l'URL - Utiliser l'API principale qui fonctionne
             let qrGeneratorUrl;
             if (this.config.forceRemoteServer) {
                 qrGeneratorUrl = 'https://api.sunuid.fayma.sn/qr-generate';
             } else if (this.config.apiUrl.includes('api.sunuid.fayma.sn')) {
                 qrGeneratorUrl = 'https://api.sunuid.fayma.sn/qr-generate';
             } else if (this.config.apiUrl.includes('localhost') || this.config.apiUrl.includes('127.0.0.1')) {
                 qrGeneratorUrl = 'http://localhost:8000/api/generate/text';
             } else {
                 qrGeneratorUrl = this.config.apiUrl + '/qr-generate';
             }
            
            console.log('🔗 URL QR Generator:', qrGeneratorUrl);
            
                         // Adapter le format selon l'URL
             let requestBody;
             let contentType;
             
             if (qrGeneratorUrl.includes('localhost:8000')) {
                 // Service local - format form-data
                 contentType = 'application/x-www-form-urlencoded';
                 requestBody = new URLSearchParams({
                     text: content,
                     size: 300,
                     margin: 10,
                     foreground_color: '000000',
                     background_color: 'FFFFFF'
                 });
             } else {
                 // Service distant - format JSON avec les paramètres de l'API principale
                 contentType = 'application/json';
                 requestBody = JSON.stringify({
                     type: this.config.type,
                     client_id: this.config.clientId,
                     secret_id: this.config.secretId,
                     content: content,
                     label: label
                 });
             }
             
             const response = await fetch(qrGeneratorUrl, {
                 method: 'POST',
                 headers: {
                     'Content-Type': contentType,
                     'Accept': 'application/json'
                 },
                 body: requestBody
             });
            
            if (!response.ok) {
                throw new Error(`Erreur HTTP: ${response.status}`);
            }
            
            const responseData = await response.json();
            
                         if (!responseData.success) {
                 throw new Error(`Erreur QR: ${responseData.error}`);
             }
             
             // Adapter selon le format de réponse
             let qrImageUrl;
             if (qrGeneratorUrl.includes('localhost:8000')) {
                 // Service local
                 qrImageUrl = responseData.data_uri;
             } else {
                 // Service distant - utiliser le format de l'API principale
                 const imageBaseUrl = 'https://sunuid.fayma.sn';
                 qrImageUrl = `${imageBaseUrl}${responseData.data.qrcode}`;
             }
             
             // Stocker l'URL
             this.currentQRUrl = qrImageUrl;
             
             // Afficher le QR code
             qrContainer.innerHTML = `
                 <div style="text-align: center; padding: 20px;">
                     <img src="${qrImageUrl}" alt="QR Code" style="max-width: 300px; border: 2px solid #ddd; border-radius: 10px;">
                 </div>
             `;
            
            // Afficher les instructions
            this.showQRInstructions(qrContainer);
        }

        /**
         * Afficher une image QR par défaut (fallback final)
         */
        displayDefaultQR(qrContainer, content, label) {
            qrContainer.innerHTML = `
                <div style="text-align: center; padding: 20px; color: #666;">
                    <div style="width: 300px; height: 300px; background: #f0f0f0; border: 2px solid #ddd; border-radius: 10px; display: flex; align-items: center; justify-content: center; margin: 0 auto;">
                        <div>
                            <p style="font-size: 24px; margin: 0;">📱</p>
                            <p style="font-size: 14px; margin: 10px 0 0 0;">QR Code</p>
                        </div>
                    </div>
                    <p style="margin-top: 10px; font-size: 12px;">${label}</p>
                    <p style="font-size: 10px; color: #999; margin-top: 5px;">Contenu: ${content}</p>
                </div>
            `;
        }

        /**
         * S'assurer que la bibliothèque QRCode est disponible
         */
        async ensureQRCodeLibrary() {
            if (typeof QRCode !== 'undefined') {
                console.log('✅ QRCode library déjà disponible');
                return true;
            }
            
            console.log('📦 Chargement QRCode library...');
            
            return new Promise((resolve, reject) => {
                const script = document.createElement('script');
                script.src = 'https://cdn.jsdelivr.net/npm/qrcode@1.5.3/lib/browser.min.js';
                script.onload = () => {
                    setTimeout(() => {
                        if (typeof QRCode !== 'undefined') {
                            console.log('✅ QRCode library chargée');
                            resolve(true);
                        } else {
                            console.error('❌ QRCode non disponible après chargement');
                            reject(new Error('QRCode library non disponible après chargement'));
                        }
                    }, 200);
                };
                script.onerror = () => {
                    console.error('❌ Erreur chargement QRCode library');
                    reject(new Error('Erreur chargement QRCode library'));
                };
                document.head.appendChild(script);
            });
        }

        /**
         * Afficher les instructions pour le QR code
         */
        showQRInstructions(qrContainer) {
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
                // Vérifier si on a déjà un QR code généré
                if (this.currentQRUrl) {
                    console.log('🔄 Vérification du statut du QR code existant...');
                    
                    // Option 1: Vérifier le statut du QR code via l'API
                    // (à implémenter si l'API le supporte)
                    
                    // Option 2: Régénérer le QR code seulement si nécessaire
                    // Pour l'instant, on régénère pour s'assurer qu'il est à jour
                    const result = await this.generateQR(containerId, options);
                    return result;
                } else {
                    console.log('🔄 Pas de QR code existant, génération d\'un nouveau...');
                    const result = await this.generateQR(containerId, options);
                    return result;
                }
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

            // Arrêter le timer existant s'il y en a un
            if (this.refreshTimer) {
                clearInterval(this.refreshTimer);
                console.log('🔄 Timer de rafraîchissement précédent arrêté');
            }

            this.refreshTimer = setInterval(async () => {
                try {
                    console.log('🔄 Rafraîchissement automatique du QR code...');
                    await this.refreshQR(containerId, type, options);
                } catch (error) {
                    console.warn('Erreur lors du rafraîchissement automatique:', error);
                }
            }, this.config.refreshInterval);
            
            console.log(`🔄 Timer de rafraîchissement démarré (${this.config.refreshInterval}ms)`);
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
            
            // D'abord, copier tous les champs de data
            for (const [key, value] of Object.entries(data)) {
                if (typeof value === 'string') {
                    sanitized[key] = this.sanitizeInput(value);
                } else if (typeof value === 'object' && value !== null) {
                    sanitized[key] = this.sanitizeRequestData(value);
                } else {
                    sanitized[key] = value;
                }
            }
            
            // Ensuite, ajouter/écraser les credentials (API SunuID les attend ici)
            // Utiliser les vraies valeurs (originales) si disponibles, sinon les valeurs directes
            sanitized.client_id = this.config.originalClientId || this.config.clientId;
            sanitized.secret_id = this.config.originalSecretId || this.config.secretId;
            
            // Debug: Vérifier les credentials et les données
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
         * Générer un code de session unique
         */
        generateSessionCode() {
            const timestamp = Date.now();
            const random = Math.random().toString(36).substr(2, 9);
            const code = `${timestamp}_${random}`;
            return btoa(code); // Encoder en base64
        }

        /**
         * Récupérer les informations du partenaire depuis l'API
         */
        async fetchPartnerInfo() {
            try {
                const response = await this.makeRequest('/debug', {
                    type: this.config.type,
                    client_id: this.config.clientId,
                    secret_id: this.config.secretId
                });

                console.log('📋 Réponse debug API:', response);

                // Vérifier la structure de la réponse
                if (response.success && response.data) {
                    const data = response.data;
                    
                    // Essayer de récupérer le partner_id depuis différentes structures possibles
                    let partnerId = null;
                    
                    if (data.partner_id) {
                        partnerId = data.partner_id;
                    } else if (data.authentication && data.authentication.auth_test && data.authentication.auth_test.partner_id) {
                        partnerId = data.authentication.auth_test.partner_id;
                    } else if (data.auth_test && data.auth_test.partner_id) {
                        partnerId = data.auth_test.partner_id;
                    }
                    
                    if (partnerId) {
                        this.config.partnerId = partnerId;
                        
                        // Récupérer le service_id depuis la réponse
                        if (data.service_id) {
                            this.config.serviceId = data.service_id;
                        } else {
                            // Fallback: utiliser le partner_id comme service_id
                            this.config.serviceId = partnerId;
                        }
                        
                        // Utiliser le partner_id pour déterminer le nom du partenaire
                        if (partnerId === 21) {
                            this.config.partnerName = 'Fayma';
                        } else {
                            this.config.partnerName = `Partner_${partnerId}`;
                        }
                        
                        console.log('✅ Informations partenaire récupérées:', {
                            partnerName: this.config.partnerName,
                            partnerId: this.config.partnerId,
                            serviceId: this.config.serviceId
                        });
                    } else {
                        console.warn('⚠️ Partner ID non trouvé dans la réponse, utilisation du partner_id par défaut');
                        this.config.partnerName = `Partner_${this.config.partnerId || 'unknown'}`;
                    }
                } else {
                    console.warn('⚠️ Structure de réponse invalide, utilisation du partner_id par défaut');
                    this.config.partnerName = `Partner_${this.config.partnerId || 'unknown'}`;
                }
            } catch (error) {
                console.warn('⚠️ Erreur lors de la récupération des informations du partenaire:', error.message);
                this.config.partnerName = 'Partner_unknown';
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
         * Vérifier le statut des connexions
         */
        async checkConnections() {
            const status = {
                api: false,
                websocket: false,
                ready: false
            };
            
            // Vérifier l'API en utilisant l'endpoint debug avec les credentials
            try {
                const testResponse = await fetch(this.config.apiUrl + '/debug', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        type: this.config.type,
                        client_id: this.config.clientId,
                        secret_id: this.config.secretId
                    })
                });
                
                if (testResponse.ok) {
                    const debugData = await testResponse.json();
                    // L'API est accessible si on reçoit une réponse avec success: true
                    status.api = debugData.success === true;
                    console.log('🔍 API Status:', status.api ? 'accessible' : 'inaccessible');
                } else {
                    status.api = false;
                    console.log('🔍 API Status: HTTP', testResponse.status);
                }
            } catch (error) {
                console.log('🔍 Test API échoué:', error.message);
                status.api = false;
            }
            
            // Vérifier le WebSocket
            status.websocket = this.socket && this.socket.connected;
            
            // Connexions prêtes si API est accessible
            status.ready = status.api;
            
            return status;
        }
        
        /**
         * Attendre que les connexions soient prêtes
         */
        async waitForConnections(timeout = 5000) {
            const startTime = Date.now();
            
            while (Date.now() - startTime < timeout) {
                const status = await this.checkConnections();
                
                if (status.ready) {
                    console.log('✅ Connexions prêtes');
                    return status;
                }
                
                console.log('⏳ Attente connexions...', status);
                await new Promise(resolve => setTimeout(resolve, 1000)); // Vérification toutes les secondes
            }
            
            throw new Error('Timeout connexions - Impossible de générer le QR code');
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
            this.stopAutoRefresh();
            
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
         * Arrêter le rafraîchissement automatique
         */
        stopAutoRefresh() {
            if (this.refreshTimer) {
                clearInterval(this.refreshTimer);
                this.refreshTimer = null;
                console.log('🔄 Timer de rafraîchissement arrêté');
            }
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

        /**
         * Afficher un loader pendant le scan du QR code
         */
        showQRLoader() {
            console.log('🔄 Affichage du loader - Scan QR initié');
            
            // Chercher le conteneur QR dans différents IDs possibles
            const containerIds = ['qr-area', 'qr-container', 'sunuid-qr-container'];
            let container = null;
            
            for (const id of containerIds) {
                container = document.getElementById(id);
                if (container) break;
            }
            
            if (!container) {
                console.warn('⚠️ Conteneur QR non trouvé pour afficher le loader');
                return;
            }
            
            // Remplacer le contenu par un loader animé
            container.innerHTML = `
                <div style="
                    text-align: center;
                    padding: 40px 20px;
                    background: #f8f9fa;
                    border: 2px solid #007bff;
                    border-radius: 10px;
                    color: #007bff;
                    font-family: Arial, sans-serif;
                ">
                    <div style="
                        width: 60px;
                        height: 60px;
                        border: 4px solid #e3f2fd;
                        border-top: 4px solid #007bff;
                        border-radius: 50%;
                        animation: spin 1s linear infinite;
                        margin: 0 auto 20px auto;
                    "></div>
                    <h3 style="margin: 0 0 10px 0; color: #007bff;">🔍 Scan en cours...</h3>
                    <p style="margin: 0; font-size: 14px;">
                        Veuillez patienter pendant la vérification de votre identité.
                    </p>
                    <div style="margin-top: 15px; font-size: 12px; color: #6c757d;">
                        ⏱️ Traitement en cours...
                    </div>
                </div>
                <style>
                    @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                </style>
            `;
            
            console.log('✅ Loader affiché avec succès');
        }

        /**
         * Afficher un message de succès après authentification
         */
        showSuccessMessage(data) {
            console.log('✅ Affichage du message de succès');
            
            // Chercher le conteneur QR dans différents IDs possibles
            const containerIds = ['qr-area', 'qr-container', 'sunuid-qr-container'];
            let container = null;
            
            for (const id of containerIds) {
                container = document.getElementById(id);
                if (container) break;
            }
            
            if (!container) {
                console.warn('⚠️ Conteneur QR non trouvé pour afficher le message de succès');
                return;
            }
            
            // Extraire les informations utilisateur
            const userInfo = data.user_info || {};
            const userName = userInfo.name || userInfo.username || 'Utilisateur';
            const userEmail = userInfo.email || '';
            
            // Remplacer le contenu par un message de succès
            container.innerHTML = `
                <div style="
                    text-align: center;
                    padding: 40px 20px;
                    background: #d4edda;
                    border: 2px solid #28a745;
                    border-radius: 10px;
                    color: #155724;
                    font-family: Arial, sans-serif;
                ">
                    <div style="
                        width: 60px;
                        height: 60px;
                        background: #28a745;
                        border-radius: 50%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        margin: 0 auto 20px auto;
                        font-size: 30px;
                        color: white;
                    ">✅</div>
                    <h3 style="margin: 0 0 10px 0; color: #155724;">🎉 Authentification réussie !</h3>
                    <p style="margin: 0 0 15px 0; font-size: 16px; font-weight: bold;">
                        Bienvenue, ${userName} !
                    </p>
                    ${userEmail ? `<p style="margin: 0 0 15px 0; font-size: 14px; color: #6c757d;">${userEmail}</p>` : ''}
                    <p style="margin: 0; font-size: 14px;">
                        Votre identité a été vérifiée avec succès.
                    </p>
                    <div style="margin-top: 20px; font-size: 12px; color: #6c757d;">
                        🔄 Redirection en cours...
                    </div>
                </div>
            `;
            
            console.log('✅ Message de succès affiché');
        }

        /**
         * Gérer le callback SunuID
         */
        handleCallback() {
            const urlParams = new URLSearchParams(window.location.search);
            
            // Vérifier si c'est un callback SunuID
            if (urlParams.has('token') && urlParams.has('session_id')) {
                console.log('🔗 Callback SunuID détecté');
                
                // Récupérer les paramètres
                const callbackData = {
                    token: urlParams.get('token'),
                    state: urlParams.get('state'),
                    session_id: urlParams.get('session_id'),
                    user_id: urlParams.get('user_id'),
                    partner_id: urlParams.get('partner_id'),
                    type: urlParams.get('type'),
                    timestamp: urlParams.get('timestamp'),
                    signature: urlParams.get('signature')
                };
                
                console.log('📋 Données callback:', callbackData);
                
                // Valider le callback
                this.validateCallback(callbackData);
                
                // Traiter l'authentification
                this.processAuthentication(callbackData);
                
                return true;
            }
            
            return false;
        }

        /**
         * Valider le callback
         */
        validateCallback(data) {
            console.log('🔒 Validation du callback...');
            
            // Vérifier l'état de sécurité
            if (data.state && data.state !== this.config.state) {
                console.error('❌ État de sécurité invalide');
                throw new Error('État de sécurité invalide');
            }
            
            // Vérifier la signature (si configurée)
            if (data.signature && this.config.verifySignature) {
                if (!this.verifySignature(data)) {
                    console.error('❌ Signature invalide');
                    throw new Error('Signature invalide');
                }
            }
            
            // Vérifier l'expiration
            if (data.timestamp && this.isExpired(data.timestamp)) {
                console.error('❌ Token expiré');
                throw new Error('Token expiré');
            }
            
            console.log('✅ Callback validé avec succès');
        }

        /**
         * Traiter l'authentification
         */
        processAuthentication(data) {
            console.log('🔐 Traitement de l\'authentification...');
            
            try {
                // Décoder le JWT token
                const decodedToken = this.decodeJWT(data.token);
                
                // Vérifier les données utilisateur
                const userData = {
                    user_id: decodedToken.user_id || data.user_id,
                    session_id: decodedToken.session_id || data.session_id,
                    partner_id: decodedToken.partner_id || data.partner_id,
                    type: decodedToken.type || data.type,
                    iat: decodedToken.iat,
                    exp: decodedToken.exp
                };
                
                console.log('👤 Données utilisateur:', userData);
                
                // Émettre l'événement de succès
                this.emitWebSocketEvent('authentication_success', {
                    userData: userData,
                    callbackData: data,
                    timestamp: Date.now()
                });
                
                // Appeler le callback de succès
                if (this.config.onAuthenticationSuccess) {
                    this.config.onAuthenticationSuccess(userData, data);
                }
                
                // Rediriger si configuré
                if (this.config.redirectAfterSuccess) {
                    this.redirectAfterSuccess(userData);
                }
                
                console.log('✅ Authentification traitée avec succès');
                
            } catch (error) {
                console.error('❌ Erreur lors du traitement:', error);
                
                // Appeler le callback d'erreur
                if (this.config.onAuthenticationError) {
                    this.config.onAuthenticationError(error, data);
                }
                
                throw error;
            }
        }

        /**
         * Décoder un JWT token
         */
        decodeJWT(token) {
            try {
                // Décodage simple du JWT (sans vérification de signature)
                const parts = token.split('.');
                if (parts.length !== 3) {
                    throw new Error('Format JWT invalide');
                }
                
                const payload = parts[1];
                const decoded = JSON.parse(atob(payload));
                
                return decoded;
            } catch (error) {
                console.error('❌ Erreur décodage JWT:', error);
                throw new Error('Token JWT invalide');
            }
        }

        /**
         * Vérifier la signature
         */
        verifySignature(data) {
            // Implémentation basique - à adapter selon vos besoins
            const expectedSignature = this.generateSignature(data);
            return data.signature === expectedSignature;
        }

        /**
         * Générer une signature
         */
        generateSignature(data) {
            // Implémentation basique - à adapter selon vos besoins
            const payload = `${data.token}.${data.state}.${data.session_id}.${data.timestamp}`;
            return btoa(payload).slice(0, 12); // Signature simplifiée
        }

        /**
         * Vérifier l'expiration
         */
        isExpired(timestamp) {
            const currentTime = Math.floor(Date.now() / 1000);
            const tokenTime = parseInt(timestamp);
            const maxAge = this.config.tokenMaxAge || 300; // 5 minutes par défaut
            
            return (currentTime - tokenTime) > maxAge;
        }

        /**
         * Rediriger après succès
         */
        redirectAfterSuccess(userData) {
            let redirectUrl = this.config.redirectAfterSuccess;
            
            // Remplacer les variables dans l'URL
            redirectUrl = redirectUrl
                .replace('{user_id}', userData.user_id)
                .replace('{session_id}', userData.session_id)
                .replace('{partner_id}', userData.partner_id)
                .replace('{type}', userData.type);
            
            console.log('🔄 Redirection vers:', redirectUrl);
            
            // Redirection avec délai pour permettre les callbacks
            setTimeout(() => {
                window.location.href = redirectUrl;
            }, 100);
        }

        /**
         * Générer un état de sécurité
         */
        generateState() {
            const state = 'sunuid_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
            this.config.state = state;
            return state;
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