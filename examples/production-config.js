/**
 * Configuration SunuID SDK pour la Production
 * 
 * Ce fichier montre comment configurer le SDK pour la production
 * en remplaçant les URLs locales par les URLs de production.
 */

// Configuration pour la production
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
    },
    
    // Configuration par défaut
    defaultConfig: {
        theme: 'light',
        language: 'fr',
        autoRefresh: true,
        refreshInterval: 30000, // 30 secondes
        qrSize: 300,
        qrMargin: 10
    }
};

// Exemple d'utilisation en production
const sunuid = new SunuID({
    clientId: 'votre_client_id',
    secretId: 'votre_secret_id',
    type: 2, // Authentification
    partnerName: 'Votre Entreprise',
    theme: 'light',
    language: 'fr',
    
    // Configuration pour la production
    apiUrl: 'https://api.sunuid.fayma.sn',
    secureInitUrl: 'https://sunuid.fayma.sn/secure-init.php',
    
    // Callbacks
    onSuccess: (data) => {
        console.log('Authentification réussie:', data);
    },
    onError: (error) => {
        console.error('Erreur:', error);
    }
});

// Initialisation
sunuid.init().then(() => {
    console.log('SDK initialisé pour la production');
}).catch(error => {
    console.error('Erreur d\'initialisation:', error);
}); 