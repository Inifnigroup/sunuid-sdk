# Changelog

Toutes les modifications notables de ce projet seront documentées dans ce fichier.

Le format est basé sur [Keep a Changelog](https://keepachangelog.com/fr/1.0.0/),
et ce projet adhère au [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.36] - 2025-01-06

### 🔧 Corrigé
- **Réception des événements socket** : Correction de la réception de l'événement `qr_scan_initiated`
  - Ajout d'un listener spécifique pour `qr_scan_initiated`
  - Ajout d'un listener fallback pour l'événement `message`
  - Correction de la méthode `onAny()` qui n'est pas standard dans Socket.IO
  - Meilleure gestion des événements socket pour le debugging

### 🎨 Amélioré
- **Debugging socket** : Amélioration du logging des événements socket
  - Logs détaillés pour tous les événements socket reçus
  - Détection automatique de `qr_scan_initiated` dans les messages génériques
  - Meilleure traçabilité des événements socket

### 📚 Ajouté
- **Listener fallback** : Nouveau listener pour l'événement `message` générique
  - Détection de `qr_scan_initiated` dans les messages socket
  - Fallback robuste pour différentes versions de Socket.IO
  - Logs détaillés pour le debugging

### 🔄 Logs améliorés
- **QR Scan Initiated** : `🔍 QR Scan Initiated reçu: data`
- **Message socket** : `📨 Message socket reçu: data`
- **Debug socket** : `🌐 Socket Event [eventName]: args`

### 📋 Configuration recommandée
```javascript
const config = {
    // ... autres options
    // Les événements socket sont maintenant correctement reçus
    // Le loader s'affiche automatiquement lors du scan
};
```

### 🧪 Test
- Scanner un QR code pour vérifier que l'événement `qr_scan_initiated` est reçu
- Vérifier les logs dans la console pour voir tous les événements socket
- Confirmer que le loader s'affiche automatiquement

## [1.0.35] - 2025-01-06

### 🔧 Corrigé
- **Logging des événements socket** : Ajout du logging complet de tous les événements socket reçus
  - Méthode `onAny()` pour capturer tous les événements socket
  - Format de log : `🌐 Socket Event [eventName]: args`
  - Logs détaillés pour tous les événements socket

### 🎨 Amélioré
- **Détection du scan QR** : Détection automatique de l'événement `qr_scan_initiated`
  - Remplacement automatique du QR code par un loader animé
  - Méthode `showQRLoader()` pour afficher un loader pendant le scan
  - Design moderne avec spinner CSS et messages informatifs

### 📚 Ajouté
- **Méthode `showQRLoader()`** : Nouvelle méthode pour afficher un loader pendant le scan
  - Recherche intelligente du conteneur QR dans plusieurs IDs possibles
  - Loader animé avec spinner CSS et animation de rotation
  - Messages contextuels : "Scan en cours..." et "Traitement en cours..."
  - Design responsive et moderne

### 🔄 Logs améliorés
- **QR Status Update** : `📱 QR Status Update: data`
- **QR Scan Success** : `✅ QR Scan Success: data`
- **QR Expired** : `⏰ QR Expired: data`
- **Tous les événements socket** : `🌐 Socket Event [eventName]: args`

### 📋 Configuration recommandée
```javascript
const config = {
    // ... autres options
    // Les logs socket sont automatiquement activés
    // Le loader s'affiche automatiquement lors du scan
};
```

### 🧪 Test
- Ouvrir la console du navigateur pour voir tous les événements socket
- Scanner un QR code pour voir le loader s'afficher automatiquement
- Vérifier les logs détaillés dans la console

## [1.0.34] - 2025-01-06

### 🔧 Corrigé
- **Appels répétitifs à l'API** : Correction du problème des appels multiples à `/qr-generate`
  - Rafraîchissement automatique désactivé par défaut (`autoRefresh: false`)
  - Gestion des timers multiples avec arrêt automatique des timers précédents
  - Méthode `stopAutoRefresh()` pour arrêter manuellement le rafraîchissement
  - Protection contre les boucles infinies dans `refreshQR()`

### 🎨 Amélioré
- **Interface épurée** : Suppression des textes d'instructions superflus
  - Suppression de "Scannez ce QR code avec l'application mobile pour vous connecter"
  - Suppression de "En attente de scan..."
  - Suppression du div de succès redondant dans la page de test
  - Interface plus minimaliste et professionnelle

### 📚 Ajouté
- **Contrôle du rafraîchissement** : Nouvelles méthodes pour contrôler le rafraîchissement automatique
  - `startAutoRefresh(containerId, type, options)` : Démarrer le rafraîchissement
  - `stopAutoRefresh()` : Arrêter le rafraîchissement
  - Logs détaillés pour le suivi des timers
- **Page de test améliorée** : Contrôles pour le rafraîchissement automatique
  - Sélecteur pour activer/désactiver le rafraîchissement automatique
  - Boutons pour démarrer/arrêter manuellement le rafraîchissement
  - Messages d'information sur les appels répétitifs

### 🔄 Rafraîchissement automatique
- **Désactivé par défaut** : `autoRefresh: false` pour éviter les appels répétitifs
- **Contrôle manuel** : Possibilité d'activer/désactiver via la configuration
- **Gestion des timers** : Arrêt automatique des timers précédents avant d'en démarrer un nouveau
- **Logs améliorés** : Messages clairs pour identifier les appels et leur source

### 📋 Configuration recommandée
```javascript
const config = {
    autoRefresh: false, // Désactivé par défaut
    refreshInterval: 30000, // 30 secondes si activé
    // ... autres options
};
```

### 🧪 Test
- Ouvrir `test-sdk-simple.html` avec le rafraîchissement automatique désactivé
- Vérifier qu'il n'y a qu'un seul appel à `generateQR`
- Utiliser les boutons de contrôle pour tester le rafraîchissement manuel

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