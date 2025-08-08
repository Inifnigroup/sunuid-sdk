# Changelog

Toutes les modifications notables de ce projet seront documentées dans ce fichier.

Le format est basé sur [Keep a Changelog](https://keepachangelog.com/fr/1.0.0/),
et ce projet adhère au [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.46] - 2025-01-07

### 🔍 Debug
- **Logs détaillés pour responseData** : Ajout de logs pour voir la structure exacte des données envoyées par l'API
- **Affichage des clés disponibles** : Debug des champs disponibles dans responseData pour adapter l'extraction

### 📋 Debug
```javascript
// Logs ajoutés pour diagnostiquer la structure des données
console.log('🔍 Contenu complet de responseData:', websocketData.responseData);
console.log('🔍 Clés disponibles dans responseData:', Object.keys(websocketData.responseData));
```

## [1.0.45] - 2025-01-07

### 🔧 Fixed
- **Extraction des données WebSocket** : Ajout de la méthode `extractAuthDataFromWebSocket()` pour traiter le format des données envoyées par l'API
- **Gestion du format `responseData`** : Le SDK extrait maintenant correctement les données d'authentification du champ `responseData` dans l'événement WebSocket
- **Compatibilité des formats** : Support des formats callback et WebSocket avec fallback intelligent

### 📋 Fonctionnement
```javascript
// Format WebSocket reçu de l'API
{
    type: 'qr_scan_success',
    socketID: 'dNr9Fg_LPdvmlY2pAAAb',
    responseData: {
        token: 'jwt_token_here',
        session_id: 'sess_123',
        user_id: '1',
        user_info: { name: 'John', email: 'john@example.com' }
        // ... autres données
    }
}

// Le SDK extrait automatiquement les données de responseData
// et les transforme au format attendu par processAuthentication()
```

## [1.0.44] - 2025-01-07

### 🎉 Ajouté
- **Gestion complète de l'événement `qr_scan_success`** : Le SDK traite maintenant correctement l'événement WebSocket envoyé par l'API
- **Méthode `showSuccessMessage()`** : Affichage d'un message de succès avec les informations utilisateur après authentification
- **Intégration avec `processAuthentication()`** : Le gestionnaire WebSocket utilise la même logique que les callbacks

### 🔧 Améliorations
- **Gestionnaire `handleQRScanSuccess()`** : Maintenant traite l'authentification complète au lieu de juste logger l'événement
- **Interface utilisateur** : Affichage d'un message de succès avec nom d'utilisateur et email au lieu de rester sur le loader
- **Gestion des erreurs** : Meilleure gestion des erreurs dans le processus d'authentification WebSocket

### 📋 Fonctionnement
```javascript
// L'API envoie l'événement WebSocket
socket.emit('qr_scan_success', {
    user_id: "1",
    session_id: "sess_123",
    user_info: { name: "John Doe", email: "john@example.com" },
    // ... autres données
});

// Le SDK traite automatiquement l'événement
// 1. Appelle processAuthentication()
// 2. Affiche showSuccessMessage()
// 3. Gère la redirection si configurée
```

## [1.0.43] - 2025-01-06

### 🚨 CRITIQUE - Correction boucle infinie
- **Suppression complète de l'auto-init** : L'initialisation automatique est désactivée par défaut
- **Protection renforcée** : Ajout de `_initInProgress` pour éviter les appels multiples
- **Initialisation manuelle obligatoire** : L'utilisateur doit appeler `init()` explicitement
- **Exemple sans boucle** : `no-loop-example.html` montre l'utilisation correcte

### 🔧 Changements majeurs
- **Constructeur** : Plus d'initialisation automatique, message d'information
- **init()** : Protection triple contre les boucles
- **autoInit** : Désactivé par défaut et ignoré dans le constructeur

### 📋 Utilisation corrigée
```javascript
// ✅ CORRECT - Initialisation manuelle
const config = {
    autoInit: false, // Désactivé
    // ... autres options
};
const sunuid = new SunuID(config);
await sunuid.init(); // Appel manuel obligatoire

// ❌ INCORRECT - Ne pas faire
const sunuid = new SunuID(config); // Pas d'auto-init
```

### 🛡️ Protections ajoutées
- `isInitialized` : Vérification d'état
- `initPromise` : Gestion des promesses
- `_initInProgress` : Protection contre les appels simultanés

## [1.0.42] - 2025-01-06

### 🐛 Corrigé
- **Boucle d'initialisation infinie** : Correction du problème de réinitialisation en continu
  - Désactivation de `autoInit` par défaut pour éviter les conflits
  - Protection contre les initialisations multiples et simultanées
  - Ajout de délai dans le constructeur pour éviter les conflits avec d'autres scripts
  - Gestion des promesses d'initialisation pour éviter les doublons

### 🔧 Améliorations
- **Protection d'initialisation** : 
  - Vérification `isInitialized` avant initialisation
  - Gestion des promesses d'initialisation simultanées
  - Délai de 100ms pour l'auto-init
- **autoInit** : Désactivé par défaut (`false`) au lieu de `true`
- **Constructeur** : Initialisation plus sûre avec protection

### 📋 Configuration
```javascript
const config = {
    autoInit: true, // Doit être explicitement activé
    // ... autres options
};
```

## [1.0.41] - 2025-01-06

### 🎉 Ajouté
- **Système de callback complet** : Implémentation du schéma de callback SunuID
  - Gestion automatique des callbacks d'authentification
  - Validation des paramètres de sécurité (state, signature, timestamp)
  - Décodage JWT et traitement des données utilisateur
  - Redirection automatique après succès
  - Support des variables dans les URLs de redirection

### 🔧 Fonctionnalités
- **handleCallback()** : Détection et traitement automatique des callbacks
- **validateCallback()** : Validation de sécurité des paramètres
- **processAuthentication()** : Traitement de l'authentification
- **decodeJWT()** : Décodage des tokens JWT
- **redirectAfterSuccess()** : Redirection avec variables
- **generateState()** : Génération d'états de sécurité

### 📋 Configuration
```javascript
const config = {
    // Callbacks d'authentification
    redirectAfterSuccess: '/dashboard?user={user_id}&session={session_id}',
    verifySignature: false,
    tokenMaxAge: 300,
    onAuthenticationSuccess: function(userData, callbackData) { ... },
    onAuthenticationError: function(error, callbackData) { ... },
    state: null // Généré automatiquement
};
```

### 🔐 Sécurité
- **État de sécurité** : Protection CSRF avec paramètre `state`
- **Signature** : Vérification d'intégrité (optionnelle)
- **Timestamp** : Protection contre la réutilisation
- **JWT Token** : Décodage sécurisé des données
- **Expiration** : Vérification de l'âge du token

### 📚 Exemple
- **callback-example.html** : Exemple complet d'utilisation
- Gestion des succès et erreurs
- Affichage des données utilisateur
- Interface utilisateur complète

### 🔄 Flux de callback
```
1. Utilisateur scanne QR → Validation côté serveur
2. API redirige vers callback URL avec paramètres
3. SDK détecte automatiquement le callback
4. Validation des paramètres de sécurité
5. Décodage JWT et extraction des données
6. Appel des callbacks de succès/erreur
7. Redirection automatique si configurée
```

## [1.0.40] - 2025-01-06

### 🔧 Corrigé
- **Génération QR code** : Correction de la gestion de la réponse API
  - Ajout de logs détaillés pour identifier la structure de réponse
  - Gestion des cas où `qrCodeUrl` n'existe pas dans la réponse
  - Recherche automatique de champs alternatifs pour l'URL QR
  - Protection contre les erreurs `undefined.startsWith()`

### 🎨 Amélioré
- **Debug API** : Amélioration des logs de réponse
  - Affichage de la structure complète de la réponse QR API
  - Affichage détaillé de `response.data`
  - Logs pour identifier les champs disponibles

### 📚 Ajouté
- **Champs alternatifs** : Support de multiples champs pour l'URL QR
  - `qrCodeUrl` (original)
  - `qr_url`
  - `qrUrl`
  - `url`
  - `image_url`
  - `imageUrl`
- **Gestion d'erreur** : Vérification de l'existence de l'URL avant traitement

### 🔄 Logs améliorés
- **Réponse API** : `📋 Réponse QR API complète:` et `📋 Structure response.data:`
- **URL QR** : `⚠️ qrCodeUrl non trouvé` ou `✅ URL QR trouvée dans un champ alternatif`
- **Champs N/A** : Gestion des champs manquants avec `|| 'N/A'`

### 📋 Configuration recommandée
```javascript
const config = {
    // ... autres options
    // Le SDK va maintenant identifier automatiquement la structure de réponse
    // et trouver l'URL QR dans le bon champ
};
```

### 🧪 Test
- Vérifier les logs pour voir la structure exacte de la réponse API
- Confirmer que l'URL QR est trouvée dans le bon champ
- Vérifier que le QR code s'affiche correctement

## [1.0.39] - 2025-01-06

### 🔧 Corrigé
- **Génération QR code** : Correction du champ de contenu pour `/qr-generate`
  - Changement de `content` vers `data` pour le contenu QR
  - L'API semble attendre `data` au lieu de `content`
  - Amélioration de la compatibilité avec l'API SunuID

### 🎨 Amélioré
- **Compatibilité API** : Test de différents champs pour le contenu QR
  - `content` → `qr_content` → `data`
  - Meilleure adaptation aux attentes de l'API

### 📚 Ajouté
- **Champ data** : Utilisation du champ `data` pour le contenu QR
- **Debug amélioré** : Logs pour identifier le bon champ attendu

### 🔄 Logs améliorés
- **QR Data** : Affichage du champ `data` dans les requêtes
- **API Response** : Meilleure traçabilité des erreurs 400

### 📋 Configuration recommandée
```javascript
const config = {
    // ... autres options
    // Le QR code devrait maintenant utiliser le bon champ pour l'API
};
```

### 🧪 Test
- Vérifier que l'API accepte le champ `data`
- Confirmer que le QR code se génère sans erreur 400
- Vérifier que le contenu QR est correctement transmis

## [1.0.38] - 2025-01-06

### 🔧 Corrigé
- **Génération QR code** : Correction de l'erreur 400 (Bad Request) sur `/qr-generate`
  - Correction de la méthode `sanitizeRequestData()` pour préserver tous les champs
  - Ajout des champs `content` et `label` dans les requêtes QR
  - Amélioration de la récupération des informations partenaire depuis `/debug`
  - Support de différentes structures de réponse API

### 🎨 Amélioré
- **Récupération partenaire** : Amélioration de `fetchPartnerInfo()`
  - Support de multiples structures de réponse API
  - Recherche du `partner_id` dans différents chemins de données
  - Meilleure gestion des cas d'erreur et fallbacks
  - Logs plus détaillés pour le debugging

### 📚 Ajouté
- **Champs QR** : Préservation des champs `content` et `label` dans les requêtes
- **Structures API** : Support de `data.partner_id`, `data.authentication.auth_test.partner_id`, `data.auth_test.partner_id`
- **Debug amélioré** : Logs plus clairs pour identifier les problèmes de données

### 🔄 Logs améliorés
- **Partner Info** : `✅ Informations partenaire récupérées: {partnerName, partnerId, serviceId}`
- **QR Data** : Affichage complet des données envoyées à `/qr-generate`
- **API Response** : Meilleure traçabilité des structures de réponse

### 📋 Configuration recommandée
```javascript
const config = {
    // ... autres options
    // Le QR code devrait maintenant se générer correctement
    // avec le bon nom de partenaire et le contenu approprié
};
```

### 🧪 Test
- Vérifier que le nom du partenaire est correctement récupéré
- Confirmer que le QR code se génère sans erreur 400
- Vérifier que les champs `content` et `label` sont présents dans les requêtes

## [1.0.37] - 2025-01-06

### 🔧 Corrigé
- **Vérification des connexions API** : Correction de la méthode `checkConnections()`
  - Changement de GET vers POST pour l'endpoint `/debug`
  - Ajout des credentials dans la requête de test
  - Correction de la vérification du statut API (success: true au lieu de status: 'operational')
  - Amélioration des logs de debug pour le statut API

### 🎨 Amélioré
- **Logs de debug** : Amélioration des messages de statut API
  - Affichage "accessible" ou "inaccessible" au lieu de "undefined"
  - Affichage du code HTTP en cas d'erreur
  - Meilleure traçabilité des problèmes de connexion

### 📚 Ajouté
- **Headers Content-Type** : Ajout du header JSON pour les requêtes de test
- **Credentials dans les tests** : Inclusion des credentials dans les requêtes de vérification

### 🔄 Logs améliorés
- **API Status** : `🔍 API Status: accessible` ou `🔍 API Status: inaccessible`
- **HTTP Status** : `🔍 API Status: HTTP 200` en cas d'erreur
- **Test API** : Messages plus clairs pour les échecs de connexion

### 📋 Configuration recommandée
```javascript
const config = {
    // ... autres options
    // La vérification des connexions fonctionne maintenant correctement
    // Le QR code se génère automatiquement après vérification
};
```

### 🧪 Test
- Vérifier que l'API est détectée comme accessible
- Confirmer que le QR code se génère après la vérification
- Vérifier les logs de debug dans la console

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