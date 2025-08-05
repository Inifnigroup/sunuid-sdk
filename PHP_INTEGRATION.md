# 🔒 Intégration Côté Serveur PHP - SunuID SDK

Guide complet pour gérer SunuID entièrement côté serveur PHP.

## 🎯 Avantages de l'Intégration PHP

- 🔐 **Credentials sécurisés** - Jamais exposés côté client
- 🛡️ **Validation serveur** - Contrôle total des requêtes
- 📊 **Logs serveur** - Monitoring et audit
- 🔄 **Gestion des sessions** - Intégration avec votre système
- 🎨 **Personnalisation** - Interface complètement personnalisable

## 📦 Installation

### 1. Installer les Dépendances

```bash
composer require endroid/qr-code
```

### 2. Structure des Fichiers

```
votre-projet/
├── config/
│   └── sunuid.php          # Configuration SunuID
├── includes/
│   ├── sunuid-api.php      # API SunuID
│   ├── sunuid-qr.php       # Génération QR
│   └── sunuid-webhook.php  # Webhooks
├── public/
│   ├── login.php           # Page de connexion
│   ├── kyc.php            # Page KYC
│   └── api/
│       ├── init.php        # Initialisation sécurisée
│       ├── status.php      # Vérification statut
│       └── webhook.php     # Réception webhooks
└── assets/
    └── sunuid-logo.png     # Logo personnalisé
```

## 🔧 Configuration

### config/sunuid.php

```php
<?php
return [
    'credentials' => [
        'client_id' => 'VOTRE_CLIENT_ID',
        'secret_id' => 'VOTRE_SECRET_ID',
        'api_url' => 'https://api.sunuid.fayma.sn'
    ],
    
    'qr_settings' => [
        'size' => 300,
        'margin' => 10,
        'logo_path' => __DIR__ . '/../assets/sunuid-logo.png',
        'logo_size' => 60
    ],
    
    'webhook_secret' => 'VOTRE_WEBHOOK_SECRET',
    
    'session_timeout' => 3600, // 1 heure
    
    'allowed_origins' => [
        'https://votre-domaine.com',
        'https://www.votre-domaine.com'
    ]
];
?>
```

## 🚀 API SunuID

### includes/sunuid-api.php

```php
<?php
class SunuIDAPI {
    private $config;
    private $credentials;
    
    public function __construct() {
        $this->config = require __DIR__ . '/../config/sunuid.php';
        $this->credentials = $this->config['credentials'];
    }
    
    /**
     * Générer un QR code
     */
    public function generateQR($type, $metadata = []) {
        $data = [
            'client_id' => $this->credentials['client_id'],
            'secret_id' => $this->credentials['secret_id'],
            'type' => $type,
            'metadata' => $metadata
        ];
        
        $response = $this->makeRequest('/qr-generate', $data);
        
        if ($response['success']) {
            // Stocker en session pour suivi
            $_SESSION['sunuid_qr'] = [
                'service_id' => $response['data']['service_id'],
                'type' => $type,
                'created_at' => time(),
                'metadata' => $metadata
            ];
        }
        
        return $response;
    }
    
    /**
     * Vérifier le statut d'un QR
     */
    public function checkStatus($serviceId) {
        $data = [
            'client_id' => $this->credentials['client_id'],
            'secret_id' => $this->credentials['secret_id'],
            'service_id' => $serviceId
        ];
        
        return $this->makeRequest('/qr-status', $data);
    }
    
    /**
     * Effectuer une requête API
     */
    private function makeRequest($endpoint, $data) {
        $url = $this->credentials['api_url'] . $endpoint;
        
        $ch = curl_init();
        curl_setopt_array($ch, [
            CURLOPT_URL => $url,
            CURLOPT_POST => true,
            CURLOPT_POSTFIELDS => json_encode($data),
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_HTTPHEADER => [
                'Content-Type: application/json',
                'Accept: application/json'
            ],
            CURLOPT_TIMEOUT => 30,
            CURLOPT_SSL_VERIFYPEER => true
        ]);
        
        $response = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);
        
        if ($response === false) {
            return [
                'success' => false,
                'error' => 'Erreur de connexion API'
            ];
        }
        
        $data = json_decode($response, true);
        
        if ($httpCode !== 200) {
            return [
                'success' => false,
                'error' => $data['message'] ?? 'Erreur API: ' . $httpCode
            ];
        }
        
        return $data;
    }
    
    /**
     * Valider un webhook
     */
    public function validateWebhook($payload, $signature) {
        $expectedSignature = hash_hmac('sha256', $payload, $this->config['webhook_secret']);
        return hash_equals($expectedSignature, $signature);
    }
}
?>
```

