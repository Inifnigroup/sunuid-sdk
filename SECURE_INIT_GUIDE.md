# 🔒 Guide d'Initialisation Sécurisée - SunuID SDK

## Vue d'ensemble

L'initialisation sécurisée permet de masquer complètement les credentials sensibles (`clientId` et `secretId`) du code JavaScript côté client, en utilisant un token temporaire généré côté serveur.

## 🛡️ Avantages de Sécurité

### Mode Classique (Non Sécurisé)
```javascript
// ❌ Credentials visibles dans le code
const sunuid = initSunuID({
    clientId: '1754174441_36C4685215935D1F', // Visible !
    secretId: 'e29c66f185c389eedf7a1e8a242aba741cd659deaa6a9f8d50aa2dec98cce49d', // Visible !
    // ...
});
```

### Mode Sécurisé
```javascript
// ✅ Aucun credential visible
const sunuid = initSunuID({
    type: 2,
    partnerName: 'SunuID',
    secureInit: true, // Activation du mode sécurisé
    secureInitUrl: 'http://localhost:8081/secure-init.php'
    // clientId et secretId masqués côté serveur
});
```

## 🚀 Mise en Place

### 1. Configuration Serveur PHP

Placez le fichier `secure-init.php` sur votre serveur :

```php
<?php
// Configuration sécurisée (à stocker dans .env en production)
$SUNUID_CONFIG = [
    'client_id' => 'VOTRE_CLIENT_ID',
    'secret_id' => 'VOTRE_SECRET_ID',
    'api_url' => 'https://api.sunuid.fayma.sn',
    'token_expiry' => 3600, // 1 heure
    'max_requests_per_token' => 100
];
?>
```

### 2. Configuration Côté Client

```javascript
// Initialisation sécurisée
const sunuid = initSunuID({
    type: 2, // Type de service
    partnerName: 'VotrePartenaire',
    theme: 'light',
    secureInit: true, // Activation du mode sécurisé
    secureInitUrl: 'https://votre-domaine.com/secure-init.php',
    onSuccess: function(data) {
        console.log('QR généré:', data);
    },
    onError: function(error) {
        console.error('Erreur:', error);
    }
});

// Utilisation normale
const result = await sunuid.generateQR('container-id');
```

## 🔧 Configuration Avancée

### Options de Sécurité

```javascript
const sunuid = initSunuID({
    // Configuration de base
    type: 2,
    partnerName: 'MonPartenaire',
    
    // Mode sécurisé
    secureInit: true,
    secureInitUrl: 'https://api.mondomaine.com/sunuid/init.php',
    
    // Options de sécurité supplémentaires
    enableSecurityLogs: true,
    validateInputs: true,
    maxRetries: 3,
    requestTimeout: 10000
});
```

### Configuration Serveur Personnalisée

```php
<?php
// Configuration personnalisée
$SUNUID_CONFIG = [
    'client_id' => $_ENV['SUNUID_CLIENT_ID'],
    'secret_id' => $_ENV['SUNUID_SECRET_ID'],
    'api_url' => $_ENV['SUNUID_API_URL'],
    'token_expiry' => 7200, // 2 heures
    'max_requests_per_token' => 200,
    'allowed_origins' => ['https://mondomaine.com', 'https://app.mondomaine.com']
];

// Validation d'origine
if (!in_array($_SERVER['HTTP_ORIGIN'], $SUNUID_CONFIG['allowed_origins'])) {
    http_response_code(403);
    exit('Origin non autorisée');
}
?>
```

## 🔐 Sécurité Renforcée

### 1. Variables d'Environnement

```bash
# .env
SUNUID_CLIENT_ID=1754174441_36C4685215935D1F
SUNUID_SECRET_ID=e29c66f185c389eedf7a1e8a242aba741cd659deaa6a9f8d50aa2dec98cce49d
SUNUID_API_URL=https://api.sunuid.fayma.sn
SUNUID_TOKEN_SECRET=votre_cle_secrete_tres_longue
```

### 2. Validation d'Origine

```php
<?php
// Validation stricte des origines
$allowedOrigins = [
    'https://votre-domaine.com',
    'https://app.votre-domaine.com'
];

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if (!in_array($origin, $allowedOrigins)) {
    http_response_code(403);
    exit(json_encode(['error' => 'Origin non autorisée']));
}

header("Access-Control-Allow-Origin: $origin");
?>
```

### 3. Rate Limiting

