# 🚫 Guide de Publication Manuelle - SunuID SDK

**Empêcher la publication automatique du SDK**

## ⚠️ Règles de Publication

### **❌ INTERDIT**
- Publication automatique via Git hooks
- Publication automatique via CI/CD
- Publication automatique via scripts npm
- Publication automatique via GitHub Actions

### **✅ AUTORISÉ**
- Publication manuelle via `npm publish`
- Publication manuelle via `npm version` + `npm publish`
- Publication manuelle via interface npm

## 🔧 Configuration Actuelle

### **package.json - Scripts Sécurisés**
```json
{
  "scripts": {
    "build": "rollup -c",
    "dev": "rollup -c -w",
    "test": "jest",
    "lint": "eslint src/**/*.js",
    "format": "prettier --write src/**/*.js",
    "serve": "python3 -m http.server 8080",
    "demo": "open https://sunuid.fayma.sn/examples/demo.html"
  }
}
```

**✅ Aucun script de publication automatique présent**

### **Scripts DANGEREUX à ÉVITER**
```json
{
  "scripts": {
    "prepare": "npm run build",           // ❌ DANGEREUX
    "prepublishOnly": "npm run build",    // ❌ DANGEREUX
    "postpublish": "git push",            // ❌ DANGEREUX
    "preversion": "npm run build",        // ❌ DANGEREUX
    "postversion": "npm publish"          // ❌ DANGEREUX
  }
}
```

## 🚫 Vérifications de Sécurité

### **1. Vérifier package.json**
```bash
# Vérifier qu'aucun script de publication automatique n'existe
grep -E "(prepare|prepublishOnly|postpublish|preversion|postversion)" package.json
# Résultat attendu: Aucune correspondance trouvée
```

### **2. Vérifier Git Hooks**
```bash
# Vérifier qu'aucun hook de publication n'existe
ls -la .git/hooks/ | grep -E "(pre-commit|post-commit|pre-push)"
# Résultat attendu: Aucun hook de publication
```

### **3. Vérifier CI/CD**
```bash
# Vérifier qu'aucun workflow de publication automatique n'existe
ls -la .github/workflows/ 2>/dev/null | grep -E "(publish|release)"
# Résultat attendu: Aucun workflow de publication
```

## 📋 Processus de Publication Manuel

### **Étape 1: Préparation**
```bash
# 1. Vérifier les changements
git status
git diff

# 2. Tester le build
npm run build

# 3. Tester en local
npm run serve
# Ouvrir http://localhost:8080/test-local.html
```

### **Étape 2: Validation**
```bash
# 1. Linter
npm run lint

# 2. Tests
npm test

# 3. Vérifier la taille du package
npm pack --dry-run
```

### **Étape 3: Publication**
```bash
# 1. Incrémenter la version (manuellement)
npm version patch   # ou minor, major

# 2. Vérifier la version
cat package.json | grep version

# 3. Publier (manuellement)
npm publish

# 4. Pousser les changements
git push origin main
git push --tags
```

## 🛡️ Mesures de Protection

### **1. Script de Vérification**
```bash
#!/bin/bash
# verify-no-auto-publish.sh

echo "🔍 Vérification de la publication automatique..."

# Vérifier package.json
if grep -q -E "(prepare|prepublishOnly|postpublish|preversion|postversion)" package.json; then
    echo "❌ DANGER: Scripts de publication automatique détectés dans package.json"
    exit 1
fi

# Vérifier Git hooks
if ls -la .git/hooks/ | grep -q -E "(pre-commit|post-commit|pre-push)"; then
    echo "❌ DANGER: Hooks de publication détectés"
    exit 1
fi

# Vérifier CI/CD
if ls -la .github/workflows/ 2>/dev/null | grep -q -E "(publish|release)"; then
    echo "❌ DANGER: Workflows de publication détectés"
    exit 1
fi

echo "✅ Aucune publication automatique détectée"
```

### **2. Pre-commit Hook (Optionnel)**
```bash
#!/bin/bash
# .git/hooks/pre-commit

# Vérifier qu'aucun script de publication n'est ajouté
if git diff --cached package.json | grep -q -E "(prepare|prepublishOnly|postpublish)"; then
    echo "❌ ERREUR: Tentative d'ajout de script de publication automatique"
    echo "La publication doit rester manuelle"
    exit 1
fi
```

## 📝 Checklist de Publication

### **Avant Publication**
- [ ] **Aucun script automatique** dans package.json
- [ ] **Tests passent** : `npm test`
- [ ] **Build fonctionne** : `npm run build`
- [ ] **Tests locaux** : `npm run serve`
- [ ] **Version correcte** : Vérifier package.json
- [ ] **Changelog à jour** : Documenter les changements

### **Pendant Publication**
- [ ] **Publication manuelle** : `npm publish`
- [ ] **Confirmation** : Vérifier sur npmjs.com
- [ ] **Tags Git** : `git push --tags`

### **Après Publication**
- [ ] **Documentation** : Mettre à jour README si nécessaire
- [ ] **Annonce** : Informer l'équipe
- [ ] **Monitoring** : Vérifier les téléchargements

## 🚨 Alertes de Sécurité

### **Signaux d'Alerte**
- ❌ Script `prepare` dans package.json
- ❌ Script `prepublishOnly` dans package.json
- ❌ Script `postpublish` dans package.json
- ❌ Hook Git de publication
- ❌ Workflow GitHub Actions de publication
- ❌ Publication automatique via CI/CD

### **Actions Immédiates**
1. **Arrêter** toute publication automatique
2. **Supprimer** les scripts dangereux
3. **Reverter** les changements si nécessaire
4. **Vérifier** qu'aucune publication non autorisée n'a eu lieu

## 📞 Contacts

### **En Cas de Problème**
- **Développeur principal** : [Votre nom]
- **Équipe SunuID** : dev@sunuid.sn
- **Urgence** : [Numéro d'urgence]

---

**Publication Manuelle Obligatoire - SunuID SDK** 🚫 