## 🎨 Génération QR

### includes/sunuid-qr.php

```php
<?php
require_once __DIR__ . '/../vendor/autoload.php';

use Endroid\QrCode\QrCode;
use Endroid\QrCode\Writer\PngWriter;
use Endroid\QrCode\Logo\Logo;

class SunuIDQR {
    private $config;
    
    public function __construct() {
        $this->config = require __DIR__ . '/../config/sunuid.php';
    }
    
    /**
     * Générer un QR code personnalisé
     */
    public function generateCustomQR($content, $label = '', $options = []) {
        $qrCode = new QrCode($content);
        $qrCode->setSize($this->config['qr_settings']['size']);
        $qrCode->setMargin($this->config['qr_settings']['margin']);
        
        // Ajouter le logo si configuré
        if (file_exists($this->config['qr_settings']['logo_path'])) {
            $logo = new Logo($this->config['qr_settings']['logo_path']);
            $logo->setResizeToWidth($this->config['qr_settings']['logo_size']);
            $logo->setResizeToHeight($this->config['qr_settings']['logo_size']);
            $qrCode->setLogo($logo);
        }
        
        // Ajouter le label si fourni
        if (!empty($label)) {
            $qrCode->setLabel($label);
        }
        
        $writer = new PngWriter();
        $result = $writer->write($qrCode);
        
        return [
            'data_url' => $result->getDataUri(),
            'size' => $this->config['qr_settings']['size']
        ];
    }
    
    /**
     * Générer QR pour authentification
     */
    public function generateAuthQR($serviceId, $partnerName = '') {
        $content = "2-{$serviceId}";
        $label = "AUTH - {$partnerName}";
        
        return $this->generateCustomQR($content, $label);
    }
    
    /**
     * Générer QR pour KYC
     */
    public function generateKYCQR($serviceId, $partnerName = '') {
        $content = "1-{$serviceId}";
        $label = "KYC - {$partnerName}";
        
        return $this->generateCustomQR($content, $label);
    }
}
?>
```

## 🌐 Pages Publiques

### public/login.php

```php
<?php
session_start();
require_once __DIR__ . '/../includes/sunuid-api.php';
require_once __DIR__ . '/../includes/sunuid-qr.php';

$api = new SunuIDAPI();
$qr = new SunuIDQR();

// Générer un QR d'authentification
$response = $api->generateQR(2, [
    'redirect_url' => 'https://votre-domaine.com/dashboard',
    'user_ip' => $_SERVER['REMOTE_ADDR']
]);

if ($response['success']) {
    $qrData = $qr->generateAuthQR(
        $response['data']['service_id'],
        'Votre Entreprise'
    );
} else {
    $error = $response['error'];
}
?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Connexion - Votre App</title>
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
        .qr-code {
            margin: 20px 0;
        }
        .qr-code img {
            max-width: 100%;
            height: auto;
        }
        .status {
            margin-top: 20px;
            padding: 10px;
            border-radius: 5px;
        }
        .status.loading { background: #e3f2fd; color: #1976d2; }
        .status.success { background: #e8f5e8; color: #2e7d32; }
        .status.error { background: #ffebee; color: #c62828; }
    </style>
</head>
<body>
    <div class="login-card">
        <h1>🔐 Connexion Sécurisée</h1>
        <p>Scannez le QR code avec l'application SunuID</p>
        
        <?php if (isset($qrData)): ?>
            <div class="qr-code">
                <img src="<?= htmlspecialchars($qrData['data_url']) ?>" 
                     alt="QR Code SunuID" 
                     width="<?= $qrData['size'] ?>">
            </div>
            
            <div id="status" class="status loading">
                ⏳ En attente du scan...
            </div>
            
            <script>
                // Polling pour vérifier le statut
                const serviceId = '<?= $response['data']['service_id'] ?>';
                const checkStatus = async () => {
                    try {
                        const response = await fetch('/api/status.php', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ service_id: serviceId })
                        });
                        
                        const data = await response.json();
                        
                        if (data.success && data.data.status === 'completed') {
                            document.getElementById('status').className = 'status success';
                            document.getElementById('status').innerHTML = '✅ Connexion réussie ! Redirection...';
                            
                            setTimeout(() => {
                                window.location.href = '/dashboard';
                            }, 1000);
                        } else if (data.success && data.data.status === 'expired') {
                            document.getElementById('status').className = 'status error';
                            document.getElementById('status').innerHTML = '⏰ QR expiré. Actualisez la page.';
                        } else {
                            // Continuer le polling
                            setTimeout(checkStatus, 2000);
                        }
                    } catch (error) {
                        console.error('Erreur:', error);
                        setTimeout(checkStatus, 5000);
                    }
                };
                
                // Démarrer le polling
                checkStatus();
            </script>
        <?php else: ?>
            <div class="status error">
                ❌ Erreur: <?= htmlspecialchars($error) ?>
            </div>
        <?php endif; ?>
        
        <p style="margin-top: 20px; font-size: 14px;">
            Pas d'application SunuID ? 
            <a href="https://sunuid.sn/download" target="_blank">Télécharger</a>
        </p>
    </div>
</body>
</html>
```

