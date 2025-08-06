# 📦 Publication Manuelle - SunuID SDK

**⚠️ IMPORTANT : La publication automatique est STRICTEMENT INTERDITE**

## 🚫 Règles de Publication

### **INTERDIT**
- ❌ `npm publish` automatique
- ❌ Publication via Git hooks
- ❌ Publication via CI/CD
- ❌ Publication via GitHub Actions
- ❌ Scripts `prepare`, `prepublishOnly`, `postpublish`

### **AUTORISÉ**
- ✅ `npm publish` manuel
- ✅ `npm version` + `npm publish` manuel
- ✅ Publication via interface npm

## 🔧 Vérification Avant Publication

### **1. Vérifier l'absence de publication automatique**
```bash
npm run verify-no-auto-publish
```

### **2. Tester le build**
```bash
npm run build
```

### **3. Tester en local**
```bash
npm run serve
# Ouvrir http://localhost:8080/test-local.html
```

## 📋 Processus de Publication

### **Étape 1: Préparation**
```bash
# 1. Vérifier les changements
git status
git diff

# 2. Vérifier qu'aucune publication automatique n'est configurée
npm run verify-no-auto-publish

# 3. Tester le build
npm run build
```

### **Étape 2: Version**
```bash
# Incrémenter la version (manuellement)
npm version patch   # ou minor, major

# Vérifier la version
cat package.json | grep version
```

### **Étape 3: Publication**
```bash
# Publier (manuellement)
npm publish

# Vérifier la publication
# Aller sur https://www.npmjs.com/package/sunuid-sdk
```

### **Étape 4: Git**
```bash
# Pousser les changements
git push origin main
git push --tags
```

## 🛡️ Protection

### **Script de Vérification**
Le script `verify-no-auto-publish.sh` vérifie :
- ✅ Aucun script de publication automatique dans package.json
- ✅ Aucun hook Git de publication
- ✅ Aucun workflow CI/CD de publication
- ✅ Aucun script npm dangereux

### **Gitignore**
Le fichier `.gitignore` empêche le commit de :
- `.npmrc` (credentials)
- `.github/workflows/publish.yml` (CI/CD)
- Scripts de publication automatique

## 🚨 En Cas de Problème

### **Publication Automatique Détectée**
1. **Arrêter** immédiatement toute publication
2. **Vérifier** `npm run verify-no-auto-publish`
3. **Supprimer** les scripts dangereux
4. **Reverter** si nécessaire

### **Publication Non Autorisée**
1. **Contacter** l'équipe immédiatement
2. **Vérifier** les logs npm
3. **Reverter** la version si nécessaire
4. **Analyser** la cause

## 📞 Contacts

- **Équipe SunuID** : dev@sunuid.sn
- **Développeur principal** : [Votre nom]
- **Urgence** : [Numéro d'urgence]

---

**Publication Manuelle Obligatoire** 🚫 