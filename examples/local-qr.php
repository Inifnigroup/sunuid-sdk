<?php

require_once __DIR__ . '/../vendor/autoload.php';

use SunuID\SunuID;

// Configuration minimale pour QR local
$config = [
    'client_id' => '1754166754_221A57B46843D755',
    'secret_id' => '56d40fe70507228b27f2640ae65894177c2fedbf246e2b30978fde1fc43953c5',
    'type' => 2,
    'enable_logs' => true
];

try {
    // Créer l'instance SDK
    $sunuid = new SunuID($config);
    
    // Initialiser le SDK
    $sunuid->init();
    
    echo "✅ SDK initialisé\n";
    
    // Générer un QR code local
    $content = "AUTH_" . time() . "_" . bin2hex(random_bytes(8));
    $qrResult = $sunuid->generateQRLocal($content, [
        'size' => 300,
        'margin' => 10,
        'label' => 'Authentification SunuID'
    ]);
    
    echo "🎯 QR Code local généré:\n";
    echo "   - Contenu: " . $qrResult['content'] . "\n";
    echo "   - Session ID: " . $qrResult['session_id'] . "\n";
    echo "   - Label: " . $qrResult['label'] . "\n";
    echo "   - Généré localement: " . ($qrResult['generated_locally'] ? 'Oui' : 'Non') . "\n";
    
    // Afficher l'image en base64 (début)
    $dataUri = $qrResult['qr_code_url'];
    echo "   - Data URI (début): " . substr($dataUri, 0, 50) . "...\n";
    
    // Sauvegarder l'image
    $imageData = base64_decode(str_replace('data:image/png;base64,', '', $dataUri));
    file_put_contents('qr-code-local.png', $imageData);
    echo "💾 Image sauvegardée: qr-code-local.png\n";
    
} catch (Exception $e) {
    echo "❌ Erreur: " . $e->getMessage() . "\n";
} 