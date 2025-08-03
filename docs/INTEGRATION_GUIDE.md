# SunuID SDK - Guide d'Intégration

## 📦 Vue d'ensemble

Le SunuID SDK permet aux partenaires d'intégrer facilement les QR codes d'authentification et KYC dans leurs applications web. Ce package JavaScript offre une interface simple et moderne pour afficher les QR codes SunuID.

## 🚀 Installation

### 1. Inclure les fichiers

```html
<!-- CSS -->
<link rel="stylesheet" href="https://sunuid.sn/css/sunuid-sdk.css">

<!-- JavaScript -->
<script src="https://sunuid.sn/js/sunuid-sdk.js"></script>

<!-- FontAwesome (pour les icônes) -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
```

### 2. Initialisation

```javascript
// Configuration du SDK
const sunuidConfig = {
    apiUrl: 'https://sunuid.sn/api',
    partnerId: 'VOTRE_PARTNER_ID',
    clientId: 'VOTRE_CLIENT_ID',
    secretId: 'VOTRE_SECRET_ID',
    theme: 'light', // 'light' ou 'dark'
    language: 'fr',
    autoRefresh: true,
    refreshInterval: 30000, // 30 secondes
    onSuccess: function(data) {
        console.log('Authentification réussie:', data);
        // Rediriger vers le dashboard
        window.location.href = '/dashboard';
    },
    onError: function(error) {
        console.error('Erreur:', error);
        // Afficher un message d'erreur
        showErrorMessage('Erreur de connexion');
    },
    onExpired: function() {
        console.log('QR code expiré');
        // Actualiser automatiquement ou afficher un message
        showExpiredMessage();
    }
};

// Initialiser le SDK
const sunuid = initSunuID(sunuidConfig);
```

## 🔐 Authentification

### Générer un QR code d'authentification

```html
<!-- Conteneur pour le QR code -->
<div id="auth-qr-container"></div>
```

```javascript
// Générer le QR code d'authentification
sunuid.generateAuthQR('auth-qr-container', {
    theme: 'light',
    redirectUrl: 'https://votre-site.com/dashboard',
    customData: {
        userAgent: navigator.userAgent,
        timestamp: Date.now()
    }
});
```

## 📋 KYC (Know Your Customer)

### Générer un QR code KYC

```html
<!-- Conteneur pour le QR code KYC -->
<div id="kyc-qr-container"></div>
```

```javascript
// Générer le QR code KYC
sunuid.generateKYCQR('kyc-qr-container', {
    theme: 'dark',
    kycType: 'full', // 'basic' ou 'full'
    requiredFields: ['identity', 'address', 'phone'],
    redirectUrl: 'https://votre-site.com/kyc-complete'
});
```

## 🎨 Personnalisation

### Thèmes disponibles

```javascript
// Thème clair (par défaut)
sunuid.generateAuthQR('container', { theme: 'light' });

// Thème sombre
sunuid.generateAuthQR('container', { theme: 'dark' });
```

### Options de configuration

```javascript
const options = {
    theme: 'light',           // 'light' ou 'dark'
    language: 'fr',           // 'fr', 'en', 'ar'
    autoRefresh: true,        // Actualisation automatique
    refreshInterval: 30000,   // Intervalle en millisecondes
    redirectUrl: 'https://...', // URL de redirection après succès
    customData: {},           // Données personnalisées
    onSuccess: function(data) {
        // Callback en cas de succès
    },
    onError: function(error) {
        // Callback en cas d'erreur
    },
    onExpired: function() {
        // Callback quand le QR expire
    }
};
```

## 📱 Exemples Complets

### Page de Connexion

```html
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Connexion - Mon Application</title>
    <link rel="stylesheet" href="https://sunuid.sn/css/sunuid-sdk.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
</head>
<body>
    <div class="login-container">
        <h1>Connexion Sécurisée</h1>
        <p>Scannez le QR code avec l'application SunuID</p>
        
        <!-- Conteneur pour le QR code -->
        <div id="auth-qr-container"></div>
        
        <div class="login-footer">
            <p>Pas encore d'application SunuID ?</p>
            <a href="https://sunuid.sn/download" target="_blank">Télécharger</a>
        </div>
    </div>

    <script src="https://sunuid.sn/js/sunuid-sdk.js"></script>
    <script>
        // Configuration
        const sunuid = initSunuID({
            apiUrl: 'https://sunuid.sn/api',
            partnerId: 'VOTRE_PARTNER_ID',
            clientId: 'VOTRE_CLIENT_ID',
            secretId: 'VOTRE_SECRET_ID',
            theme: 'light',
            onSuccess: function(data) {
                // Rediriger vers le dashboard
                window.location.href = '/dashboard?token=' + data.token;
            },
            onError: function(error) {
                alert('Erreur de connexion: ' + error.message);
            }
        });

        // Générer le QR code
        sunuid.generateAuthQR('auth-qr-container');
    </script>
</body>
</html>
```

