# 🧪 Guide de Test Local - SunuID SDK

**Guide pour tester le SDK en environnement local**

## 🚀 Démarrage Rapide

### 1. **Démarrer les Serveurs**

```bash
# Terminal 1 - Serveur HTTP (pour les fichiers statiques)
python3 -m http.server 8080

# Terminal 2 - Serveur PHP (pour le mode sécurisé)
php -S localhost:8081
```

### 2. **Ouvrir les Tests**

```bash
# Test principal
open http://localhost:8080/test-local.html

# Exemples
open http://localhost:8080/examples/universal-login.html
open http://localhost:8080/examples/universal-kyc.html
open http://localhost:8080/examples/simple-login.html
open http://localhost:8080/examples/simple-kyc.html
```

## 🧪 Tests Disponibles

### **test-local.html** - Test Complet
- 🔓 **Mode Classique** : Test avec credentials visibles
- 🔒 **Mode Sécurisé** : Test avec endpoint PHP local
- 📋 **Test KYC** : Test du type KYC (type 1)
- 📊 **Logs détaillés** : Suivi complet des événements

### **examples/universal-login.html** - Exemple Universel
- Configuration simple
- Utilisation de `getQRCode()`
- Interface moderne

### **examples/universal-kyc.html** - Exemple KYC
- Test du type KYC
- Configuration personnalisée

## 🔧 Configuration de Test

### **Credentials de Test**
```javascript
const config = {
    clientId: '1754166754_221A57B46843D755',
    secretId: '56d40fe70507228b27f2640ae65894177c2fedbf246e2b30978fde1fc43953c5',
    type: 2, // 1=KYC, 2=AUTH, 3=Signature
    partnerName: 'Test Local'
};
```

### **Mode Sécurisé Local**
```javascript
const config = {
    type: 2,
    partnerName: 'Test Local Secure',
    secureInit: true,
    secureInitUrl: 'http://localhost:8081/secure-init.php'
};
```

## 📋 Checklist de Test

### ✅ **Tests Fonctionnels**
- [ ] **SDK chargement** : `typeof SunuID !== 'undefined'`
- [ ] **QRCode library** : `typeof QRCode !== 'undefined'`
- [ ] **Mode classique** : Initialisation et génération QR
- [ ] **Mode sécurisé** : Token et génération QR
- [ ] **Type KYC** : Génération QR KYC
- [ ] **Fallback côté client** : En cas d'erreur PHP

### ✅ **Tests d'Interface**
- [ ] **QR code affiché** : Image visible
- [ ] **Pas de contenu visible** : Contenu QR non affiché
- [ ] **Label intégré** : Label dans l'image
- [ ] **Instructions** : Texte d'aide visible
- [ ] **Statut** : Messages de statut

### ✅ **Tests de Robustesse**
- [ ] **Erreur 404** : Fallback côté client
- [ ] **Erreur CORS** : Fallback côté client
- [ ] **Erreur réseau** : Gestion d'erreur
- [ ] **Logs de sécurité** : Événements enregistrés

## 🔍 Debugging

### **Console Browser**
```javascript
// Vérifier le SDK
console.log('SDK:', typeof SunuID);
console.log('QRCode:', typeof QRCode);

// Vérifier l'instance
console.log('Instance:', sunuid);
console.log('Config:', sunuid.config);

// Vérifier les logs de sécurité
console.log('Logs:', sunuid.getSecurityLogs());
```

### **Logs Attendus**
```
🚀 Test Local initialisé
🔍 SDK disponible: true
🔍 QRCode disponible: true
✅ SDK classique initialisé
✅ QR code généré en mode classique
🆔 Service ID: [number]
📱 Code: [base64]
```

## 🚨 Problèmes Courants

### **Erreur "SDK non disponible"**
- Vérifier que `dist/sunuid-sdk.min.js` existe
- Vérifier que le serveur HTTP fonctionne sur le port 8080

### **Erreur "QRCode non disponible"**
- Vérifier la connexion internet (CDN)
- Vérifier que la bibliothèque QRCode est chargée

### **Erreur "Mode sécurisé échoue"**
- Vérifier que le serveur PHP fonctionne sur le port 8081
- Vérifier que `secure-init.php` existe

### **Erreur "404 sur qr-generator.php"**
- Normal en production (endpoint n'existe pas)
- Le fallback côté client doit s'activer automatiquement

## 📊 Résultats Attendus

### **Succès**
- ✅ QR code généré et affiché
- ✅ Interface propre (pas de contenu visible)
- ✅ Label intégré dans l'image
- ✅ Logs de sécurité enregistrés
- ✅ Fallback côté client fonctionnel

### **Échec**
- ❌ Erreur dans la console
- ❌ Image de fallback affichée
- ❌ Interface non fonctionnelle

## 🔄 Mise à Jour

### **Après Modification du SDK**
```bash
# Reconstruire
npm run build

# Redémarrer les serveurs si nécessaire
# Rafraîchir la page de test
```

---

**Test Local - SunuID SDK v1.0.33** 🧪 