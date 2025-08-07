# SunuID PHP SDK

SDK PHP officiel pour l'intégration des QR codes d'authentification et KYC SunuID.

## 🚀 Installation

### Via Composer (recommandé)

```bash
composer require sunuid/php-sdk
```

### Installation manuelle

```bash
git clone https://github.com/sunuid/php-sdk.git
cd php-sdk
composer install
```

## 📋 Prérequis

- PHP >= 7.4
- Composer
- Extensions PHP : `curl`, `json`, `openssl`

## 🔧 Configuration

### Configuration de base

```php
use SunuID\SunuID;

$config = [
    'client_id' => 'VOTRE_CLIENT_ID',
    'secret_id' => 'VOTRE_SECRET_ID',
    'type' => 2, // 1=KYC, 2=AUTH, 3=SIGNATURE
    'enable_logs' => true,
    'log_file' => 'sunuid.log'
];

$sunuid = new SunuID($config);
$sunuid->init();
```

### Options de configuration

| Option | Type | Défaut | Description |
|--------|------|--------|-------------|
| `client_id` | string | null | ID client fourni par SunuID |
| `secret_id` | string | null | Secret ID fourni par SunuID |
| `type` | int | 2 | Type de service (1=KYC, 2=AUTH, 3=SIGNATURE) |
| `api_url` | string | https://api.sunuid.fayma.sn | URL de l'API SunuID |
| `enable_logs` | bool | true | Activer les logs |
| `log_file` | string | sunuid.log | Fichier de log |
| `request_timeout` | int | 10 | Timeout des requêtes en secondes |
| `max_retries` | int | 3 | Nombre de tentatives en cas d'échec |
| `secure_init` | bool | false | Utiliser l'initialisation sécurisée |

## 📖 Utilisation

### Génération d'un QR code

```php
try {
    $sunuid = new SunuID($config);
    $sunuid->init();
    
    // Générer un QR code
    $qrResult = $sunuid->generateQR();
    
    echo "QR Code URL: " . $qrResult['qr_code_url'] . "\n";
    echo "Session ID: " . $qrResult['session_id'] . "\n";
    echo "Contenu: " . $qrResult['content'] . "\n";
    
} catch (Exception $e) {
    echo "Erreur: " . $e->getMessage() . "\n";
}
```

### Génération d'un QR code local

```php
// Générer un QR code sans API (local)
$content = "AUTH_" . time() . "_" . bin2hex(random_bytes(8));
$qrResult = $sunuid->generateQRLocal($content, [
    'size' => 300,
    'margin' => 10,
    'label' => 'Authentification SunuID'
]);

// L'image est retournée en base64
$imageData = base64_decode(str_replace('data:image/png;base64,', '', $qrResult['qr_code_url']));
file_put_contents('qr-code.png', $imageData);
```

### Vérification du statut

```php
// Vérifier le statut d'un QR code
$status = $sunuid->checkQRStatus($sessionId);
echo "Statut: " . json_encode($status, JSON_PRETTY_PRINT) . "\n";
```

### Intégration web

```php
<?php
require_once 'vendor/autoload.php';

use SunuID\SunuID;

$config = [
    'client_id' => 'VOTRE_CLIENT_ID',
    'secret_id' => 'VOTRE_SECRET_ID',
    'type' => 2
];

try {
    $sunuid = new SunuID($config);
    $sunuid->init();
    $qrData = $sunuid->generateQR();
} catch (Exception $e) {
    $error = $e->getMessage();
}
?>

<!DOCTYPE html>
<html>
<head>
    <title>SunuID QR Code</title>
</head>
<body>
    <?php if (isset($qrData)): ?>
        <h1>QR Code SunuID</h1>
        <img src="<?php echo htmlspecialchars($qrData['qr_code_url']); ?>" 
             alt="QR Code SunuID" />
        <p>Session ID: <?php echo htmlspecialchars($qrData['session_id']); ?></p>
    <?php else: ?>
        <p>Erreur: <?php echo htmlspecialchars($error); ?></p>
    <?php endif; ?>
</body>
</html>
```

## 🔍 Gestion des erreurs

Le SDK utilise des exceptions spécifiques :

```php
use SunuID\Exception\SunuIDException;

try {
    $sunuid = new SunuID($config);
    $sunuid->init();
    $qrResult = $sunuid->generateQR();
    
} catch (SunuIDException $e) {
    echo "Erreur SunuID: " . $e->getMessage() . "\n";
    echo "Code d'erreur: " . $e->getErrorCode() . "\n";
    echo "Contexte: " . json_encode($e->getContext()) . "\n";
    
} catch (Exception $e) {
    echo "Erreur générale: " . $e->getMessage() . "\n";
}
```

### Types d'exceptions

- `SunuIDException::invalidConfig()` - Configuration invalide
- `SunuIDException::initializationFailed()` - Échec d'initialisation
- `SunuIDException::apiError()` - Erreur API
- `SunuIDException::qrCodeError()` - Erreur QR code
- `SunuIDException::authenticationError()` - Erreur d'authentification
- `SunuIDException::networkError()` - Erreur réseau

## 📊 Logging

Le SDK utilise Monolog pour les logs :

```php
// Accéder au logger
$logger = $sunuid->getLogger();

// Les logs sont automatiquement écrits dans le fichier configuré
// Niveau de log configurable : DEBUG, INFO, WARNING, ERROR
```

## 🧪 Tests

### Exécuter les tests

```bash
composer test
```

### Exemples d'utilisation

```bash
# Exemple basique
php examples/basic-usage.php

# Exemple QR local
php examples/local-qr.php

# Exemple web
php -S localhost:8000 examples/web-integration.php
```

## 📚 API Reference

### Méthodes principales

#### `__construct(array $config = [])`
Constructeur du SDK.

#### `init(): bool`
Initialise le SDK. Doit être appelé avant toute autre méthode.

#### `generateQR(string $content = null, array $options = []): array`
Génère un QR code via l'API SunuID.

#### `generateQRLocal(string $content, array $options = []): array`
Génère un QR code local sans API.

#### `checkQRStatus(string $sessionId): array`
Vérifie le statut d'un QR code.

### Méthodes utilitaires

#### `getConfig(): array`
Retourne la configuration actuelle.

#### `getPartnerInfo(): array`
Retourne les informations du partenaire.

#### `isInitialized(): bool`
Vérifie si le SDK est initialisé.

#### `getLogger(): Logger`
Retourne l'instance du logger.

## 🔒 Sécurité

- Les credentials sont automatiquement obfusqués dans les logs
- Validation stricte des paramètres d'entrée
- Support de l'initialisation sécurisée
- Gestion des timeouts et retry automatique
- Protection contre les injections

## 🌐 Support

- **Documentation** : https://docs.sunuid.sn
- **Issues** : https://github.com/sunuid/php-sdk/issues
- **Email** : dev@sunuid.sn

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

## 🤝 Contribution

Les contributions sont les bienvenues ! Veuillez :

1. Fork le projet
2. Créer une branche pour votre fonctionnalité
3. Commiter vos changements
4. Pousser vers la branche
5. Ouvrir une Pull Request

## 📋 Changelog

Voir le fichier [CHANGELOG.md](CHANGELOG.md) pour l'historique des versions. 