```php
<?php
// Limitation du taux de requêtes
function checkRateLimit($ip) {
    $cacheFile = "/tmp/sunuid_rate_limit_$ip.json";
    $data = json_decode(file_get_contents($cacheFile), true) ?? ['count' => 0, 'reset' => time() + 3600];
    
    if (time() > $data['reset']) {
        $data = ['count' => 0, 'reset' => time() + 3600];
    }
    
    if ($data['count'] > 10) { // 10 requêtes par heure
        throw new Exception('Rate limit dépassé');
    }
    
    $data['count']++;
    file_put_contents($cacheFile, json_encode($data));
}
?>
```

## 📊 Monitoring et Logs

### Logs de Sécurité

```php
<?php
// Logs détaillés
function logSecurityEvent($event, $data) {
    $logEntry = [
        'timestamp' => date('c'),
        'event' => $event,
        'ip' => $_SERVER['REMOTE_ADDR'],
        'user_agent' => $_SERVER['HTTP_USER_AGENT'],
        'data' => $data
    ];
    
    error_log("SunuID Security: " . json_encode($logEntry));
}
?>
```

### Surveillance en Temps Réel

```javascript
// Côté client
const sunuid = initSunuID({
    secureInit: true,
    onError: function(error) {
        // Envoyer les erreurs à votre système de monitoring
        fetch('/api/log-error', {
            method: 'POST',
            body: JSON.stringify({
                error: error.message,
                timestamp: new Date().toISOString()
            })
        });
    }
});
```

## 🔄 Migration depuis le Mode Classique

### Étape 1: Préparation

```javascript
// Ancien code (à remplacer)
const sunuid = initSunuID({
    clientId: '1754174441_36C4685215935D1F',
    secretId: 'e29c66f185c389eedf7a1e8a242aba741cd659deaa6a9f8d50aa2dec98cce49d',
    // ...
});

// Nouveau code sécurisé
const sunuid = initSunuID({
    type: 2,
    partnerName: 'SunuID',
    secureInit: true,
    secureInitUrl: 'https://api.mondomaine.com/sunuid/init.php'
});
```

### Étape 2: Test de Compatibilité

```javascript
// Test des deux modes
async function testMigration() {
    try {
        // Test mode sécurisé
        const secureSDK = initSunuID({
            type: 2,
            partnerName: 'SunuID',
            secureInit: true,
            secureInitUrl: 'https://api.mondomaine.com/sunuid/init.php'
        });
        
        const result = await secureSDK.generateQR('test-container');
        console.log('Mode sécurisé fonctionne:', result);
        
    } catch (error) {
        console.error('Erreur migration:', error);
    }
}
```

## 🚨 Dépannage

### Erreurs Courantes

1. **"Token invalide ou expiré"**
   - Vérifiez l'URL du serveur PHP
   - Vérifiez la configuration des credentials
   - Vérifiez l'expiration du token

2. **"Origin non autorisée"**
   - Ajoutez votre domaine à la liste des origines autorisées
   - Vérifiez la configuration CORS

3. **"Rate limit dépassé"**
   - Attendez la fin de la période de limitation
   - Augmentez les limites si nécessaire

### Debug

```javascript
// Activation des logs de debug
const sunuid = initSunuID({
    secureInit: true,
    enableSecurityLogs: true,
    onError: function(error) {
        console.error('Erreur SDK:', error);
        // Logs détaillés disponibles
        const logs = sunuid.getSecurityLogs();
        console.log('Logs de sécurité:', logs);
    }
});
```

## 📈 Performance

### Optimisations

1. **Cache des Tokens**
   ```php
   // Cache Redis/Memcached pour les tokens
   $cache->set("token:$tokenId", $tokenData, 3600);
   ```

2. **Compression**
   ```php
   // Activation de la compression
   ob_start("ob_gzhandler");
   ```

3. **CDN**
   ```javascript
   // Utilisation d'un CDN pour le SDK
   <script src="https://cdn.mondomaine.com/sunuid-sdk.min.js"></script>
   ```

## 🔒 Bonnes Pratiques

1. **Ne jamais exposer les credentials** dans le code client
2. **Utiliser HTTPS** pour toutes les communications
3. **Valider les origines** côté serveur
4. **Implémenter un rate limiting** approprié
5. **Logger les événements de sécurité** pour audit
6. **Régénérer les tokens** régulièrement
7. **Surveiller les tentatives d'accès** non autorisées

---

**⚠️ Important :** L'initialisation sécurisée est recommandée pour tous les environnements de production. Le mode classique ne doit être utilisé que pour le développement et les tests. 