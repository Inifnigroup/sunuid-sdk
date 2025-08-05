# 🔒 Guide de Sécurité - SunuID SDK

## Vue d'ensemble

Le SDK SunuID intègre plusieurs couches de sécurité pour protéger les credentials et les données sensibles. Ce guide détaille les bonnes pratiques et les fonctionnalités de sécurité disponibles.

## 🛡️ Fonctionnalités de Sécurité

### 1. Validation des Paramètres

Le SDK valide automatiquement tous les paramètres de configuration :

```javascript
// ✅ Configuration sécurisée
const sunuid = initSunuID({
    clientId: '1754174441_36C4685215935D1F', // Minimum 10 caractères
    secretId: 'e29c66f185c389eedf7a1e8a242aba741cd659deaa6a9f8d50aa2dec98cce49d', // Minimum 32 caractères
    apiUrl: 'https://api.sunuid.fayma.sn', // URL HTTPS requise
    type: 2, // Doit être 1, 2 ou 3
    validateInputs: true, // Activation de la validation
    enableSecurityLogs: true // Activation des logs de sécurité
});
```

**Critères de validation :**
- `clientId` : Minimum 10 caractères
- `secretId` : Minimum 32 caractères
- `apiUrl` : URL HTTPS valide
- `type` : Valeur 1, 2 ou 3 uniquement

### 2. Sanitisation des Entrées

Protection automatique contre les injections XSS :

```javascript
// Le SDK sanitise automatiquement toutes les entrées
const result = await sunuid.generateQR('container', {
    metadata: {
        userInput: '<script>alert("XSS")</script>' // Sera automatiquement nettoyé
    }
});
```

**Protections appliquées :**
- Suppression des balises HTML (`<`, `>`)
- Suppression des protocoles dangereux (`javascript:`)
- Nettoyage des espaces en début/fin

### 3. Logs de Sécurité

Traçabilité complète des événements de sécurité :

```javascript
// Activation des logs de sécurité
const sunuid = initSunuID({
    enableSecurityLogs: true,
    // ... autres options
});

// Récupération des logs
const securityLogs = sunuid.getSecurityLogs();
console.log('Logs de sécurité:', securityLogs);

// Nettoyage des logs
sunuid.clearSecurityLogs();
```

**Événements tracés :**
- `SDK_INIT_START` : Début d'initialisation
- `VALIDATION_SUCCESS/ERROR` : Résultat de validation
- `API_REQUEST_START/SUCCESS/ERROR` : Requêtes API
- `REQUEST_BEFORE_INIT` : Tentative d'utilisation avant initialisation
- `API_REQUEST_TIMEOUT` : Timeouts de requêtes
- `API_REQUEST_MAX_RETRIES` : Échec après tentatives multiples

### 4. Retry avec Timeout

Gestion robuste des erreurs réseau :

```javascript
const sunuid = initSunuID({
    maxRetries: 3, // Nombre de tentatives
    requestTimeout: 10000, // Timeout en millisecondes
    // ... autres options
});
```

**Comportement :**
- Tentatives multiples en cas d'échec
- Timeout configurable par requête
- Délai progressif entre les tentatives
- Logs détaillés des échecs

### 5. Obscurcissement des Credentials

Protection des credentials dans les logs :

```javascript
// Les credentials sont automatiquement obscurcis dans les logs
// clientId: "175***1F" au lieu de "1754174441_36C4685215935D1F"
// secretId: "e29c***49d" au lieu de "e29c66f185c389eedf7a1e8a242aba741cd659deaa6a9f8d50aa2dec98cce49d"
```

## 🔐 Bonnes Pratiques

### 1. Stockage Sécurisé des Credentials

```javascript
// ❌ À éviter - Credentials en dur dans le code
const sunuid = initSunuID({
    clientId: '1754174441_36C4685215935D1F',
    secretId: 'e29c66f185c389eedf7a1e8a242aba741cd659deaa6a9f8d50aa2dec98cce49d'
});

// ✅ Recommandé - Credentials depuis des variables d'environnement
const sunuid = initSunuID({
    clientId: process.env.SUNUID_CLIENT_ID,
    secretId: process.env.SUNUID_SECRET_ID
});

// ✅ Alternative - Credentials depuis un service sécurisé
const credentials = await fetchSecureCredentials();
const sunuid = initSunuID(credentials);
```