### public/kyc.php

```php
<?php
session_start();
require_once __DIR__ . '/../includes/sunuid-api.php';
require_once __DIR__ . '/../includes/sunuid-qr.php';

$api = new SunuIDAPI();
$qr = new SunuIDQR();

// Générer un QR KYC
$response = $api->generateQR(1, [
    'kyc_type' => 'full',
    'required_fields' => ['identity', 'address', 'phone'],
    'redirect_url' => 'https://votre-domaine.com/kyc-complete'
]);

if ($response['success']) {
    $qrData = $qr->generateKYCQR(
        $response['data']['service_id'],
        'Votre Entreprise'
    );
} else {
    $error = $response['error'];
}
?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Vérification KYC - Votre App</title>
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
        .qr-code {
            margin: 20px 0;
        }
        .qr-code img {
            max-width: 100%;
            height: auto;
        }
        .status {
            margin-top: 20px;
            padding: 10px;
            border-radius: 5px;
        }
        .status.loading { background: #e3f2fd; color: #1976d2; }
        .status.success { background: #e8f5e8; color: #2e7d32; }
        .status.error { background: #ffebee; color: #c62828; }
    </style>
</head>
<body>
    <div class="kyc-card">
        <h1>📋 Vérification KYC</h1>
        <p>Scannez le QR code pour vérifier votre identité</p>
        
        <?php if (isset($qrData)): ?>
            <div class="qr-code">
                <img src="<?= htmlspecialchars($qrData['data_url']) ?>" 
                     alt="QR Code KYC SunuID" 
                     width="<?= $qrData['size'] ?>">
            </div>
            
            <div id="status" class="status loading">
                ⏳ En attente de la vérification...
            </div>
            
            <script>
                // Polling pour vérifier le statut KYC
                const serviceId = '<?= $response['data']['service_id'] ?>';
                const checkStatus = async () => {
                    try {
                        const response = await fetch('/api/status.php', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ service_id: serviceId })
                        });
                        
                        const data = await response.json();
                        
                        if (data.success && data.data.status === 'completed') {
                            document.getElementById('status').className = 'status success';
                            document.getElementById('status').innerHTML = '✅ Vérification KYC réussie !';
                            
                            setTimeout(() => {
                                window.location.href = '/kyc-complete';
                            }, 1000);
                        } else if (data.success && data.data.status === 'expired') {
                            document.getElementById('status').className = 'status error';
                            document.getElementById('status').innerHTML = '⏰ QR expiré. Actualisez la page.';
                        } else {
                            // Continuer le polling
                            setTimeout(checkStatus, 2000);
                        }
                    } catch (error) {
                        console.error('Erreur:', error);
                        setTimeout(checkStatus, 5000);
                    }
                };
                
                // Démarrer le polling
                checkStatus();
            </script>
        <?php else: ?>
            <div class="status error">
                ❌ Erreur: <?= htmlspecialchars($error) ?>
            </div>
        <?php endif; ?>
        
        <p style="margin-top: 20px; font-size: 14px;">
            Vérification sécurisée par SunuID
        </p>
    </div>
</body>
</html>
```

## 🔌 API Endpoints

### public/api/status.php

