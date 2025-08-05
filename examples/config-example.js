// 🌍 Configuration SunuID - Exemple Ultra-Simple
// Copiez ce fichier et remplacez les valeurs par les vôtres !

const sunuidConfig = {
    // 🔑 Vos credentials (obtenez-les sur https://sunuid.sn/register)
    client_id: 'VOTRE_CLIENT_ID',      // ← Remplacez par votre CLIENT_ID
    secret_id: 'VOTRE_SECRET_ID',      // ← Remplacez par votre SECRET_ID
    
    // 🎯 Type de service
    type: 2,                           // ← 1=KYC, 2=AUTH, 3=Signature
    
    // 🏢 Nom de votre entreprise
    partner_name: 'Votre Entreprise',  // ← Remplacez par votre nom
    
    // 🔧 Options avancées (optionnel)
    options: {
        // URL de redirection après connexion
        redirect_url: 'https://votre-site.com/dashboard',
        
        // Pour KYC uniquement
        kyc_type: 'full',              // 'basic' ou 'full'
        required_fields: ['identity', 'address', 'phone'],
        
        // Personnalisation
        qr_size: 300,                  // Taille du QR code
        logo_url: 'https://votre-site.com/logo.png', // Votre logo
        theme: 'default'               // 'default', 'dark', 'custom'
    }
};

// 📝 Comment utiliser :
// 1. Remplacez les valeurs ci-dessus
// 2. Sauvegardez en config.js
// 3. Incluez dans votre HTML :
//    <script src="config.js"></script>
//    <script>
//        const sunuid = new SunuID(sunuidConfig);
//        sunuid.init();
//    </script>

// 🎉 C'est tout ! Votre configuration est prête ! 