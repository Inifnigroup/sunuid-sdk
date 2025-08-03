# 🔐 SunuID SDK

[![npm version](https://badge.fury.io/js/sunuid-sdk.svg)](https://badge.fury.io/js/sunuid-sdk)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Build Status](https://github.com/sunuid/sunuid-sdk/workflows/Build/badge.svg)](https://github.com/sunuid/sunuid-sdk/actions)

SDK JavaScript officiel pour intégrer facilement les QR codes d'authentification et KYC SunuID dans vos applications web.

## ✨ Fonctionnalités

- 🔐 **Authentification QR Code** - Connexion sécurisée avec SunuID
- 📋 **Vérification KYC** - Collecte et validation d'identité
- 🎨 **Thèmes personnalisables** - Support des thèmes clair et sombre
- 🔄 **Actualisation automatique** - QR codes qui se renouvellent automatiquement
- 📱 **Responsive design** - Compatible mobile et desktop
- 🌍 **Multi-langue** - Support français, anglais, arabe
- 🛡️ **Sécurisé** - Authentification par clés API

## 🚀 Installation

### Via NPM

```bash
npm install sunuid-sdk
```

### Via CDN

```html
<!-- CSS -->
<link rel="stylesheet" href="https://unpkg.com/sunuid-sdk@1.0.0/dist/sunuid-sdk.css">

<!-- JavaScript -->
<script src="https://unpkg.com/sunuid-sdk@1.0.0/dist/sunuid-sdk.js"></script>
```

## 📖 Utilisation Rapide

### 1. Initialisation

```javascript
const sunuid = initSunuID({
    apiUrl: 'https://sunuid.fayma.sn/api',
    clientId: 'VOTRE_CLIENT_ID',
    secretId: 'VOTRE_SECRET_ID',
    theme: 'light'
});
```

### 2. Authentification

```html
<div id="auth-qr-container"></div>
```

```javascript
sunuid.generateAuthQR('auth-qr-container', {
    redirectUrl: 'https://votre-site.com/dashboard'
});
```

### 3. KYC

```html
<div id="kyc-qr-container"></div>
```

```javascript
sunuid.generateKYCQR('kyc-qr-container', {
    kycType: 'full',
    requiredFields: ['identity', 'address', 'phone']
});
```

## 🎨 Exemples

### Page de Connexion

```html
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Connexion - Mon Application</title>
    <link rel="stylesheet" href="https://unpkg.com/sunuid-sdk@1.0.0/dist/sunuid-sdk.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
</head>
<body>
    <div class="login-container">
        <h1>Connexion Sécurisée</h1>
        <p>Scannez le QR code avec l'application SunuID</p>
        
        <div id="auth-qr-container"></div>
        
        <div class="login-footer">
            <p>Pas encore d'application SunuID ?</p>
            <a href="https://sunuid.sn/download" target="_blank">Télécharger</a>
        </div>
    </div>

    <script src="https://unpkg.com/sunuid-sdk@1.0.0/dist/sunuid-sdk.js"></script>
    <script>
        const sunuid = initSunuID({
            apiUrl: 'https://sunuid.fayma.sn/api',
            clientId: 'VOTRE_CLIENT_ID',
            secretId: 'VOTRE_SECRET_ID',
            theme: 'light',
            onSuccess: function(data) {
                window.location.href = '/dashboard?token=' + data.token;
            },
            onError: function(error) {
                alert('Erreur de connexion: ' + error.message);
            }
        });

        sunuid.generateAuthQR('auth-qr-container');
    </script>
</body>
</html>
```

## 🔧 Configuration

### Options disponibles

| Option | Type | Défaut | Description |
|--------|------|--------|-------------|
| `apiUrl` | string | `'https://sunuid.fayma.sn/api'` | URL de l'API SunuID |
| `clientId` | string | - | Clé client (requise) |
| `secretId` | string | - | Clé secrète (requise) |
| `theme` | string | `'light'` | Thème: `'light'` ou `'dark'` |
| `language` | string | `'fr'` | Langue: `'fr'`, `'en'`, `'ar'` |
| `autoRefresh` | boolean | `true` | Actualisation automatique |
| `refreshInterval` | number | `30000` | Intervalle en millisecondes |
| `onSuccess` | function | - | Callback en cas de succès |
| `onError` | function | - | Callback en cas d'erreur |
| `onExpired` | function | - | Callback quand le QR expire |

### Événements

```javascript
const sunuid = initSunuID({
    // ... configuration
    onSuccess: function(data) {
        console.log('Authentification réussie:', data);
        // data contient: token, user, partner, etc.
    },
    onError: function(error) {
        console.error('Erreur:', error);
        // error contient: message, code, details
    },
    onExpired: function() {
        console.log('QR code expiré');
        // Le QR code a expiré, actualisation automatique
    }
});
```

## 📱 API Référence

### Méthodes principales

#### `generateAuthQR(containerId, options)`
Génère un QR code d'authentification.

```javascript
sunuid.generateAuthQR('container-id', {
    theme: 'light',
    redirectUrl: 'https://votre-site.com/dashboard',
    customData: { /* données personnalisées */ }
});
```

#### `generateKYCQR(containerId, options)`
Génère un QR code KYC.

```javascript
sunuid.generateKYCQR('container-id', {
    theme: 'dark',
    kycType: 'full', // 'basic' ou 'full'
    requiredFields: ['identity', 'address', 'phone'],
    redirectUrl: 'https://votre-site.com/kyc-complete'
});
```

#### `checkQRStatus(qrId)`
Vérifie le statut d'un QR code.

```javascript
const status = await sunuid.checkQRStatus('qr-id-123');
console.log('Statut:', status);
```

#### `refreshQR(containerId, type, options)`
Actualise un QR code.

```javascript
sunuid.refreshQR('container-id', 'auth', { theme: 'light' });
```

#### `destroy()`
Nettoie les ressources du SDK.

```javascript
sunuid.destroy();
```

## 🛡️ Sécurité

### Authentification
Le SDK utilise les clés API pour s'authentifier :
- `X-SunuID-Client-ID`
- `X-SunuID-Secret-ID`

### Validation
- Vérification des paramètres requis
- Validation des URLs de redirection
- Protection contre les attaques CSRF

## 🌐 Compatibilité

- **Navigateurs** : Chrome 60+, Firefox 55+, Safari 12+, Edge 79+
- **Mobile** : iOS Safari 12+, Chrome Mobile 60+
- **Node.js** : 14.0.0+

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

### Communauté
- [GitHub Issues](https://github.com/sunuid/sunuid-sdk/issues)
- [Discussions](https://github.com/sunuid/sunuid-sdk/discussions)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/sunuid)

## 🤝 Contribution

Les contributions sont les bienvenues ! Consultez notre [guide de contribution](CONTRIBUTING.md).

### Développement

```bash
# Cloner le repository
git clone https://github.com/sunuid/sunuid-sdk.git
cd sunuid-sdk

# Installer les dépendances
npm install

# Démarrer le mode développement
npm run dev

# Construire pour la production
npm run build

# Lancer les tests
npm test

# Démarrer le serveur de démonstration
npm run serve
npm run demo
```

## 📄 Licence

Ce projet est distribué sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

## 🙏 Remerciements

- [FontAwesome](https://fontawesome.com/) pour les icônes
- [Inter](https://rsms.me/inter/) pour la typographie
- [Rollup](https://rollupjs.org/) pour le bundling

---

**Développé avec ❤️ par l'équipe SunuID**

[![SunuID](https://sunuid.sn/logo.png)](https://sunuid.sn) 