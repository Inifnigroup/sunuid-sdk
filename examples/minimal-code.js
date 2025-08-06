// ========================================
// INTÉGRATION MINIMALE SUNUID SDK
// ========================================

// 1. INCLUSION DES SCRIPTS (dans le HTML)
/*
<script src="https://cdn.socket.io/4.7.4/socket.io.min.js"></script>
<script src="https://unpkg.com/sunuid-sdk@1.0.34/dist/sunuid-sdk.min.js"></script>
*/

// 2. CONFIGURATION MINIMALE
const config = {
    clientId: '1754166754_221A57B46843D755',
    secretId: '56d40fe70507228b27f2640ae65894177c2fedbf246e2b30978fde1fc43953c5',
    type: 2, // 1=KYC, 2=AUTH, 3=SIGNATURE
    autoRefresh: false // Désactivé pour éviter les appels répétitifs
};

// 3. CODE D'INTÉGRATION MINIMAL
async function initSunuID() {
    try {
        // Créer l'instance SDK
        const sunuid = new SunuID(config);
        
        // Initialiser
        await sunuid.init();
        
        // Générer le QR code
        const result = await sunuid.generateQR('qr-container');
        
        console.log('✅ QR Code généré:', result.qrCodeUrl);
        return result;
        
    } catch (error) {
        console.error('❌ Erreur:', error.message);
        throw error;
    }
}

// 4. UTILISATION SIMPLE
// initSunuID().then(result => console.log('Succès:', result));

// ========================================
// EXEMPLE AVEC GESTION D'ÉVÉNEMENTS
// ========================================

async function initSunuIDWithEvents() {
    const sunuid = new SunuID({
        ...config,
        onSuccess: (data) => console.log('🎉 Succès:', data),
        onError: (error) => console.error('💥 Erreur:', error),
        onStatusUpdate: (status) => console.log('📊 Statut:', status)
    });
    
    await sunuid.init();
    return await sunuid.generateQR('qr-container');
}

// ========================================
// EXEMPLE AVEC DIFFÉRENTS TYPES
// ========================================

// Authentification (défaut)
const authConfig = { ...config, type: 2 };

// KYC (Vérification d'identité)
const kycConfig = { ...config, type: 1 };

// Signature électronique
const signatureConfig = { ...config, type: 3 };

// ========================================
// EXEMPLE AVEC RAFRAÎCHISSEMENT
// ========================================

async function initSunuIDWithRefresh() {
    const sunuid = new SunuID({
        ...config,
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
// EXEMPLE COMPLET AVEC HTML
// ========================================

/*
HTML minimal requis :

<div id="qr-container">
    <!-- Le QR code sera affiché ici -->
</div>

<button onclick="initSunuID()">Générer QR Code</button>
*/

// ========================================
// EXEMPLE AVEC GESTION D'ÉTAT
// ========================================

let sunuidInstance = null;

async function initSDK() {
    if (sunuidInstance) {
        console.log('SDK déjà initialisé');
        return sunuidInstance;
    }
    
    sunuidInstance = new SunuID(config);
    await sunuidInstance.init();
    return sunuidInstance;
}

async function generateQRCode(containerId = 'qr-container') {
    if (!sunuidInstance) {
        await initSDK();
    }
    
    return await sunuidInstance.generateQR(containerId);
}

// ========================================
// EXPORT POUR UTILISATION MODULE
// ========================================

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initSunuID,
        initSunuIDWithEvents,
        initSunuIDWithRefresh,
        initSDK,
        generateQRCode,
        config
    };
} 