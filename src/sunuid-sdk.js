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
        apiUrl: 'https://sunuid.fayma.sn/api',
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
            if (!this.config.clientId || !this.config.secretId) {
                throw new Error('SunuID: clientId et secretId sont requis');
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
                const response = await this.makeRequest('/auth/qr-generate.php', {
                    type: 'auth',
                    ...options
                });

                if (response.success) {
                    this.displayQRCode(containerId, response.data.qrCodeUrl, 'auth', options);
                    this.startAutoRefresh(containerId, 'auth', options);
                    return response.data;
                } else {
                    throw new Error(response.message || 'Erreur lors de la génération du QR code');
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
                const response = await this.makeRequest('/auth/qr-generate.php', {
                    type: 'kyc',
                    ...options
                });

                if (response.success) {
                    this.displayQRCode(containerId, response.data.qrCodeUrl, 'kyc', options);
                    this.startAutoRefresh(containerId, 'kyc', options);
                    return response.data;
                } else {
                    throw new Error(response.message || 'Erreur lors de la génération du QR code KYC');
                }
            } catch (error) {
                this.handleError(error);
                throw error;
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
                const response = await this.makeRequest('/auth/qr-status.php', {
                    sessionId: sessionId
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
            qrElement.innerHTML = `
                <div class="sunuid-qr-header">
                    <h3>${type === 'auth' ? 'Authentification' : 'Vérification KYC'}</h3>
                    <div class="sunuid-timer">
                        <span>Expire dans: </span>
                        <span id="sunuid-timer">30</span>
                        <span> secondes</span>
                    </div>
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

            // Démarrer le timer
            this.startTimer();

            // Appliquer le thème
            this.applyTheme(options.theme || this.config.theme);
        }

        /**
         * Rafraîchir un QR code
         */
        async refreshQR(containerId, type, options = {}) {
            try {
                const result = type === 'auth' 
                    ? await this.generateAuthQR(containerId, options)
                    : await this.generateKYCQR(containerId, options);
                
                return result;
            } catch (error) {
                this.handleError(error);
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
            
            try {
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-SunuID-Client-ID': this.config.clientId,
                        'X-SunuID-Secret-ID': this.config.secretId,
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify(data)
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