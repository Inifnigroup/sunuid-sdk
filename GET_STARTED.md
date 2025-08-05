# 🚀 Démarrage SunuID - En 30 Secondes !

**Choisissez votre niveau et commencez immédiatement !**

## 🎯 Quel Type de Développeur Êtes-Vous ?

### 🧠 **Débutant** - "Je veux juste tester"
### 👨‍💻 **Développeur** - "Je veux intégrer dans mon projet"
### 🔒 **Expert** - "Je veux une solution sécurisée"

---

## 🧠 Pour les Débutants

### Test Immédiat (30 secondes)

1. **Copiez** ce code dans un fichier `test.html` :
```html
<!DOCTYPE html>
<html>
<head><title>Test SunuID</title></head>
<body>
    <h1>🔐 Test SunuID</h1>
    <div id="qr"></div>
    <script src="https://cdn.jsdelivr.net/npm/@sunuid/sdk@latest/dist/sunuid-sdk.min.js"></script>
    <script>
        const sunuid = new SunuID({
            client_id: 'VOTRE_CLIENT_ID',
            secret_id: 'VOTRE_SECRET_ID',
            type: 2,
            partner_name: 'Mon Test'
        });
        sunuid.init().then(() => {
            document.getElementById('qr').innerHTML = 
                '<img src="' + sunuid.getQRCode() + '" alt="QR">';
        });
    </script>
</body>
</html>
```

2. **Remplacez** `VOTRE_CLIENT_ID` et `VOTRE_SECRET_ID`
3. **Ouvrez** le fichier dans votre navigateur
4. **Testez** avec l'app SunuID !

### ✅ Résultat
- QR code fonctionnel en 30 secondes
- Pas d'installation requise
- Test immédiat

---

## 👨‍💻 Pour les Développeurs

### Intégration Rapide (2 minutes)

#### Option A : CDN (Recommandé)
```html
<script src="https://cdn.jsdelivr.net/npm/@sunuid/sdk@latest/dist/sunuid-sdk.min.js"></script>
```

#### Option B : npm
```bash
npm install @sunuid/sdk
```

#### Code d'Intégration
```javascript
import SunuID from '@sunuid/sdk';

const sunuid = new SunuID({
    client_id: 'VOTRE_CLIENT_ID',
    secret_id: 'VOTRE_SECRET_ID',
    type: 2, // 1=KYC, 2=AUTH, 3=Signature
    partner_name: 'Votre App'
});

// Démarrer
sunuid.init().then(() => {
    console.log('✅ Prêt !');
});

// Écouter les événements
sunuid.on('connected', (user) => {
    console.log('👤 Connecté:', user);
    // Rediriger vers le dashboard
});
```

### ✅ Résultat
- SDK intégré dans votre projet
- Événements en temps réel
- Personnalisation complète

---

## 🔒 Pour les Experts

### Intégration Sécurisée (5 minutes)

#### Étape 1 : Installation PHP
```bash
composer require endroid/qr-code
```

#### Étape 2 : Fichiers de Base
```php
// sunuid-config.php
return [
    'client_id' => $_ENV['SUNUID_CLIENT_ID'],
    'secret_id' => $_ENV['SUNUID_SECRET_ID'],
    'api_url' => 'https://api.sunuid.fayma.sn'
];
```

#### Étape 3 : Page de Connexion
```php
<?php
require_once 'sunuid-api.php';
$api = new SunuIDAPI();
$response = $api->generateQR(2, [
    'redirect_url' => 'https://votre-site.com/dashboard'
]);
?>
<!DOCTYPE html>
<html>
<head><title>Connexion Sécurisée</title></head>
<body>
    <h1>🔐 Connexion</h1>
    <img src="<?= $qrData['data_url'] ?>" alt="QR Code">
</body>
</html>
```

### ✅ Résultat
- Credentials côté serveur
- Sécurité maximale
- Intégration système

---

## 🎯 Recommandations par Projet

### 🧪 **Test & Prototypage**
→ **Débutant** - Copier-coller HTML

### 🌐 **Site Web Simple**
→ **Développeur** - SDK JavaScript

### 📱 **Application Web**
→ **Développeur** - SDK avec événements

### 🏢 **Application d'Entreprise**
→ **Expert** - PHP côté serveur

### 🔐 **Sécurité Maximale**
→ **Expert** - PHP + Webhooks

---

## 🚀 Démarrage Immédiat

### 1. **Choisissez votre niveau** ci-dessus
### 2. **Suivez les étapes** correspondantes
### 3. **Testez immédiatement** avec l'app SunuID
### 4. **Personnalisez** selon vos besoins

---

## 📞 Besoin d'Aide ?

### 🆘 **Support Immédiat**
- **Documentation complète** : [README.md](README.md)
- **Exemples prêts** : [examples/](examples/)
- **Support technique** : support@sunuid.sn

### 🎓 **Ressources**
- **Intégration universelle** : [INTEGRATION_UNIVERSAL.md](INTEGRATION_UNIVERSAL.md)
- **Guide rapide** : [QUICKSTART.md](QUICKSTART.md)
- **Intégration simple** : [INTEGRATION_SIMPLE.md](INTEGRATION_SIMPLE.md)
- **Intégration PHP** : [PHP_INTEGRATION.md](PHP_INTEGRATION.md)

---

## 🎉 Résultat

**SunuID s'adapte à VOTRE niveau :**

- 🧠 **Débutant** → Test en 30 secondes
- 👨‍💻 **Développeur** → Intégration en 2 minutes
- 🔒 **Expert** → Solution sécurisée en 5 minutes

**Choisissez votre niveau et commencez maintenant !** 🚀 