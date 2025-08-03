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
        apiUrl: 'https://sunuid.sn/api',
        partnerId: null,
        clientId: null,
        secretId: null,
        theme: 'light',
        language: 'fr',
        autoRefresh: true,
        refreshInterval: 30000, // 30 secondes
        onSuccess: null,
        onError: null,
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
            
            this.init();
        }

        /**
         * Initialisation du SDK
         */
        init() {
            if (!this.config.partnerId || !this.config.clientId || !this.config.secretId) {
                throw new Error('SunuID: partnerId, clientId et secretId sont requis');
            }

            this.isInitialized = true;
            console.log('SunuID SDK initialisé avec succès');
        }

        /**
         * Générer un QR code d'authentification
         */
        async generateAuthQR(containerId, options = {}) {
            if (!this.isInitialized) {
                throw new Error('SunuID: SDK non initialisé');
            }

            try {
                const response = await this.makeRequest('/auth/qr-generate', {
                    partner_id: this.config.partnerId,
                    type: 'auth',
                    ...options
                });

                if (response.success) {
                    this.displayQRCode(containerId, response.data.qr_code_url, 'auth', options);
                    this.startAutoRefresh(containerId, 'auth', options);
                    return response.data;
                } else {
                    throw new Error(response.message);
                }
            } catch (error) {
                this.handleError(error);
                throw error;
            }
        }

        /**
         * Générer un QR code KYC
         */
        async generateKYCQR(containerId, options = {}) {
            if (!this.isInitialized) {
                throw new Error('SunuID: SDK non initialisé');
            }

            try {
                const response = await this.makeRequest('/auth/qr-generate', {
                    partner_id: this.config.partnerId,
                    type: 'kyc',
                    ...options
                });

                if (response.success) {
                    this.displayQRCode(containerId, response.data.qr_code_url, 'kyc', options);
                    this.startAutoRefresh(containerId, 'kyc', options);
                    return response.data;
                } else {
                    throw new Error(response.message);
                }
            } catch (error) {
                this.handleError(error);
                throw error;
            }
        }

        /**
         * Vérifier le statut d'un QR code
         */
        async checkQRStatus(qrId) {
            try {
                const response = await this.makeRequest('/auth/qr-status', {
                    qr_id: qrId
                });

                return response.data;
            } catch (error) {
                this.handleError(error);
                throw error;
            }
        }

        /**
         * Afficher le QR code dans le conteneur
         */
        displayQRCode(containerId, qrUrl, type, options = {}) {
            const container = document.getElementById(containerId);
            if (!container) {
                throw new Error(`Conteneur avec l'ID "${containerId}" non trouvé`);
            }

            const theme = options.theme || this.config.theme;
            const language = options.language || this.config.language;

            container.innerHTML = `
                <div class="sunuid-qr-container sunuid-theme-${theme}">
                    <div class="sunuid-qr-header">
                        <h3 class="sunuid-qr-title">
                            ${type === 'auth' ? '🔐 Authentification' : '📋 Vérification KYC'}
                        </h3>
                        <p class="sunuid-qr-subtitle">
                            ${type === 'auth' ? 
                                'Scannez ce QR code avec l\'application SunuID pour vous connecter' :
                                'Scannez ce QR code avec l\'application SunuID pour compléter votre profil'
                            }
                        </p>
                    </div>
                    <div class="sunuid-qr-code">
                        <img src="${qrUrl}" alt="QR Code SunuID" class="sunuid-qr-image">
                        <div class="sunuid-qr-overlay">
                            <div class="sunuid-qr-spinner"></div>
                        </div>
                    </div>
                    <div class="sunuid-qr-footer">
                        <p class="sunuid-qr-timer">
                            <i class="fa-solid fa-clock"></i>
                            <span id="sunuid-timer">30</span> secondes
                        </p>
                        <button class="sunuid-qr-refresh" onclick="sunuidInstance.refreshQR('${containerId}', '${type}', ${JSON.stringify(options)})">
                            <i class="fa-solid fa-sync-alt"></i>
                            Actualiser
                        </button>
                    </div>
                </div>
            `;

            this.qrCode = {
                containerId,
                type,
                options,
                qrUrl
            };

            this.startTimer();
        }

        /**
         * Actualiser le QR code
         */
        async refreshQR(containerId, type, options = {}) {
            try {
                if (type === 'auth') {
                    await this.generateAuthQR(containerId, options);
                } else {
                    await this.generateKYCQR(containerId, options);
                }
            } catch (error) {
                this.handleError(error);
            }
        }

        /**
         * Démarrer le timer de rafraîchissement automatique
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
        startTimer() {
            let timeLeft = 30;
            const timerElement = document.getElementById('sunuid-timer');
            
            const timer = setInterval(() => {
                timeLeft--;
                if (timerElement) {
                    timerElement.textContent = timeLeft;
                }
                
                if (timeLeft <= 0) {
                    clearInterval(timer);
                    if (this.config.onExpired) {
                        this.config.onExpired();
                    }
                }
            }, 1000);
        }

        /**
         * Effectuer une requête API
         */
        async makeRequest(endpoint, data) {
            const url = `${this.config.apiUrl}${endpoint}`;
            
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-SunuID-Client-ID': this.config.clientId,
                    'X-SunuID-Secret-ID': this.config.secretId,
                    'X-SunuID-Partner-ID': this.config.partnerId
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error(`Erreur HTTP: ${response.status}`);
            }

            return await response.json();
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