# ⚡ Démarrage Rapide - SunuID SDK

Intégration en **2 minutes** !

## 🚀 Étape 1 : Inclure le SDK

```html
<!-- Socket.IO -->
<script src="https://cdn.socket.io/4.7.0/socket.io.min.js"></script>

<!-- SunuID SDK -->
<link rel="stylesheet" href="https://unpkg.com/sunuid-sdk@1.0.25/dist/sunuid-sdk.css">
<script src="https://unpkg.com/sunuid-sdk@1.0.25/dist/sunuid-sdk.js"></script>
```

## 🎯 Étape 2 : Ajouter le conteneur

```html
<div id="sunuid-qr"></div>
```

## ⚡ Étape 3 : Initialiser et générer

```javascript
// Initialiser
const sunuid = initSunuID({
    clientId: 'VOTRE_CLIENT_ID',
    secretId: 'VOTRE_SECRET_ID',
    type: 2, // 2 = Authentification
    onSuccess: (data) => {
        console.log('✅ Connexion réussie:', data);
        window.location.href = '/dashboard';
    }
});

// Générer le QR
sunuid.generateQR('sunuid-qr');
```

## 🎉 C'est tout !

Votre QR code d'authentification est maintenant fonctionnel !

## 📱 Test

1. Ouvrez votre page
2. Scannez le QR avec l'app SunuID
3. Authentifiez-vous
4. ✅ Succès !

## 🔧 Types de Services

- `type: 1` = KYC (vérification d'identité)
- `type: 2` = AUTH (connexion)
- `type: 3` = SIGNATURE (non supporté)

## 📞 Besoin d'aide ?

- **Documentation complète** : [README.md](README.md)
- **Guide d'intégration** : [INTEGRATION_SIMPLE.md](INTEGRATION_SIMPLE.md)
- **Exemples** : [examples/](examples/)
- **Support** : support@sunuid.sn

---

**Intégration réussie en 2 minutes ! 🚀** 