```php
<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

require_once __DIR__ . '/../../includes/sunuid-api.php';

$api = new SunuIDAPI();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    
    if (!isset($input['service_id'])) {
        echo json_encode([
            'success' => false,
            'error' => 'Service ID requis'
        ]);
        exit;
    }
    
    $response = $api->checkStatus($input['service_id']);
    echo json_encode($response);
} else {
    echo json_encode([
        'success' => false,
        'error' => 'Méthode non autorisée'
    ]);
}
?>
```

### public/api/webhook.php

```php
<?php
header('Content-Type: application/json');

require_once __DIR__ . '/../../includes/sunuid-api.php';

$api = new SunuIDAPI();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $payload = file_get_contents('php://input');
    $signature = $_SERVER['HTTP_X_SUNUID_SIGNATURE'] ?? '';
    
    // Valider la signature du webhook
    if (!$api->validateWebhook($payload, $signature)) {
        http_response_code(401);
        echo json_encode(['error' => 'Signature invalide']);
        exit;
    }
    
    $data = json_decode($payload, true);
    
    // Traiter l'événement
    switch ($data['event']) {
        case 'qr_scan_success':
            // Connexion réussie
            $serviceId = $data['data']['service_id'];
            $userId = $data['data']['user_id'];
            
            // Créer la session utilisateur
            session_start();
            $_SESSION['user_id'] = $userId;
            $_SESSION['authenticated'] = true;
            $_SESSION['auth_time'] = time();
            
            // Log de sécurité
            error_log("SunuID: Connexion réussie - Service: $serviceId, User: $userId, IP: " . $_SERVER['REMOTE_ADDR']);
            break;
            
        case 'qr_expired':
            // QR expiré
            $serviceId = $data['data']['service_id'];
            error_log("SunuID: QR expiré - Service: $serviceId");
            break;
            
        case 'kyc_completed':
            // KYC terminé
            $serviceId = $data['data']['service_id'];
            $kycData = $data['data']['kyc_data'];
            
            // Traiter les données KYC
            // Sauvegarder en base de données
            // Notifier l'utilisateur
            
            error_log("SunuID: KYC terminé - Service: $serviceId");
            break;
    }
    
    echo json_encode(['success' => true]);
} else {
    http_response_code(405);
    echo json_encode(['error' => 'Méthode non autorisée']);
}
?>
```

## 🔐 Sécurité

### Validation des Origines

```php
// Ajouter dans chaque endpoint public
$allowedOrigins = require __DIR__ . '/../config/sunuid.php';
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';

if (!in_array($origin, $allowedOrigins['allowed_origins'])) {
    http_response_code(403);
    echo json_encode(['error' => 'Origine non autorisée']);
    exit;
}
```

### Gestion des Sessions

```php
// Configuration de session sécurisée
ini_set('session.cookie_httponly', 1);
ini_set('session.cookie_secure', 1);
ini_set('session.use_strict_mode', 1);
ini_set('session.cookie_samesite', 'Strict');

session_start();

// Vérifier l'expiration de session
if (isset($_SESSION['auth_time']) && 
    (time() - $_SESSION['auth_time']) > 3600) {
    session_destroy();
    header('Location: /login.php');
    exit;
}
```

## 📊 Monitoring

### Logs de Sécurité

```php
// Ajouter dans sunuid-api.php
private function logSecurityEvent($event, $data = []) {
    $logData = [
        'timestamp' => date('Y-m-d H:i:s'),
        'event' => $event,
        'ip' => $_SERVER['REMOTE_ADDR'],
        'user_agent' => $_SERVER['HTTP_USER_AGENT'],
        'data' => $data
    ];
    
    error_log('SunuID Security: ' . json_encode($logData));
}
```

## 🚀 Déploiement

### Configuration Serveur

```apache
# .htaccess
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^api/(.*)$ api/$1.php [L,QSA]

# Sécurité
<Files "config/*">
    Order allow,deny
    Deny from all
</Files>

<Files "includes/*">
    Order allow,deny
    Deny from all
</Files>
```

### Variables d'Environnement

```php
// config/sunuid.php
return [
    'credentials' => [
        'client_id' => $_ENV['SUNUID_CLIENT_ID'],
        'secret_id' => $_ENV['SUNUID_SECRET_ID'],
        'api_url' => $_ENV['SUNUID_API_URL'] ?? 'https://api.sunuid.fayma.sn'
    ],
    // ...
];
```

## 📞 Support

- **Documentation complète** : [README.md](README.md)
- **Exemples simples** : [examples/](examples/)
- **Support technique** : support@sunuid.sn

---

**Intégration PHP complète et sécurisée ! 🔒** 