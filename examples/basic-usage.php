<?php

require_once __DIR__ . '/../vendor/autoload.php';

use SunuID\SunuID;

// Configuration
$config = [
    'client_id' => '1754166754_221A57B46843D755',
    'secret_id' => '56d40fe70507228b27f2640ae65894177c2fedbf246e2b30978fde1fc43953c5',
    'type' => 2, // Authentification
    'enable_logs' => true,
    'log_file' => 'sunuid.log'
];

try {
    // Créer l'instance SDK
    $sunuid = new SunuID($config);
    
    // Initialiser le SDK
    $sunuid->init();
    
    echo "✅ SDK initialisé avec succès\n";
    echo "📋 Informations partenaire: " . json_encode($sunuid->getPartnerInfo(), JSON_PRETTY_PRINT) . "\n";
    
    // Générer un QR code
    $qrResult = $sunuid->generateQR();
    
    echo "🎯 QR Code généré:\n";
    echo "   - URL: " . $qrResult['qr_code_url'] . "\n";
    echo "   - Contenu: " . $qrResult['content'] . "\n";
    echo "   - Session ID: " . $qrResult['session_id'] . "\n";
    echo "   - Label: " . $qrResult['label'] . "\n";
    
    // Vérifier le statut du QR code
    $status = $sunuid->checkQRStatus($qrResult['session_id']);
    echo "📊 Statut QR: " . json_encode($status, JSON_PRETTY_PRINT) . "\n";
    
} catch (Exception $e) {
    echo "❌ Erreur: " . $e->getMessage() . "\n";
    echo "📍 Fichier: " . $e->getFile() . ":" . $e->getLine() . "\n";
} 