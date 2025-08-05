# 🔐 SunuID SDK

[![npm version](https://badge.fury.io/js/sunuid-sdk.svg)](https://badge.fury.io/js/sunuid-sdk)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Build Status](https://github.com/sunuid/sunuid-sdk/workflows/Build/badge.svg)](https://github.com/sunuid/sunuid-sdk/actions)

SDK JavaScript officiel pour intégrer facilement les QR codes d'authentification et KYC SunuID dans vos applications web.

## ✨ Fonctionnalités

- 🔐 **Authentification QR Code** - Connexion sécurisée avec SunuID
- 📋 **Vérification KYC** - Collecte et validation d'identité
- 🔒 **Mode Sécurisé** - Initialisation via PHP pour masquer les credentials
- 🌐 **WebSocket en Temps Réel** - Connexion automatique pour les mises à jour
- 🎨 **Thèmes personnalisables** - Support des thèmes clair et sombre
- 🔄 **Actualisation automatique** - QR codes qui se renouvellent automatiquement
- 📱 **Responsive design** - Compatible mobile et desktop
- 🌍 **Multi-langue** - Support français, anglais, arabe
- 🛡️ **Sécurisé** - Authentification par clés API avec validation renforcée
- 🔢 **Types de services** - Support des types 1 (KYC), 2 (AUTH), 3 (SIGNATURE)
- 🎯 **Affichage progressif** - Loader et animations fluides
- 📊 **Logs de sécurité** - Monitoring et debugging avancés

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
<link rel="stylesheet" href="https://unpkg.com/sunuid-sdk@1.0.25/dist/sunuid-sdk.css">

<!-- JavaScript -->
<script src="https://unpkg.com/sunuid-sdk@1.0.25/dist/sunuid-sdk.js"></script>
```

## 📖 Utilisation Rapide

> **🚀 [Démarrage en 30 secondes](GET_STARTED.md)** | **🌍 [Intégration Universelle](INTEGRATION_UNIVERSAL.md)** | **⚡ [Démarrage en 2 minutes](QUICKSTART.md)** | **💡 [Intégration simplifiée](INTEGRATION_SIMPLE.md)** | **🔒 [Intégration PHP complète](PHP_INTEGRATION.md)** | **🏭 [Migration Production](MIGRATION_PRODUCTION.md)**

### 1. Mode Classique (Credentials visibles)

```javascript
const sunuid = initSunuID({
    apiUrl: 'https://api.sunuid.fayma.sn',
    clientId: 'VOTRE_CLIENT_ID',
    secretId: 'VOTRE_SECRET_ID',
    type: 2, // 1 = KYC, 2 = AUTH, 3 = SIGNATURE
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

### 2. Mode Sécurisé (Credentials masqués)

```javascript
const sunuid = initSunuID({
    apiUrl: 'https://api.sunuid.fayma.sn',
    type: 2, // 1 = KYC, 2 = AUTH, 3 = SIGNATURE
    secureInit: true, // Active le mode sécurisé
    secureInitUrl: 'https://votre-serveur.com/secure-init.php',
    theme: 'light',
    partnerName: 'Votre Entreprise',
    onSuccess: function(data) {
        console.log('Authentification réussie:', data);
    },
    onError: function(error) {
        console.error('Erreur:', error);
    }
});
```

### 3. Génération QR avec WebSocket

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

### 4. Écoute des événements WebSocket

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

## 🔒 Mode Sécurisé

### Configuration PHP

Créez un endpoint PHP pour l'initialisation sécurisée :

```php
<?php
// secure-init.php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

$SUNUID_CONFIG = [
    'client_id' => 'VOTRE_CLIENT_ID',
    'secret_id' => 'VOTRE_SECRET_ID',
    'api_url' => 'https://api.sunuid.fayma.sn',
    'token_expiry' => 3600,
    'max_requests_per_token' => 100
];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    
    // Validation des paramètres
    if (!isset($input['type']) || !in_array($input['type'], [1, 2, 3])) {
        echo json_encode(['success' => false, 'error' => 'Type invalide']);
        exit;
    }
    
    // Génération du token sécurisé
    $payload = [
        'client_id' => $SUNUID_CONFIG['client_id'],
        'secret_id' => $SUNUID_CONFIG['secret_id'],
        'api_url' => $SUNUID_CONFIG['api_url'],
        'type' => $input['type'],
        'partner_name' => $input['partnerName'] ?? 'SunuID',
        'theme' => $input['theme'] ?? 'light',
        'exp' => time() + $SUNUID_CONFIG['token_expiry'],
        'iat' => time(),
        'jti' => uniqid('sunuid_', true)
    ];
    
    $token = base64_encode(json_encode($payload));
    
    echo json_encode([
        'success' => true,
        'data' => [
            'token' => $token,
            'expires_in' => $SUNUID_CONFIG['token_expiry'],
            'api_url' => $SUNUID_CONFIG['api_url'],
            'type' => $input['type'],
            'partner_name' => $input['partnerName'] ?? 'SunuID',
            'theme' => $input['theme'] ?? 'light',
            'max_requests' => $SUNUID_CONFIG['max_requests_per_token']
        ],
        'message' => 'Token généré avec succès'
    ]);
}
?>
```

### Avantages du Mode Sécurisé

- 🔐 **Credentials masqués** - Non visibles dans le code client
- ⏰ **Tokens temporaires** - Expiration automatique
- 📊 **Limite de requêtes** - Contrôle d'usage
- 🛡️ **Validation côté serveur** - Sécurité renforcée

## 🎨 Exemples

### Exemples Universels

- **[Connexion Universelle](examples/universal-login.html)** - Copier-coller en 30 secondes
- **[KYC Universel](examples/universal-kyc.html)** - Vérification d'identité simple
- **[Guide d'intégration universelle](INTEGRATION_UNIVERSAL.md)** - Pour tous les niveaux

### Exemples Simples

- **[Connexion Simple](examples/simple-login.html)** - Page de connexion basique
- **[KYC Simple](examples/simple-kyc.html)** - Page de vérification KYC basique
- **[Guide d'intégration rapide](INTEGRATION_SIMPLE.md)** - Intégration en 3 étapes

### Intégration Côté Serveur

- **[Intégration PHP complète](PHP_INTEGRATION.md)** - Gestion entièrement côté serveur
- **Credentials sécurisés** - Jamais exposés côté client
- **Validation serveur** - Contrôle total des requêtes
- **Webhooks** - Notifications en temps réel
- **Gestion des sessions** - Intégration avec votre système

### Page de Connexion avec Mode Sécurisé

```html
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Connexion - Mon Application</title>
    <link rel="stylesheet" href="https://unpkg.com/sunuid-sdk@1.0.25/dist/sunuid-sdk.css">
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
    <script src="https://unpkg.com/sunuid-sdk@1.0.25/dist/sunuid-sdk.js"></script>
    
    <script>
        const sunuid = initSunuID({
            apiUrl: 'https://api.sunuid.fayma.sn',
            type: 2, // AUTH
            secureInit: true, // Mode sécurisé
            secureInitUrl: 'https://votre-serveur.com/secure-init.php',
            theme: 'light',
            partnerName: 'Mon Application',
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
| `clientId` | string | - | Clé client (requise en mode classique) |
| `secretId` | string | - | Clé secrète (requise en mode classique) |
| `type` | number | `2` | Type de service: `1` (KYC), `2` (AUTH), `3` (SIGNATURE) |
| `theme` | string | `'light'` | Thème: `'light'` ou `'dark'` |
| `language` | string | `'fr'` | Langue: `'fr'`, `'en'`, `'ar'` |
| `autoRefresh` | boolean | `true` | Actualisation automatique |
| `refreshInterval` | number | `30000` | Intervalle en millisecondes |
| `secureInit` | boolean | `false` | Active le mode sécurisé |
| `secureInitUrl` | string | `'http://localhost:8081/secure-init.php'` | URL de l'endpoint sécurisé |
| `partnerName` | string | `'SunuID'` | Nom du partenaire |
| `enableSecurityLogs` | boolean | `true` | Active les logs de sécurité |
| `validateInputs` | boolean | `true` | Validation des entrées |
| `maxRetries` | number | `3` | Nombre max de tentatives API |
| `requestTimeout` | number | `10000` | Timeout des requêtes (ms) |
| `onSuccess` | function | - | Callback en cas de succès |
| `onError` | function | - | Callback en cas d'erreur |
| `onStatusUpdate` | function | - | Callback pour mises à jour WebSocket |
| `onExpired` | function | - | Callback quand le QR expire |

### Types de Services

| Type | Nom | Description |
|------|-----|-------------|
| `1` | **KYC** | Vérification d'identité et conformité |
| `2` | **AUTH** | Authentification utilisateur |
| `3` | **SIGNATURE** | Signature électronique (non supporté par l'API) |

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

#### `generateKYCQR(containerId, options)` (Alias)
Génère un QR code KYC (type 1).

```javascript
sunuid.generateKYCQR('container-id', {
    theme: 'light',
    kycType: 'full', // 'basic' ou 'full'
    requiredFields: ['identity', 'address', 'phone'],
    redirectUrl: 'https://votre-site.com/kyc-complete'
});
```

#### `generateAuthQR(containerId, options)` (Alias)
Génère un QR code d'authentification (type 2).

```javascript
sunuid.generateAuthQR('container-id', {
    theme: 'light',
    redirectUrl: 'https://votre-site.com/dashboard',
    customData: { /* données personnalisées */ }
});
```

#### `generateSignatureQR(containerId, options)` (Alias)
Génère un QR code de signature (type 3) - **Non supporté par l'API**.

```javascript
sunuid.generateSignatureQR('container-id', {
    theme: 'dark',
    documentId: 'doc-123',
    signatureType: 'electronic'
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

### Méthodes de Sécurité

#### `getSecurityLogs()`
Récupère les logs de sécurité.

```javascript
const logs = sunuid.getSecurityLogs();
console.log('Logs de sécurité:', logs);
```

#### `clearSecurityLogs()`
Efface les logs de sécurité.

```javascript
sunuid.clearSecurityLogs();
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
- Mode sécurisé avec tokens temporaires

### Validation
- Vérification des paramètres requis
- Validation des URLs de redirection
- Protection contre les attaques CSRF
- Types numériques pour éviter les injections
- Sanitisation des entrées utilisateur
- Logs de sécurité avec obfuscation des credentials

### Mode Sécurisé
- Tokens temporaires avec expiration
- Limite de requêtes par token
- Validation côté serveur
- Credentials masqués du code client

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

### Logs de Sécurité
```javascript
// Logs automatiques avec obfuscation
🔒 [SECURITY] SDK_INIT_START
🔒 [SECURITY] SECURE_INIT_SUCCESS
🔒 [SECURITY] API_REQUEST_START
🔒 [SECURITY] API_REQUEST_SUCCESS
```

### Métriques
Les partenaires peuvent suivre :
- Nombre de QR codes générés
- Taux de succès d'authentification
- Temps de réponse de l'API
- Statut des connexions WebSocket
- Utilisation du mode sécurisé

## 🆘 Support

### Documentation
- [Guide d'intégration](https://docs.sunuid.sn)
- [API Reference](https://api.sunuid.sn/docs)
- [Exemples](https://github.com/sunuid/sdk-examples)
- [Guide de sécurité](SECURITY_GUIDE.md)
- [Guide d'initialisation sécurisée](SECURE_INIT_GUIDE.md)

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
- [Endroid QR Code](https://github.com/endroid/qr-code) pour la génération QR

---

**Développé avec ❤️ par l'équipe SunuID**

[![SunuID](https://sunuid.sn/logo.png)](https://sunuid.sn) 