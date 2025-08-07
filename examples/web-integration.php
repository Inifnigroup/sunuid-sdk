<?php

require_once __DIR__ . '/../vendor/autoload.php';

use SunuID\SunuID;

// Configuration
$config = [
    'client_id' => '1754166754_221A57B46843D755',
    'secret_id' => '56d40fe70507228b27f2640ae65894177c2fedbf246e2b30978fde1fc43953c5',
    'type' => 2,
    'enable_logs' => true
];

$error = null;
$qrData = null;

try {
    $sunuid = new SunuID($config);
    $sunuid->init();
    
    // Générer un QR code
    $qrData = $sunuid->generateQR();
    
} catch (Exception $e) {
    $error = $e->getMessage();
}
?>

<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SunuID PHP SDK - Intégration Web</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 600px;
            margin: 50px auto;
            padding: 20px;
            text-align: center;
        }
        
        .qr-container {
            margin: 30px 0;
            padding: 20px;
            border: 2px dashed #ddd;
            border-radius: 10px;
            min-height: 300px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .qr-container img {
            max-width: 250px;
            border: 1px solid #ddd;
            border-radius: 5px;
        }
        
        .error {
            background: #ffebee;
            color: #c62828;
            padding: 15px;
            border-radius: 5px;
            margin: 20px 0;
        }
        
        .info {
            background: #e3f2fd;
            color: #1976d2;
            padding: 15px;
            border-radius: 5px;
            margin: 20px 0;
            text-align: left;
        }
        
        .success {
            background: #e8f5e8;
            color: #2e7d32;
            padding: 15px;
            border-radius: 5px;
            margin: 20px 0;
        }
    </style>
</head>
<body>
    <h1>🔐 SunuID PHP SDK</h1>
    <p>Exemple d'intégration web</p>
    
    <?php if ($error): ?>
        <div class="error">
            <h3>❌ Erreur</h3>
            <p><?php echo htmlspecialchars($error); ?></p>
        </div>
    <?php elseif ($qrData): ?>
        <div class="success">
            <h3>✅ QR Code généré avec succès</h3>
            <p>Scannez le QR code avec l'application SunuID</p>
        </div>
        
        <div class="qr-container">
            <img src="<?php echo htmlspecialchars($qrData['qr_code_url']); ?>" 
                 alt="QR Code SunuID" />
        </div>
        
        <div class="info">
            <h4>📋 Informations du QR Code</h4>
            <ul>
                <li><strong>Type:</strong> <?php echo htmlspecialchars($qrData['type']); ?></li>
                <li><strong>Partenaire:</strong> <?php echo htmlspecialchars($qrData['partner_name']); ?></li>
                <li><strong>Session ID:</strong> <?php echo htmlspecialchars($qrData['session_id']); ?></li>
                <li><strong>Label:</strong> <?php echo htmlspecialchars($qrData['label']); ?></li>
                <li><strong>Contenu:</strong> <code><?php echo htmlspecialchars($qrData['content']); ?></code></li>
            </ul>
        </div>
        
        <div class="info">
            <h4>🔄 Vérifier le statut</h4>
            <p>Session ID: <code><?php echo htmlspecialchars($qrData['session_id']); ?></code></p>
            <p>Utilisez cette session ID pour vérifier le statut du scan.</p>
        </div>
        
    <?php else: ?>
        <div class="error">
            <h3>⚠️ Aucune donnée</h3>
            <p>Aucun QR code n'a pu être généré.</p>
        </div>
    <?php endif; ?>
    
    <div style="margin-top: 40px; padding: 20px; background: #f5f5f5; border-radius: 5px;">
        <h4>📚 Documentation</h4>
        <p>Pour plus d'informations, consultez la documentation du SDK PHP SunuID.</p>
        <p><strong>Version:</strong> 1.0.0</p>
    </div>
</body>
</html> 