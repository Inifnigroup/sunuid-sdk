/**
 * Configuration SunuID SDK - Personnalisation du Nom du Partenaire
 * 
 * Ce fichier montre comment configurer le SDK pour afficher le nom
 * de votre entreprise au lieu de "SunuID" dans les labels et textes.
 */

// Configuration pour la production avec nom personnalisé
window.SunuIDConfig = {
    // URL de l'API de production
    apiUrl: 'https://api.sunuid.fayma.sn',
    
    // Endpoints spécifiques
    endpoints: {
        qrGenerate: '/qr-generate',
        qrStatus: '/qr-status',
        qrConfirm: '/qr-confirm',
        debug: '/debug',
        test: '/test-sdk'
    }
};

// Exemple 1: Banque
const banqueConfig = {
    clientId: 'banque_client_id',
    secretId: 'banque_secret_id',
    type: 2, // Authentification
    partnerName: 'Ma Banque', // Nom personnalisé
    theme: 'light',
    language: 'fr',
    
    // Configuration pour la production
    apiUrl: 'https://api.sunuid.fayma.sn',
    secureInitUrl: 'https://sunuid.fayma.sn/secure-init.php',
    
    // Callbacks
    onSuccess: (data) => {
        console.log('Authentification réussie avec Ma Banque:', data);
    },
    onError: (error) => {
        console.error('Erreur Ma Banque:', error);
    }
};

// Exemple 2: E-commerce
const ecommerceConfig = {
    clientId: 'ecommerce_client_id',
    secretId: 'ecommerce_secret_id',
    type: 2, // Authentification
    partnerName: 'MonShop', // Nom personnalisé
    theme: 'dark',
    language: 'fr',
    
    // Configuration pour la production
    apiUrl: 'https://api.sunuid.fayma.sn',
    secureInitUrl: 'https://sunuid.fayma.sn/secure-init.php',
    
    // Callbacks
    onSuccess: (data) => {
        console.log('Authentification réussie avec MonShop:', data);
    },
    onError: (error) => {
        console.error('Erreur MonShop:', error);
    }
};

// Exemple 3: Administration
const adminConfig = {
    clientId: 'admin_client_id',
    secretId: 'admin_secret_id',
    type: 1, // KYC
    partnerName: 'Gouvernement', // Nom personnalisé
    theme: 'light',
    language: 'fr',
    
    // Configuration pour la production
    apiUrl: 'https://api.sunuid.fayma.sn',
    secureInitUrl: 'https://sunuid.fayma.sn/secure-init.php',
    
    // Callbacks
    onSuccess: (data) => {
        console.log('KYC réussi avec Gouvernement:', data);
    },
    onError: (error) => {
        console.error('Erreur Gouvernement:', error);
    }
};

// Initialisation avec configuration personnalisée
function initSunuIDWithPartnerName(config) {
    const sunuid = new SunuID(config);
    
    sunuid.init().then(() => {
        console.log(`SDK initialisé pour ${config.partnerName}`);
        
        // Exemple d'utilisation
        sunuid.generateQR('qr-container', {
            theme: config.theme,
            onSuccess: config.onSuccess,
            onError: config.onError
        });
        
    }).catch(error => {
        console.error(`Erreur d'initialisation pour ${config.partnerName}:`, error);
    });
    
    return sunuid;
}

// Utilisation
// initSunuIDWithPartnerName(banqueConfig);
// initSunuIDWithPartnerName(ecommerceConfig);
// initSunuIDWithPartnerName(adminConfig);

// Export pour utilisation dans d'autres fichiers
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        banqueConfig,
        ecommerceConfig,
        adminConfig,
        initSunuIDWithPartnerName
    };
} 