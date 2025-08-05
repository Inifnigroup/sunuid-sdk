# 🚀 Intégration Simple - SunuID SDK

Guide d'intégration rapide pour les développeurs.

## 📦 Installation

### Option 1 : CDN (Recommandé)

```html
<!-- Socket.IO -->
<script src="https://cdn.socket.io/4.7.0/socket.io.min.js"></script>

<!-- SunuID SDK -->
<link rel="stylesheet" href="https://unpkg.com/sunuid-sdk@1.0.25/dist/sunuid-sdk.css">
<script src="https://unpkg.com/sunuid-sdk@1.0.25/dist/sunuid-sdk.js"></script>
```

### Option 2 : NPM

```bash
npm install sunuid-sdk
```

## ⚡ Intégration en 3 Étapes

### 1. HTML - Ajouter le conteneur

```html
<div id="sunuid-qr"></div>
```

### 2. JavaScript - Initialiser le SDK

```javascript
const sunuid = initSunuID({
    clientId: 'VOTRE_CLIENT_ID',
    secretId: 'VOTRE_SECRET_ID',
    type: 2, // 2 = Authentification
    onSuccess: (data) => {
        console.log('✅ Connexion réussie:', data);
        // Rediriger vers le dashboard
        window.location.href = '/dashboard';
    }
});
```

### 3. Générer le QR Code

```javascript
sunuid.generateQR('sunuid-qr');
```

## 🎯 Exemples Complets

### Page de Connexion Simple

```html
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Connexion - Mon App</title>
    
    <!-- SunuID SDK -->
    <script src="https://cdn.socket.io/4.7.0/socket.io.min.js"></script>
    <link rel="stylesheet" href="https://unpkg.com/sunuid-sdk@1.0.25/dist/sunuid-sdk.css">
    <script src="https://unpkg.com/sunuid-sdk@1.0.25/dist/sunuid-sdk.js"></script>
    
    <style>
        body {
            font-family: Arial, sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            margin: 0;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
        .login-card {
            background: white;
            padding: 40px;
            border-radius: 15px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            text-align: center;
            max-width: 400px;
        }
        h1 { color: #333; margin-bottom: 10px; }
        p { color: #666; margin-bottom: 30px; }
    </style>
</head>
<body>
    <div class="login-card">
        <h1>🔐 Connexion Sécurisée</h1>
        <p>Scannez le QR code avec l'app SunuID</p>
        
        <div id="sunuid-qr"></div>
        
        <p style="margin-top: 20px; font-size: 14px;">
            Pas d'app SunuID ? 
            <a href="https://sunuid.sn/download" target="_blank">Télécharger</a>
        </p>
    </div>

    <script>
        // Initialiser SunuID
        const sunuid = initSunuID({
            clientId: 'VOTRE_CLIENT_ID',
            secretId: 'VOTRE_SECRET_ID',
            type: 2, // Authentification
            theme: 'light',
            onSuccess: (data) => {
                console.log('✅ Connexion réussie:', data);
                alert('Connexion réussie ! Redirection...');
                window.location.href = '/dashboard';
            },
            onError: (error) => {
                console.error('❌ Erreur:', error);
                alert('Erreur de connexion: ' + error.message);
            }
        });

        // Générer le QR code
        sunuid.generateQR('sunuid-qr');
    </script>
</body>
</html>
```

### Page KYC Simple

```html
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Vérification KYC - Mon App</title>
    
    <!-- SunuID SDK -->
    <script src="https://cdn.socket.io/4.7.0/socket.io.min.js"></script>
    <link rel="stylesheet" href="https://unpkg.com/sunuid-sdk@1.0.25/dist/sunuid-sdk.css">
    <script src="https://unpkg.com/sunuid-sdk@1.0.25/dist/sunuid-sdk.js"></script>
    
    <style>
        body {
            font-family: Arial, sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            margin: 0;
            background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
        }
        .kyc-card {
            background: white;
            padding: 40px;
            border-radius: 15px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            text-align: center;
            max-width: 400px;
        }
        h1 { color: #333; margin-bottom: 10px; }
        p { color: #666; margin-bottom: 30px; }
    </style>
</head>
<body>
    <div class="kyc-card">
        <h1>📋 Vérification KYC</h1>
        <p>Scannez le QR code pour vérifier votre identité</p>
        
        <div id="sunuid-qr"></div>
        
        <p style="margin-top: 20px; font-size: 14px;">
            Vérification sécurisée par SunuID
        </p>
    </div>

    <script>
        // Initialiser SunuID pour KYC
        const sunuid = initSunuID({
            clientId: 'VOTRE_CLIENT_ID',
            secretId: 'VOTRE_SECRET_ID',
            type: 1, // KYC
            theme: 'light',
            onSuccess: (data) => {
                console.log('✅ KYC réussi:', data);
                alert('Vérification KYC réussie !');
                window.location.href = '/kyc-complete';
            },
            onError: (error) => {
                console.error('❌ Erreur KYC:', error);
                alert('Erreur KYC: ' + error.message);
            }
        });

        // Générer le QR code KYC
        sunuid.generateQR('sunuid-qr');
    </script>
</body>
</html>
```

