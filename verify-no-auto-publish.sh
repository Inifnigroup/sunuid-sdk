#!/bin/bash

# 🚫 Script de Vérification - Pas de Publication Automatique
# SunuID SDK - Protection contre la publication automatique

echo "🔍 Vérification de la publication automatique..."
echo "================================================"

# Couleurs pour l'affichage
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Variables de statut
STATUS=0

# 1. Vérifier package.json
echo "📦 Vérification de package.json..."

if grep -q -E "(prepare|prepublishOnly|postpublish|preversion|postversion)" package.json; then
    echo -e "${RED}❌ DANGER: Scripts de publication automatique détectés dans package.json${NC}"
    echo "Scripts dangereux trouvés:"
    grep -E "(prepare|prepublishOnly|postpublish|preversion|postversion)" package.json
    STATUS=1
else
    echo -e "${GREEN}✅ Aucun script de publication automatique dans package.json${NC}"
fi

# 2. Vérifier Git hooks
echo ""
echo "🔗 Vérification des Git hooks..."

if ls -la .git/hooks/ 2>/dev/null | grep -q -E "(pre-commit|post-commit|pre-push)"; then
    echo -e "${YELLOW}⚠️  Hooks Git détectés:${NC}"
    ls -la .git/hooks/ | grep -E "(pre-commit|post-commit|pre-push)"
    echo -e "${YELLOW}   Vérifiez manuellement qu'ils ne publient pas automatiquement${NC}"
else
    echo -e "${GREEN}✅ Aucun hook Git de publication détecté${NC}"
fi

# 3. Vérifier CI/CD
echo ""
echo "🤖 Vérification des workflows CI/CD..."

if [ -d ".github/workflows" ]; then
    if ls -la .github/workflows/ | grep -q -E "(publish|release)"; then
        echo -e "${RED}❌ DANGER: Workflows de publication détectés${NC}"
        ls -la .github/workflows/ | grep -E "(publish|release)"
        STATUS=1
    else
        echo -e "${GREEN}✅ Aucun workflow de publication détecté${NC}"
    fi
else
    echo -e "${GREEN}✅ Aucun dossier workflows GitHub détecté${NC}"
fi

# 4. Vérifier les scripts npm dangereux
echo ""
echo "📋 Vérification des scripts npm..."

DANGEROUS_SCRIPTS=("prepare" "prepublishOnly" "postpublish" "preversion" "postversion")
for script in "${DANGEROUS_SCRIPTS[@]}"; do
    if npm run "$script" 2>/dev/null; then
        echo -e "${RED}❌ DANGER: Script '$script' existe et peut être exécuté${NC}"
        STATUS=1
    fi
done

if [ $STATUS -eq 0 ]; then
    echo -e "${GREEN}✅ Aucun script npm dangereux détecté${NC}"
fi

# 5. Vérifier les variables d'environnement
echo ""
echo "🌍 Vérification des variables d'environnement..."

if [ -n "$NPM_TOKEN" ]; then
    echo -e "${YELLOW}⚠️  NPM_TOKEN détecté dans l'environnement${NC}"
    echo "   Assurez-vous qu'il n'est pas utilisé pour la publication automatique"
fi

if [ -n "$NPM_USERNAME" ] && [ -n "$NPM_PASSWORD" ]; then
    echo -e "${YELLOW}⚠️  Credentials NPM détectés dans l'environnement${NC}"
    echo "   Assurez-vous qu'ils ne sont pas utilisés pour la publication automatique"
fi

# 6. Vérifier les fichiers de configuration
echo ""
echo "⚙️  Vérification des fichiers de configuration..."

if [ -f ".npmrc" ]; then
    echo -e "${YELLOW}⚠️  Fichier .npmrc détecté${NC}"
    echo "   Vérifiez qu'il ne contient pas de configuration de publication automatique"
fi

if [ -f ".nvmrc" ]; then
    echo -e "${GREEN}✅ Fichier .nvmrc détecté (normal)${NC}"
fi

# Résultat final
echo ""
echo "================================================"
if [ $STATUS -eq 0 ]; then
    echo -e "${GREEN}✅ VÉRIFICATION TERMINÉE - AUCUNE PUBLICATION AUTOMATIQUE DÉTECTÉE${NC}"
    echo -e "${GREEN}   Le SDK est configuré pour la publication manuelle uniquement${NC}"
    exit 0
else
    echo -e "${RED}❌ VÉRIFICATION ÉCHOUÉE - PUBLICATION AUTOMATIQUE DÉTECTÉE${NC}"
    echo -e "${RED}   CORRIGEZ LES PROBLÈMES AVANT DE CONTINUER${NC}"
    exit 1
fi 