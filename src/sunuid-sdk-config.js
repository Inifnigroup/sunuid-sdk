/**
 * Configuration SunuID SDK - Version Externe
 * 
 * @version 1.0.0
 * @author SunuID Team
 * @license MIT
 */

// Configuration par défaut pour le SDK
window.SunuIDConfig = {
    // URL de l'API
    apiUrl: 'https://sunuid.fayma.sn/api',
    
    // Endpoints spécifiques
    endpoints: {
        qrGenerate: '/auth/qr-generate.php',
        qrStatus: '/auth/qr-status.php',
        qrConfirm: '/auth/qr-confirm.php',
        debug: '/auth/debug.php',
        test: '/auth/test-sdk.php'
    },
    
    // Configuration par défaut
    defaultConfig: {
        theme: 'light',
        language: 'fr',
        autoRefresh: true,
        refreshInterval: 30000, // 30 secondes
        qrSize: 300,
        qrMargin: 10
    },
    
    // Messages d'erreur
    messages: {
        fr: {
            initialization_error: 'Erreur lors de l\'initialisation du SDK',
            authentication_error: 'Erreur d\'authentification',
            qr_generation_error: 'Erreur lors de la génération du QR code',
            qr_expired: 'QR code expiré',
            network_error: 'Erreur de réseau',
            invalid_response: 'Réponse invalide du serveur'
        },
        en: {
            initialization_error: 'SDK initialization error',
            authentication_error: 'Authentication error',
            qr_generation_error: 'QR code generation error',
            qr_expired: 'QR code expired',
            network_error: 'Network error',
            invalid_response: 'Invalid server response'
        }
    },
    
    // Validation des paramètres
    validation: {
        requiredFields: ['clientId', 'secretId'],
        allowedTypes: ['auth', 'kyc', 'payment', 'verification'],
        maxMetadataSize: 1024 // 1KB
    }
};

// Fonction utilitaire pour obtenir la configuration
window.getSunuIDConfig = function(key = null) {
    if (key) {
        return window.SunuIDConfig[key] || null;
    }
    return window.SunuIDConfig;
};

// Fonction utilitaire pour valider la configuration
window.validateSunuIDConfig = function(config) {
    const required = window.SunuIDConfig.validation.requiredFields;
    const missing = [];
    
    required.forEach(field => {
        if (!config[field]) {
            missing.push(field);
        }
    });
    
    if (missing.length > 0) {
        throw new Error(`Champs requis manquants: ${missing.join(', ')}`);
    }
    
    return true;
};

// Fonction utilitaire pour construire l'URL complète
window.buildSunuIDUrl = function(endpoint) {
    const baseUrl = window.SunuIDConfig.apiUrl;
    const endpointPath = window.SunuIDConfig.endpoints[endpoint] || endpoint;
    return `${baseUrl}${endpointPath}`;
};

// Fonction utilitaire pour gérer les erreurs
window.handleSunuIDError = function(error, language = 'fr') {
    const messages = window.SunuIDConfig.messages[language] || window.SunuIDConfig.messages.fr;
    
    if (error.message.includes('authentication')) {
        return messages.authentication_error;
    } else if (error.message.includes('QR')) {
        return messages.qr_generation_error;
    } else if (error.message.includes('network')) {
        return messages.network_error;
    } else {
        return error.message || messages.invalid_response;
    }
}; 