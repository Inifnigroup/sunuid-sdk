# Changelog

Toutes les modifications notables de ce projet seront documentées dans ce fichier.

Le format est basé sur [Keep a Changelog](https://keepachangelog.com/fr/1.0.0/),
et ce projet adhère au [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.31] - 2024-12-19

### 🔧 Corrigé
- **URL QR Generator** : Correction de l'URL pour utiliser `https://api.sunuid.fayma.sn/qr-generator.php`
  - URL corrigée de `https://sunuid.fayma.sn/qr-generator.php` vers `https://api.sunuid.fayma.sn/qr-generator.php`
  - URL Secure Init également corrigée vers `https://api.sunuid.fayma.sn/secure-init.php`

## [1.0.30] - 2024-12-19

### 🔧 Corrigé
- **Erreur CORS** : Ajout d'une solution de contournement pour les erreurs CORS sur le QR Generator
  - Détection automatique des erreurs CORS (`Failed to fetch`, `CORS`)
  - Génération automatique du QR code côté client en cas d'erreur CORS
  - Fallback robuste avec la bibliothèque QRCode.js

### 🚀 Amélioré
- **Gestion d'erreur** : Amélioration de la gestion des erreurs réseau
- **Fallback intelligent** : Le SDK tente d'abord le serveur PHP, puis génère côté client si CORS échoue

## [1.0.29] - 2024-12-19

### 🔧 Corrigé
- **URL QR Generator** : Correction de l'URL malformée qui générait `https://test.fayma.sn/.sunuid.fayma.sn/qr-generator.php`
  - URL corrigée pour utiliser directement `https://sunuid.fayma.sn/qr-generator.php`
  - Amélioration de la logique de construction des URLs pour éviter les malformations

## [1.0.28] - 2024-12-19

### 🔧 Corrigé
- **URLs de production** : Correction des URLs codées en dur `localhost:8081` qui causaient l'erreur `ERR_CONNECTION_REFUSED` en production
  - QR Generator URL utilise maintenant `this.config.apiUrl` au lieu de `http://localhost:8081/qr-generator.php`
  - Secure Init URL utilise maintenant la configuration globale au lieu de `http://localhost:8081/secure-init.php`
- **Nom du partenaire** : Correction du nom du partenaire codé en dur "SunuID" dans les labels et textes
  - Instructions : "Scannez ce QR code avec l'application [Nom Partenaire] pour vous connecter"
  - Alt text : "QR Code [Nom Partenaire]"
  - Label QR : "[Type Service] - [Nom Partenaire]"

### 📚 Ajouté
- **Guide de migration** : `MIGRATION_PRODUCTION.md` - Guide complet pour migrer de la configuration locale vers la production
- **Configuration d'exemple** : `examples/production-config.js` - Configuration d'exemple pour la production
- **Test de production** : `examples/test-production.html` - Page de test pour vérifier la configuration de production
- **Test nom partenaire** : `examples/test-partner-name.html` - Page de test pour vérifier la personnalisation du nom
- **Configuration partenaire** : `examples/partner-name-config.js` - Exemples de configurations avec noms personnalisés

### 🚀 Amélioré
- **Documentation** : Mise à jour du README avec lien vers le guide de migration
- **Configuration** : Support amélioré pour la personnalisation du nom du partenaire
- **URLs de production** : Support automatique des URLs de production via la configuration

### 🔗 URLs de production
- **API URL** : `https://api.sunuid.fayma.sn`
- **QR Generator** : `https://sunuid.fayma.sn/qr-generator.php`
- **Secure Init** : `https://sunuid.fayma.sn/secure-init.php`

### 📋 Migration
Pour migrer vers cette version :
1. Inclure `src/sunuid-sdk-config.js` avant le SDK
2. Configurer `window.SunuIDConfig.apiUrl` avec l'URL de production
3. Utiliser `partnerName` dans la configuration pour personnaliser le nom affiché

## [1.0.27] - 2024-12-18

### 🔧 Corrigé
- Amélioration de la gestion des erreurs WebSocket
- Correction des problèmes de compatibilité avec les navigateurs plus anciens

### 📚 Ajouté
- Support pour les thèmes sombres
- Amélioration de la documentation

## [1.0.26] - 2024-12-17

### 🔧 Corrigé
- Correction des problèmes de connexion WebSocket
- Amélioration de la stabilité générale

### 📚 Ajouté
- Support pour l'auto-refresh des QR codes
- Amélioration des callbacks d'événements

## [1.0.25] - 2024-12-16

### 🚀 Première version stable
- Support complet pour l'authentification QR
- Support pour la vérification KYC
- Support pour les signatures électroniques
- Interface utilisateur responsive
- Support multi-langue (français, anglais, arabe)
- Thèmes personnalisables
- Mode sécurisé avec initialisation PHP 