### Processus KYC

```html
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Vérification KYC</title>
    <link rel="stylesheet" href="https://sunuid.sn/css/sunuid-sdk.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
</head>
<body>
    <div class="kyc-container">
        <h1>Vérification d'Identité</h1>
        <p>Complétez votre profil avec SunuID</p>
        
        <!-- Conteneur pour le QR code KYC -->
        <div id="kyc-qr-container"></div>
        
        <div class="kyc-info">
            <h3>Informations requises :</h3>
            <ul>
                <li>Pièce d'identité (CNI, Passeport)</li>
                <li>Justificatif de domicile</li>
                <li>Photo de profil</li>
            </ul>
        </div>
    </div>

    <script src="https://sunuid.sn/js/sunuid-sdk.js"></script>
    <script>
        const sunuid = initSunuID({
            apiUrl: 'https://sunuid.sn/api',
            partnerId: 'VOTRE_PARTNER_ID',
            clientId: 'VOTRE_CLIENT_ID',
            secretId: 'VOTRE_SECRET_ID',
            theme: 'dark',
            onSuccess: function(data) {
                // KYC complété
                window.location.href = '/kyc-complete?status=success';
            },
            onError: function(error) {
                alert('Erreur KYC: ' + error.message);
            }
        });

        // Générer le QR code KYC
        sunuid.generateKYCQR('kyc-qr-container', {
            kycType: 'full',
            requiredFields: ['identity', 'address', 'phone', 'photo']
        });
    </script>
</body>
</html>
```

## 🔧 API Référence

### Méthodes principales

#### `generateAuthQR(containerId, options)`
Génère un QR code d'authentification.

**Paramètres :**
- `containerId` (string) : ID du conteneur HTML
- `options` (object) : Options de configuration

#### `generateKYCQR(containerId, options)`
Génère un QR code KYC.

**Paramètres :**
- `containerId` (string) : ID du conteneur HTML
- `options` (object) : Options de configuration

#### `checkQRStatus(qrId)`
Vérifie le statut d'un QR code.

**Paramètres :**
- `qrId` (string) : ID du QR code

#### `refreshQR(containerId, type, options)`
Actualise un QR code.

**Paramètres :**
- `containerId` (string) : ID du conteneur HTML
- `type` (string) : 'auth' ou 'kyc'
- `options` (object) : Options de configuration

#### `destroy()`
Nettoie les ressources du SDK.

### Événements

#### `onSuccess(data)`
Appelé quand l'authentification/KYC est réussie.

#### `onError(error)`
Appelé en cas d'erreur.

#### `onExpired()`
Appelé quand le QR code expire.

## 🛡️ Sécurité

### Authentification
Le SDK utilise les clés API du partenaire pour s'authentifier :
- `X-SunuID-Client-ID`
- `X-SunuID-Secret-ID`
- `X-SunuID-Partner-ID`

### Validation
- Vérification des paramètres requis
- Validation des URLs de redirection
- Protection contre les attaques CSRF

## 📊 Monitoring

### Logs
Le SDK génère des logs pour le debugging :
```javascript
console.log('SunuID SDK initialisé avec succès');
console.error('SunuID SDK Error:', error);
```

### Métriques
Les partenaires peuvent suivre :
- Nombre de QR codes générés
- Taux de succès d'authentification
- Temps de réponse de l'API

## 🆘 Support

### Documentation
- [Guide d'intégration](https://docs.sunuid.sn)
- [API Reference](https://api.sunuid.sn/docs)
- [Exemples](https://github.com/sunuid/sdk-examples)

### Support technique
- Email : support@sunuid.sn
- Chat : https://chat.sunuid.sn
- Documentation : https://docs.sunuid.sn

## 📄 Licence

Ce SDK est distribué sous licence MIT. Voir le fichier LICENSE pour plus de détails.

---

**Version :** 1.0.0  
**Dernière mise à jour :** Août 2025  
**Compatibilité :** ES6+, IE11+ 