## 🔧 Configuration Minimale

### Options Essentielles

```javascript
const sunuid = initSunuID({
    // REQUIS
    clientId: 'VOTRE_CLIENT_ID',
    secretId: 'VOTRE_SECRET_ID',
    type: 2, // 1=KYC, 2=AUTH
    
    // OPTIONNEL
    theme: 'light', // 'light' ou 'dark'
    
    // CALLBACKS
    onSuccess: (data) => {
        // Connexion réussie
    },
    onError: (error) => {
        // Erreur
    }
});
```

### Types de Services

| Type | Usage | Description |
|------|-------|-------------|
| `1` | KYC | Vérification d'identité |
| `2` | AUTH | Connexion utilisateur |
| `3` | SIGNATURE | Signature (non supporté) |

## 🎨 Personnalisation

### Thèmes

```javascript
// Thème clair (par défaut)
theme: 'light'

// Thème sombre
theme: 'dark'
```

### Callbacks

```javascript
const sunuid = initSunuID({
    // ... configuration
    
    onSuccess: (data) => {
        console.log('✅ Succès:', data);
        // data contient: token, user, service_id, etc.
    },
    
    onError: (error) => {
        console.error('❌ Erreur:', error);
        // error contient: message, code, details
    },
    
    onStatusUpdate: (data) => {
        console.log('📱 Statut:', data);
        // Mise à jour reçue via WebSocket
    },
    
    onExpired: (data) => {
        console.log('⏰ Expiré:', data);
        // QR expiré, actualisation automatique
    }
});
```

## 🔒 Mode Sécurisé (Optionnel)

Pour masquer les credentials du code client :

### 1. Créer l'endpoint PHP

```php
<?php
// secure-init.php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Content-Type: application/json');

$config = [
    'client_id' => 'VOTRE_CLIENT_ID',
    'secret_id' => 'VOTRE_SECRET_ID'
];

$input = json_decode(file_get_contents('php://input'), true);

$token = base64_encode(json_encode([
    'client_id' => $config['client_id'],
    'secret_id' => $config['secret_id'],
    'api_url' => 'https://api.sunuid.fayma.sn',
    'type' => $input['type'],
    'exp' => time() + 3600
]));

echo json_encode([
    'success' => true,
    'data' => [
        'token' => $token,
        'expires_in' => 3600,
        'api_url' => 'https://api.sunuid.fayma.sn',
        'type' => $input['type']
    ]
]);
?>
```

### 2. Utiliser le mode sécurisé

```javascript
const sunuid = initSunuID({
    type: 2,
    secureInit: true,
    secureInitUrl: 'https://votre-serveur.com/secure-init.php',
    onSuccess: (data) => {
        console.log('✅ Connexion réussie:', data);
    }
});

sunuid.generateQR('sunuid-qr');
```

## 🚨 Dépannage

### Erreurs Courantes

| Erreur | Solution |
|--------|----------|
| `SDK non initialisé` | Attendre l'initialisation avant d'appeler `generateQR()` |
| `Service non disponible` | Vérifier les credentials et le type |
| `Failed to fetch` | Vérifier la connexion internet et l'URL de l'API |

### Debug

```javascript
// Activer les logs de debug
const sunuid = initSunuID({
    // ... configuration
    enableSecurityLogs: true
});

// Vérifier le statut WebSocket
console.log('WebSocket:', sunuid.getWebSocketStatus());

// Récupérer les logs de sécurité
console.log('Logs:', sunuid.getSecurityLogs());
```

## 📞 Support

- **Email** : support@sunuid.sn
- **Documentation** : https://docs.sunuid.sn
- **GitHub** : https://github.com/sunuid/sunuid-sdk

---

**Intégration simple et rapide ! 🚀** 