### 2. Validation des Réponses API

```javascript
// Validation des réponses
const result = await sunuid.generateQR('container');
if (result && result.success && result.data) {
    // Traitement sécurisé
    console.log('QR généré:', result.data.service_id);
} else {
    console.error('Réponse API invalide');
}
```

### 3. Gestion des Erreurs

```javascript
const sunuid = initSunuID({
    onError: function(error) {
        // Log sécurisé des erreurs
        console.error('Erreur SDK:', error.message);
        
        // Ne pas logger les détails sensibles
        // ❌ console.log('Credentials:', this.config.clientId);
        
        // ✅ Log sécurisé
        console.log('Erreur avec clientId:', this.config.clientId.substring(0, 3) + '***');
    }
});
```

### 4. Nettoyage des Ressources

```javascript
// Nettoyage à la destruction
window.addEventListener('beforeunload', () => {
    if (sunuid) {
        sunuid.clearSecurityLogs(); // Nettoyer les logs sensibles
        sunuid.destroy(); // Fermer les connexions
    }
});
```

## 🚨 Alertes de Sécurité

### 1. Détection d'Utilisation Avant Initialisation

```javascript
// ❌ Erreur de sécurité
const sunuid = initSunuID(config);
await sunuid.generateQR('container'); // Avant init()

// ✅ Utilisation correcte
const sunuid = initSunuID(config);
// SDK initialisé automatiquement
await sunuid.generateQR('container'); // Après init()
```

### 2. Validation des Paramètres

```javascript
// ❌ Paramètres invalides
const sunuid = initSunuID({
    clientId: '123', // Trop court
    secretId: '456', // Trop court
    type: 99 // Type invalide
});

// ✅ Paramètres valides
const sunuid = initSunuID({
    clientId: '1754174441_36C4685215935D1F',
    secretId: 'e29c66f185c389eedf7a1e8a242aba741cd659deaa6a9f8d50aa2dec98cce49d',
    type: 2
});
```

## 📊 Monitoring de Sécurité

### 1. Surveillance des Logs

```javascript
// Surveillance en temps réel
setInterval(() => {
    const logs = sunuid.getSecurityLogs();
    const recentLogs = logs.filter(log => 
        new Date(log.timestamp) > new Date(Date.now() - 60000) // Dernière minute
    );
    
    if (recentLogs.length > 10) {
        console.warn('Activité suspecte détectée');
    }
}, 30000);
```

### 2. Détection d'Anomalies

```javascript
// Détection de tentatives multiples
let requestCount = 0;
const originalMakeRequest = sunuid.makeRequest;

sunuid.makeRequest = async function(endpoint, data) {
    requestCount++;
    
    if (requestCount > 100) {
        console.error('Trop de requêtes détectées');
        return;
    }
    
    return originalMakeRequest.call(this, endpoint, data);
};
```

## 🔧 Configuration Avancée

### 1. Désactivation des Logs de Sécurité

```javascript
// Pour les environnements de production avec monitoring externe
const sunuid = initSunuID({
    enableSecurityLogs: false,
    // ... autres options
});
```

### 2. Timeout Personnalisé

```javascript
// Pour les connexions lentes
const sunuid = initSunuID({
    requestTimeout: 30000, // 30 secondes
    maxRetries: 5, // Plus de tentatives
    // ... autres options
});
```

### 3. Validation Désactivée

```javascript
// ⚠️ À utiliser avec précaution
const sunuid = initSunuID({
    validateInputs: false, // Désactive la validation
    // ... autres options
});
```

## 📞 Support Sécurité

En cas de problème de sécurité :

1. **Ne pas partager les logs complets** contenant des credentials
2. **Utiliser les logs obscurcis** fournis par le SDK
3. **Contacter l'équipe SunuID** avec les logs de sécurité
4. **Désactiver temporairement** les fonctionnalités suspectes

## 🔄 Mises à Jour de Sécurité

- Surveiller les mises à jour du SDK
- Tester les nouvelles versions en environnement de développement
- Vérifier la compatibilité avec les nouvelles fonctionnalités de sécurité
- Mettre à jour les bonnes pratiques selon les nouvelles recommandations

---

**⚠️ Important :** Ce guide ne remplace pas les bonnes pratiques générales de sécurité web. Il s'ajoute aux mesures de sécurité existantes de votre application. 