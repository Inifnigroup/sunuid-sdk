// ========================================
// INTÉGRATION AUTOMATIQUE SUNUID SDK
// ========================================

// 1. INCLUSION DES SCRIPTS (dans le HTML)
/*
<script src="https://cdn.socket.io/4.7.4/socket.io.min.js"></script>
<script src="https://unpkg.com/sunuid-sdk@1.0.34/dist/sunuid-sdk.min.js"></script>
*/

// 2. CONFIGURATION AUTOMATIQUE
const autoConfig = {
    clientId: '1754166754_221A57B46843D755',
    secretId: '56d40fe70507228b27f2640ae65894177c2fedbf246e2b30978fde1fc43953c5',
    type: 2, // 1=KYC, 2=AUTH, 3=SIGNATURE
    autoRefresh: false, // Désactivé pour éviter les appels répétitifs
    // Callbacks automatiques
    onSuccess: (data) => console.log('🎉 Succès:', data),
    onError: (error) => console.error('💥 Erreur:', error),
    onStatusUpdate: (status) => console.log('📊 Statut:', status)
};

// 3. CODE D'INITIALISATION AUTOMATIQUE
async function initAutoSunuID() {
    try {
        console.log('🚀 Initialisation automatique...');
        
        // Créer l'instance SDK
        const sunuid = new SunuID(autoConfig);
        
        // Initialiser automatiquement
        await sunuid.init();
        
        // Générer le QR code automatiquement
        const result = await sunuid.generateQR('qr-container');
        
        console.log('✅ QR Code généré automatiquement:', result);
        return result;
        
    } catch (error) {
        console.error('❌ Erreur d\'initialisation automatique:', error);
        throw error;
    }
}

// 4. INITIALISATION AUTOMATIQUE AU CHARGEMENT
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Démarrage automatique...');
    
    // Attendre que tout soit chargé
    setTimeout(() => {
        initAutoSunuID().catch(error => {
            console.error('❌ Échec de l\'initialisation automatique:', error);
        });
    }, 500);
});

// ========================================
// VERSION AVEC GESTION D'ÉTAT
// ========================================

let sunuidInstance = null;

async function initAutoSunuIDWithState() {
    if (sunuidInstance) {
        console.log('SDK déjà initialisé');
        return sunuidInstance;
    }
    
    try {
        sunuidInstance = new SunuID(autoConfig);
        await sunuidInstance.init();
        
        const result = await sunuidInstance.generateQR('qr-container');
        console.log('✅ QR Code généré:', result);
        
        return sunuidInstance;
        
    } catch (error) {
        sunuidInstance = null;
        throw error;
    }
}

// ========================================
// VERSION AVEC ÉVÉNEMENTS WEBSOCKET
// ========================================

async function initAutoSunuIDWithEvents() {
    const sunuid = new SunuID({
        ...autoConfig,
        onSuccess: (data) => {
            console.log('🎉 Authentification réussie:', data);
            // Rediriger ou afficher un message de succès
        },
        onError: (error) => {
            console.error('💥 Erreur d\'authentification:', error);
            // Afficher un message d'erreur
        }
    });
    
    await sunuid.init();
    const result = await sunuid.generateQR('qr-container');
    
    // Écouter les événements WebSocket
    if (sunuid.socket) {
        sunuid.socket.on('qr_scanned', (data) => {
            console.log('📱 QR code scanné:', data);
        });
        
        sunuid.socket.on('auth_success', (data) => {
            console.log('🎉 Authentification réussie:', data);
        });
        
        sunuid.socket.on('auth_error', (data) => {
            console.error('❌ Erreur d\'authentification:', data);
        });
    }
    
    return result;
}

// ========================================
// VERSION AVEC RAFRAÎCHISSEMENT AUTOMATIQUE
// ========================================

async function initAutoSunuIDWithRefresh() {
    const sunuid = new SunuID({
        ...autoConfig,
        autoRefresh: true, // Activer le rafraîchissement
        refreshInterval: 30000 // 30 secondes
    });
    
    await sunuid.init();
    const result = await sunuid.generateQR('qr-container');
    
    // Arrêter le rafraîchissement après 2 minutes
    setTimeout(() => {
        sunuid.stopAutoRefresh();
        console.log('🔄 Rafraîchissement arrêté');
    }, 120000);
    
    return result;
}

// ========================================
// VERSION AVEC GESTION D'ERREURS AVANCÉE
// ========================================

async function initAutoSunuIDWithErrorHandling() {
    let retryCount = 0;
    const maxRetries = 3;
    
    while (retryCount < maxRetries) {
        try {
            console.log(`🔄 Tentative ${retryCount + 1}/${maxRetries}`);
            
            const sunuid = new SunuID(autoConfig);
            await sunuid.init();
            const result = await sunuid.generateQR('qr-container');
            
            console.log('✅ QR Code généré avec succès');
            return result;
            
        } catch (error) {
            retryCount++;
            console.error(`❌ Tentative ${retryCount} échouée:`, error.message);
            
            if (retryCount >= maxRetries) {
                console.error('❌ Nombre maximum de tentatives atteint');
                throw new Error('Impossible d\'initialiser le SDK après plusieurs tentatives');
            }
            
            // Attendre avant de réessayer
            await new Promise(resolve => setTimeout(resolve, 2000 * retryCount));
        }
    }
}

// ========================================
// VERSION AVEC DIFFÉRENTS TYPES
// ========================================

// Authentification automatique
async function initAuthAuto() {
    const config = { ...autoConfig, type: 2 };
    const sunuid = new SunuID(config);
    await sunuid.init();
    return await sunuid.generateQR('qr-container');
}

// KYC automatique
async function initKYCAuto() {
    const config = { ...autoConfig, type: 1 };
    const sunuid = new SunuID(config);
    await sunuid.init();
    return await sunuid.generateQR('qr-container');
}

// Signature automatique
async function initSignatureAuto() {
    const config = { ...autoConfig, type: 3 };
    const sunuid = new SunuID(config);
    await sunuid.init();
    return await sunuid.generateQR('qr-container');
}

// ========================================
// HTML MINIMAL REQUIS
// ========================================

/*
<div id="qr-container">
    <!-- Le QR code sera affiché ici automatiquement -->
</div>
*/

// ========================================
// EXPORT POUR UTILISATION MODULE
// ========================================

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initAutoSunuID,
        initAutoSunuIDWithState,
        initAutoSunuIDWithEvents,
        initAutoSunuIDWithRefresh,
        initAutoSunuIDWithErrorHandling,
        initAuthAuto,
        initKYCAuto,
        initSignatureAuto,
        autoConfig
    };
} 