# 🔐 SunuID SDK

[![npm version](https://badge.fury.io/js/sunuid-sdk.svg)](https://badge.fury.io/js/sunuid-sdk)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Build Status](https://github.com/sunuid/sunuid-sdk/workflows/Build/badge.svg)](https://github.com/sunuid/sunuid-sdk/actions)

SDK JavaScript officiel pour intégrer facilement les QR codes d'authentification et KYC SunuID dans vos applications web.

## ✨ Fonctionnalités

- 🔐 **Authentification QR Code** - Connexion sécurisée avec SunuID
- 📋 **Vérification KYC** - Collecte et validation d'identité
- 🌐 **WebSocket en Temps Réel** - Connexion automatique pour les mises à jour
- 🎨 **Thèmes personnalisables** - Support des thèmes clair et sombre
- 🔄 **Actualisation automatique** - QR codes qui se renouvellent automatiquement
- 📱 **Responsive design** - Compatible mobile et desktop
- 🌍 **Multi-langue** - Support français, anglais, arabe
- 🛡️ **Sécurisé** - Authentification par clés API
- 🔢 **Types numériques** - Support des types 1, 2, 3 pour différents services

## 🚀 Installation

### Via NPM

```bash
npm install sunuid-sdk
```

### Via CDN

```html
<!-- Socket.IO requis pour WebSocket -->
<script src="https://cdn.socket.io/4.7.0/socket.io.min.js"></script>

<!-- CSS -->
<link rel="stylesheet" href="https://unpkg.com/sunuid-sdk@1.0.23/dist/sunuid-sdk.css">

<!-- JavaScript -->
<script src="https://unpkg.com/sunuid-sdk@1.0.23/dist/sunuid-sdk.js"></script>
```

## 📖 Utilisation Rapide

### 1. Initialisation avec WebSocket

```javascript
const sunuid = initSunuID({
    apiUrl: 'https://api.sunuid.fayma.sn',
    clientId: 'VOTRE_CLIENT_ID',
    secretId: 'VOTRE_SECRET_ID',
    type: 1, // 1 = authentification, 2 = KYC, 3 = service personnalisé
    theme: 'light',
    onSuccess: function(data) {
        console.log('Authentification réussie:', data);
    },
    onError: function(error) {
        console.error('Erreur:', error);
    },
    onStatusUpdate: function(data) {
        console.log('Mise à jour statut:', data);
    },
    onExpired: function(data) {
        console.log('QR expiré:', data);
    }
});
```

### 2. Génération QR avec WebSocket

```html
<div id="qr-container"></div>
```

```javascript
// Génère QR et émet automatiquement un événement WebSocket
const result = await sunuid.generateQR('qr-container', {
    metadata: {
        customData: 'votre-donnée'
    }
});

console.log('QR généré:', result.qrCodeUrl);
console.log('Service ID:', result.service_id);
```

### 3. Écoute des événements WebSocket

```javascript
// Le SDK se connecte automatiquement au WebSocket
// Événements disponibles :
// - qr_status_update : Mise à jour du statut
// - qr_scan_success : Scan réussi
// - qr_expired : QR expiré

// Émettre un événement personnalisé
sunuid.emitWebSocketEvent('custom_event', {
    message: 'Hello WebSocket!',
    timestamp: Date.now()
});

// Vérifier le statut WebSocket
const status = sunuid.getWebSocketStatus(); // 'connected', 'disconnected', 'not_initialized'
```

## 🎨 Exemples

### Page de Connexion avec WebSocket

```html
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Connexion - Mon Application</title>
    <link rel="stylesheet" href="https://unpkg.com/sunuid-sdk@1.0.23/dist/sunuid-sdk.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
</head>
<body>
    <div class="login-container">
        <h1>Connexion Sécurisée</h1>
        <p>Scannez le QR code avec l'application SunuID</p>
        
        <div id="qr-container"></div>
        
        <div class="login-footer">
            <p>Pas encore d'application SunuID ?</p>
            <a href="https://sunuid.sn/download" target="_blank">Télécharger</a>
        </div>
    </div>

    <!-- Socket.IO requis -->
    <script src="https://cdn.socket.io/4.7.0/socket.io.min.js"></script>
    
    <!-- SDK SunuID -->
    <script src="https://unpkg.com/sunuid-sdk@1.0.23/dist/sunuid-sdk.js"></script>
    
    <script>
        const sunuid = initSunuID({
            apiUrl: 'https://api.sunuid.fayma.sn',
            clientId: 'VOTRE_CLIENT_ID',
            secretId: 'VOTRE_SECRET_ID',
            type: 1,
            theme: 'light',
            onSuccess: function(data) {
                console.log('✅ Authentification réussie:', data);
                window.location.href = '/dashboard?token=' + data.token;
            },
            onError: function(error) {
                console.error('❌ Erreur:', error);
                alert('Erreur de connexion: ' + error.message);
            },
            onStatusUpdate: function(data) {
                console.log('📱 Mise à jour statut:', data);
            },
            onExpired: function(data) {
                console.log('⏰ QR expiré:', data);
            }
        });

        // Générer le QR code (WebSocket se connecte automatiquement)
        sunuid.generateQR('qr-container');
    </script>
</body>
</html>
```

## 🔧 Configuration

### Options disponibles

| Option | Type | Défaut | Description |
|--------|------|--------|-------------|
| `apiUrl` | string | `'https://api.sunuid.fayma.sn'` | URL de l'API SunuID |
| `clientId` | string | - | Clé client (requise) |
| `secretId` | string | - | Clé secrète (requise) |
| `type` | number | `1` | Type de service: `1` (auth), `2` (KYC), `3` (personnalisé) |
| `theme` | string | `'light'` | Thème: `'light'` ou `'dark'` |
| `language` | string | `'fr'` | Langue: `'fr'`, `'en'`, `'ar'` |
| `autoRefresh` | boolean | `true` | Actualisation automatique |
| `refreshInterval` | number | `30000` | Intervalle en millisecondes |
| `onSuccess` | function | - | Callback en cas de succès |
| `onError` | function | - | Callback en cas d'erreur |
| `onStatusUpdate` | function | - | Callback pour mises à jour WebSocket |
| `onExpired` | function | - | Callback quand le QR expire |

### Événements WebSocket

```javascript
const sunuid = initSunuID({
    // ... configuration
    onSuccess: function(data) {
        console.log('✅ Authentification réussie:', data);
        // data contient: token, user, service_id, etc.
    },
    onError: function(error) {
        console.error('❌ Erreur:', error);
        // error contient: message, code, details
    },
    onStatusUpdate: function(data) {
        console.log('📱 Mise à jour statut:', data);
        // Mise à jour reçue via WebSocket
    },
    onExpired: function(data) {
        console.log('⏰ QR expiré:', data);
        // QR expiré, actualisation automatique
    }
});
```

## 📱 API Référence

### Méthodes principales

#### `generateQR(containerId, options)`
Génère un QR code avec le type configuré et émet un événement WebSocket.

```javascript
const result = await sunuid.generateQR('container-id', {
    metadata: {
        customData: 'votre-donnée',
        timestamp: Date.now()
    }
});

console.log('QR généré:', result.qrCodeUrl);
console.log('Service ID:', result.service_id);
```

#### `generateAuthQR(containerId, options)` (Alias)
Génère un QR code d'authentification (type 1).

```javascript
sunuid.generateAuthQR('container-id', {
    theme: 'light',
    redirectUrl: 'https://votre-site.com/dashboard',
    customData: { /* données personnalisées */ }
});
```

#### `generateKYCQR(containerId, options)` (Alias)
Génère un QR code KYC (type 2).

```javascript
sunuid.generateKYCQR('container-id', {
    theme: 'dark',
    kycType: 'full', // 'basic' ou 'full'
    requiredFields: ['identity', 'address', 'phone'],
    redirectUrl: 'https://votre-site.com/kyc-complete'
});
```

#### `checkQRStatus(serviceId)`
Vérifie le statut d'un QR code.

```javascript
const status = await sunuid.checkQRStatus('service-id-123');
console.log('Statut:', status);
```

#### `refreshQR(containerId, options)`
Actualise un QR code.

```javascript
sunuid.refreshQR('container-id', { theme: 'light' });
```

### Méthodes WebSocket

#### `getWebSocketStatus()`
Retourne le statut de la connexion WebSocket.

```javascript
const status = sunuid.getWebSocketStatus();
// 'connected', 'disconnected', 'not_initialized'
```

#### `emitWebSocketEvent(event, data)`
Émet un événement WebSocket personnalisé.

```javascript
sunuid.emitWebSocketEvent('custom_event', {
    message: 'Hello WebSocket!',
    timestamp: Date.now(),
    serviceId: 'service-id'
});
```

#### `forceWebSocketInit()`
Force l'initialisation WebSocket si Socket.IO devient disponible plus tard.

```javascript
sunuid.forceWebSocketInit();
```

#### `destroy()`
Nettoie les ressources du SDK et ferme la connexion WebSocket.

```javascript
sunuid.destroy();
```

## 🌐 WebSocket

### Connexion Automatique
Le SDK se connecte automatiquement au WebSocket lors de l'initialisation :
- **Serveur :** `wss://samasocket.fayma.sn:9443`
- **Paramètres :** token, type: 'web', userId, username

### Événements Reçus
- `qr_status_update` - Mise à jour du statut QR
- `qr_scan_success` - Scan QR réussi
- `qr_expired` - QR expiré

### Événements Émis
- `qr_generated` - QR généré (automatique)
- `custom_event` - Événements personnalisés

### Gestion des Erreurs
- Tentatives limitées (5 max) si Socket.IO non disponible
- Désactivation automatique après échec
- Logs détaillés pour le debugging

## 🛡️ Sécurité

### Authentification
Le SDK utilise les clés API pour s'authentifier :
- `clientId` et `secretId` dans le corps des requêtes
- Connexion WebSocket sécurisée avec token

### Validation
- Vérification des paramètres requis
- Validation des URLs de redirection
- Protection contre les attaques CSRF
- Types numériques pour éviter les injections

## 🌐 Compatibilité

- **Navigateurs** : Chrome 60+, Firefox 55+, Safari 12+, Edge 79+
- **Mobile** : iOS Safari 12+, Chrome Mobile 60+
- **Node.js** : 14.0.0+
- **WebSocket** : Socket.IO 4.7.0+

## 📊 Monitoring

### Logs
Le SDK génère des logs pour le debugging :
```javascript
console.log('SunuID SDK initialisé avec succès');
console.log('🌐 WebSocket connecté avec succès');
console.log('📤 Événement WebSocket émis: qr_generated');
console.error('❌ Erreur connexion WebSocket:', error);
```

### Métriques
Les partenaires peuvent suivre :
- Nombre de QR codes générés
- Taux de succès d'authentification
- Temps de réponse de l'API
- Statut des connexions WebSocket

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
- [Socket.IO](https://socket.io/) pour les WebSockets

---

**Développé avec ❤️ par l'équipe SunuID**

[![SunuID](https://sunuid.sn/logo.png)](https://sunuid.sn) 