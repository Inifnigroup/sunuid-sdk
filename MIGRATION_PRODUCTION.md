# Guide de Migration vers la Production

## Problème résolu

L'erreur `POST http://localhost:8081/qr-generator.php net::ERR_CONNECTION_REFUSED` en production était causée par des URLs locales codées en dur dans le SDK.

## Solution appliquée

Le SDK a été mis à jour pour utiliser la configuration appropriée au lieu d'URLs locales en dur.

### Changements effectués

1. **QR Generator URL** : Maintenant utilise `this.config.apiUrl` au lieu de `localhost:8081`
2. **Secure Init URL** : Maintenant utilise la configuration globale au lieu d'une URL locale en dur
3. **Nom du partenaire** : Maintenant utilise `this.config.partnerName` au lieu d'être codé en dur "SunuID"

## Configuration pour la Production

### 1. Inclure la configuration globale

```html
<!-- Inclure la configuration avant le SDK -->
<script src="src/sunuid-sdk-config.js"></script>
<script src="src/sunuid-sdk.js"></script>
```

### 2. Configuration recommandée

```javascript
// Configuration pour la production
window.SunuIDConfig = {
    apiUrl: 'https://api.sunuid.fayma.sn',
    // ... autres configurations
};

// Initialisation du SDK
const sunuid = new SunuID({
    clientId: 'votre_client_id',
    secretId: 'votre_secret_id',
    apiUrl: 'https://api.sunuid.fayma.sn',
    secureInitUrl: 'https://sunuid.fayma.sn/secure-init.php',
    // ... autres options
});
```

### 3. URLs de production

- **API URL** : `https://api.sunuid.fayma.sn`
- **QR Generator** : `https://sunuid.fayma.sn/qr-generator.php`
- **Secure Init** : `https://sunuid.fayma.sn/secure-init.php`

### 4. Personnalisation du nom du partenaire

Le SDK utilise maintenant le nom du partenaire configuré dans :
- **Instructions** : "Scannez ce QR code avec l'application [Nom Partenaire] pour vous connecter"
- **Alt text** : "QR Code [Nom Partenaire]"
- **Label QR** : "[Type Service] - [Nom Partenaire]"

## Migration depuis la version locale

### Avant (Configuration locale)
```javascript
const sunuid = new SunuID({
    clientId: 'test_client',
    secretId: 'test_secret',
    // URLs locales utilisées automatiquement
});
```

### Après (Configuration production)
```javascript
// Configuration globale
window.SunuIDConfig = {
    apiUrl: 'https://api.sunuid.fayma.sn'
};

const sunuid = new SunuID({
    clientId: 'votre_client_id',
    secretId: 'votre_secret_id',
    apiUrl: 'https://api.sunuid.fayma.sn',
    secureInitUrl: 'https://sunuid.fayma.sn/secure-init.php'
});
```

## Vérification

Pour vérifier que la migration fonctionne :

1. **Console du navigateur** : Vérifiez qu'il n'y a plus d'erreurs de connexion refusée
2. **Network tab** : Vérifiez que les requêtes vont vers les bonnes URLs de production
3. **Fonctionnalité** : Testez la génération de QR codes

## Support

Si vous rencontrez des problèmes après la migration :

1. Vérifiez que les URLs de production sont correctes
2. Assurez-vous que les credentials sont valides pour la production
3. Consultez les logs de la console pour plus de détails 