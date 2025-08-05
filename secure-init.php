<?php
/**
 * SunuID SDK - Endpoint d'initialisation sécurisée
 * 
 * Cet endpoint génère un token temporaire pour le client
 * sans exposer les credentials sensibles
 */

// Configuration CORS
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json');

// Gestion des requêtes OPTIONS (preflight)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Configuration sécurisée (à stocker dans un fichier .env en production)
$SUNUID_CONFIG = [
    'client_id' => '1754174441_36C4685215935D1F',
    'secret_id' => 'e29c66f185c389eedf7a1e8a242aba741cd659deaa6a9f8d50aa2dec98cce49d',
    'api_url' => 'https://api.sunuid.fayma.sn',
    'token_expiry' => 3600, // 1 heure
    'max_requests_per_token' => 100
];

// Fonction de validation des paramètres
function validateInitParams($data) {
    $errors = [];
    
    if (!isset($data['type']) || !in_array($data['type'], [1, 2, 3])) {
        $errors[] = 'Type invalide (doit être 1, 2 ou 3)';
    }
    
    if (!isset($data['partnerName']) || strlen($data['partnerName']) < 2) {
        $errors[] = 'Nom du partenaire invalide';
    }
    
    if (isset($data['theme']) && !in_array($data['theme'], ['light', 'dark'])) {
        $errors[] = 'Thème invalide';
    }
    
    return $errors;
}

// Fonction de génération de token sécurisé
function generateSecureToken($config, $clientData) {
    $payload = [
        'client_id' => $config['client_id'],
        'secret_id' => $config['secret_id'],
        'api_url' => $config['api_url'],
        'type' => $clientData['type'],
        'partner_name' => $clientData['partnerName'],
        'theme' => $clientData['theme'] ?? 'light',
        'exp' => time() + $config['token_expiry'],
        'iat' => time(),
        'jti' => uniqid('sunuid_', true)
    ];
    
    // En production, utilisez une clé secrète forte
    $secret = $config['secret_id'] . '_' . $_SERVER['HTTP_USER_AGENT'] ?? 'default';
    
    // Encodage simple (en production, utilisez JWT)
    $token = base64_encode(json_encode($payload));
    $signature = hash_hmac('sha256', $token, $secret);
    
    return $token . '.' . $signature;
}

// Fonction de validation de token
function validateToken($token, $config) {
    $parts = explode('.', $token);
    if (count($parts) !== 2) {
        return false;
    }
    
    list($payload, $signature) = $parts;
    
    // Vérifier la signature
    $secret = $config['secret_id'] . '_' . $_SERVER['HTTP_USER_AGENT'] ?? 'default';
    $expectedSignature = hash_hmac('sha256', $payload, $secret);
    
    if (!hash_equals($signature, $expectedSignature)) {
        return false;
    }
    
    // Décoder le payload
    $decoded = json_decode(base64_decode($payload), true);
    if (!$decoded) {
        return false;
    }
    
    // Vérifier l'expiration
    if (isset($decoded['exp']) && $decoded['exp'] < time()) {
        return false;
    }
    
    return $decoded;
}

// Gestion des requêtes
try {
    $method = $_SERVER['REQUEST_METHOD'];
    
    if ($method === 'POST') {
        // Initialisation sécurisée
        $input = json_decode(file_get_contents('php://input'), true);
        
        if (!$input) {
            throw new Exception('Données JSON invalides');
        }
        
        // Validation des paramètres
        $errors = validateInitParams($input);
        if (!empty($errors)) {
            throw new Exception('Paramètres invalides: ' . implode(', ', $errors));
        }
        
        // Génération du token sécurisé
        $token = generateSecureToken($SUNUID_CONFIG, $input);
        
        // Log de sécurité
        error_log("SunuID: Initialisation sécurisée - Type: {$input['type']}, Partner: {$input['partnerName']}, IP: " . $_SERVER['REMOTE_ADDR']);
        
        // Réponse sécurisée
        echo json_encode([
            'success' => true,
            'data' => [
                'token' => $token,
                'expires_in' => $SUNUID_CONFIG['token_expiry'],
                'api_url' => $SUNUID_CONFIG['api_url'],
                'type' => $input['type'],
                'partner_name' => $input['partnerName'],
                'theme' => $input['theme'] ?? 'light',
                'max_requests' => $SUNUID_CONFIG['max_requests_per_token']
            ],
            'message' => 'Token généré avec succès'
        ]);
        
    } elseif ($method === 'GET') {
        // Validation de token (pour les requêtes API)
        $authHeader = $_SERVER['HTTP_AUTHORIZATION'] ?? '';
        
        if (empty($authHeader) || !preg_match('/Bearer\s+(.*)$/i', $authHeader, $matches)) {
            throw new Exception('Token d\'autorisation manquant');
        }
        
        $token = $matches[1];
        $decoded = validateToken($token, $SUNUID_CONFIG);
        
        if (!$decoded) {
            throw new Exception('Token invalide ou expiré');
        }
        
        // Retourner les credentials pour l'API (côté serveur uniquement)
        echo json_encode([
            'success' => true,
            'data' => [
                'client_id' => $decoded['client_id'],
                'secret_id' => $decoded['secret_id'],
                'api_url' => $decoded['api_url'],
                'type' => $decoded['type'],
                'partner_name' => $decoded['partner_name'],
                'theme' => $decoded['theme'],
                'token' => $token // Retourner aussi le token original
            ],
            'message' => 'Token validé avec succès'
        ]);
        
    } else {
        throw new Exception('Méthode non autorisée');
    }
    
} catch (Exception $e) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage(),
        'timestamp' => date('c')
    ]);
    
    // Log d'erreur de sécurité
    error_log("SunuID Error: " . $e->getMessage() . " - IP: " . $_SERVER['REMOTE_ADDR']);
}
?> 