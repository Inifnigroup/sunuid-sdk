# 🚀 Intégration Minimale SunuID SDK

Exemples de code minimal pour intégrer le SDK SunuID dans votre application.

## 📁 Fichiers disponibles

- **`minimal-integration.html`** - Exemple complet avec interface utilisateur
- **`minimal-code.js`** - Code JavaScript minimal avec différents exemples
- **`auto-integration.html`** - **🚀 Initialisation et génération automatique** (Recommandé)
- **`auto-code.js`** - Code JavaScript pour l'initialisation automatique

## 🎯 Code minimal (3 lignes)

```javascript
const sunuid = new SunuID({
    clientId: 'your-client-id',
    secretId: 'your-secret-id',
    type: 2
});

await sunuid.init();
const result = await sunuid.generateQR('qr-container');
```

## 🚀 Code automatique (0 ligne de code manuel)

```javascript
// Initialisation automatique au chargement de la page
document.addEventListener('DOMContentLoaded', function() {
    const sunuid = new SunuID(config);
    sunuid.init().then(() => sunuid.generateQR('qr-container'));
});
```

## 📋 Prérequis

### 1. Inclure les scripts
```html
<!-- Socket.IO (requis) -->
<script src="https://cdn.socket.io/4.7.4/socket.io.min.js"></script>

<!-- SunuID SDK -->
<script src="https://unpkg.com/sunuid-sdk@1.0.34/dist/sunuid-sdk.min.js"></script>
```

### 2. Conteneur HTML
```html
<div id="qr-container">
    <!-- Le QR code sera affiché ici -->
</div>
```

## 🔧 Configuration minimale

```javascript
const config = {
    clientId: '1754166754_221A57B46843D755',
    secretId: '56d40fe70507228b27f2640ae65894177c2fedbf246e2b30978fde1fc43953c5',
    type: 2, // 1=KYC, 2=AUTH, 3=SIGNATURE
    autoRefresh: false // Désactivé pour éviter les appels répétitifs
};
```

## 📱 Types de services

| Type | Description | Utilisation |
|------|-------------|-------------|
| `1` | **KYC** | Vérification d'identité |
| `2` | **AUTH** | Authentification (défaut) |
| `3` | **SIGNATURE** | Signature électronique |

## 🚀 Exemples d'utilisation

### Exemple 1 : Intégration automatique (Recommandé)
```javascript
// Initialisation automatique au chargement de la page
document.addEventListener('DOMContentLoaded', function() {
    const sunuid = new SunuID(config);
    sunuid.init().then(() => sunuid.generateQR('qr-container'));
});
```

### Exemple 2 : Intégration basique
```javascript
async function initSunuID() {
    const sunuid = new SunuID(config);
    await sunuid.init();
    return await sunuid.generateQR('qr-container');
}

// Utilisation
initSunuID().then(result => console.log('QR généré:', result));
```

### Exemple 3 : Avec gestion d'événements
```javascript
const sunuid = new SunuID({
    ...config,
    onSuccess: (data) => console.log('🎉 Succès:', data),
    onError: (error) => console.error('💥 Erreur:', error),
    onStatusUpdate: (status) => console.log('📊 Statut:', status)
});
```

### Exemple 4 : Avec rafraîchissement automatique
```javascript
const sunuid = new SunuID({
    ...config,
    autoRefresh: true,
    refreshInterval: 30000 // 30 secondes
});
```

### Exemple 5 : Avec gestion d'erreurs avancée
```javascript
async function initWithRetry() {
    let retryCount = 0;
    const maxRetries = 3;
    
    while (retryCount < maxRetries) {
        try {
            const sunuid = new SunuID(config);
            await sunuid.init();
            return await sunuid.generateQR('qr-container');
        } catch (error) {
            retryCount++;
            if (retryCount >= maxRetries) throw error;
            await new Promise(resolve => setTimeout(resolve, 2000));
        }
    }
}
```

## 🧪 Test rapide

### Test manuel
1. Ouvrir `minimal-integration.html` dans votre navigateur
2. Cliquer sur "Initialiser SDK"
3. Cliquer sur "Générer QR Code"
4. Vérifier la console pour les logs

### Test automatique (Recommandé)
1. Ouvrir `auto-integration.html` dans votre navigateur
2. Le QR code se génère automatiquement
3. Aucune action manuelle requise
4. Interface moderne avec animations

## 🔍 Dépannage

### Erreur : "SDK non initialisé"
```javascript
// Assurez-vous d'attendre l'initialisation
await sunuid.init();
```

### Erreur : "Socket.IO non chargé"
```html
<!-- Vérifiez que Socket.IO est inclus avant le SDK -->
<script src="https://cdn.socket.io/4.7.4/socket.io.min.js"></script>
<script src="https://unpkg.com/sunuid-sdk@1.0.34/dist/sunuid-sdk.min.js"></script>
```

### Appels répétitifs à l'API
```javascript
// Désactivez le rafraîchissement automatique
const config = {
    autoRefresh: false,
    // ... autres options
};
```

## 📊 Résultat attendu

Après une intégration réussie, vous devriez voir :
- ✅ Un QR code affiché dans le conteneur
- ✅ Des logs dans la console confirmant la génération
- ✅ Un objet `result` avec l'URL du QR code

## 🔗 Liens utiles

- **Documentation complète** : [README.md](../README.md)
- **Changelog** : [CHANGELOG.md](../CHANGELOG.md)
- **Page de test avancée** : [test-sdk-simple.html](../test-sdk-simple.html)

---

**Intégration en 3 étapes :**
1. Inclure les scripts
2. Créer le conteneur HTML
3. Initialiser et générer le QR code

C'est tout ! 🎉 