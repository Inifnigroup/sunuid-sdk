# 📦 Guide de Publication Manuelle - SunuID SDK

## ⚠️ IMPORTANT : Publication Manuelle Uniquement

Ce projet est configuré pour une **publication manuelle uniquement**. Aucune publication automatique n'est autorisée.

## 🔒 Mesures Anti-Publication Automatique

### 1. Scripts npm Supprimés
- ❌ `"prepare": "npm run build"` - Supprimé
- ❌ `"prepublishOnly": "npm run build"` - Supprimé

### 2. Fichiers de Test Exclus
- ✅ Tous les fichiers `test*.html` sont exclus du package npm
- ✅ Fichiers de test ajoutés au `.npmignore` et `.gitignore`

### 3. Aucun CI/CD Automatique
- ❌ Pas de workflows GitHub Actions
- ❌ Pas de hooks Git de publication
- ❌ Pas de scripts de déploiement automatique

## 🚀 Processus de Publication Manuel

### Étape 1 : Préparation
```bash
# 1. Faire vos modifications dans le code source
# 2. Tester localement
npm run build
npm run serve
```

### Étape 2 : Tests
```bash
# 3. Tester avec les fichiers de test locaux
# Ouvrir test-custom-qr.html, test-final-websocket.html, etc.
```

### Étape 3 : Versioning
```bash
# 4. Incrémenter la version manuellement dans package.json
# Exemple: "version": "1.0.26"
```

### Étape 4 : Build
```bash
# 5. Construire pour la production
npm run build
```

### Étape 5 : Publication
```bash
# 6. Publier manuellement (seulement quand vous êtes prêt)
npm publish
```

## 📋 Checklist Avant Publication

- [ ] Code testé localement
- [ ] Version incrémentée dans `package.json`
- [ ] Build réussi (`npm run build`)
- [ ] Tests passés avec les fichiers HTML
- [ ] README.md à jour
- [ ] Pas de fichiers de test dans le package

## 🛡️ Sécurité

- **Aucune publication automatique** possible
- **Contrôle total** sur le timing de publication
- **Tests obligatoires** avant publication
- **Versioning manuel** requis

## 📞 Support

Si vous avez des questions sur le processus de publication, contactez l'équipe SunuID.

---

**⚠️ Rappel : Toujours publier manuellement après tests complets !** 