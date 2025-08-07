<?php

namespace SunuID\Tests;

use PHPUnit\Framework\TestCase;
use SunuID\SunuID;
use SunuID\Exception\SunuIDException;

class SunuIDTest extends TestCase
{
    private array $config;

    protected function setUp(): void
    {
        $this->config = [
            'client_id' => 'test_client_id',
            'secret_id' => 'test_secret_id',
            'type' => 2,
            'enable_logs' => false
        ];
    }

    public function testConstructor()
    {
        $sunuid = new SunuID($this->config);
        
        $this->assertInstanceOf(SunuID::class, $sunuid);
        $this->assertFalse($sunuid->isInitialized());
    }

    public function testInvalidConfig()
    {
        $this->expectException(SunuIDException::class);
        
        $invalidConfig = [
            'type' => 2
            // client_id et secret_id manquants
        ];
        
        $sunuid = new SunuID($invalidConfig);
        $sunuid->init();
    }

    public function testInvalidType()
    {
        $this->expectException(SunuIDException::class);
        
        $invalidConfig = [
            'client_id' => 'test_client_id',
            'secret_id' => 'test_secret_id',
            'type' => 999 // Type invalide
        ];
        
        $sunuid = new SunuID($invalidConfig);
        $sunuid->init();
    }

    public function testGetConfig()
    {
        $sunuid = new SunuID($this->config);
        $config = $sunuid->getConfig();
        
        $this->assertArrayHasKey('client_id', $config);
        $this->assertArrayHasKey('secret_id', $config);
        $this->assertArrayHasKey('type', $config);
        $this->assertEquals('test_client_id', $config['client_id']);
        $this->assertEquals('test_secret_id', $config['secret_id']);
        $this->assertEquals(2, $config['type']);
    }

    public function testGenerateQRLocal()
    {
        $sunuid = new SunuID($this->config);
        
        $content = 'test_content_' . time();
        $result = $sunuid->generateQRLocal($content, [
            'size' => 300,
            'margin' => 10,
            'label' => 'Test QR Code'
        ]);
        
        $this->assertArrayHasKey('success', $result);
        $this->assertArrayHasKey('qr_code_url', $result);
        $this->assertArrayHasKey('content', $result);
        $this->assertArrayHasKey('session_id', $result);
        $this->assertArrayHasKey('generated_locally', $result);
        
        $this->assertTrue($result['success']);
        $this->assertEquals($content, $result['content']);
        $this->assertTrue($result['generated_locally']);
        $this->assertStringStartsWith('data:image/png;base64,', $result['qr_code_url']);
    }

    public function testGetTypeName()
    {
        $sunuid = new SunuID($this->config);
        
        // Test avec reflection pour accéder à la méthode privée
        $reflection = new \ReflectionClass($sunuid);
        $method = $reflection->getMethod('getTypeName');
        $method->setAccessible(true);
        
        $this->assertEquals('KYC', $method->invoke($sunuid, 1));
        $this->assertEquals('AUTH', $method->invoke($sunuid, 2));
        $this->assertEquals('SIGNATURE', $method->invoke($sunuid, 3));
        $this->assertEquals('TYPE-999', $method->invoke($sunuid, 999));
    }

    public function testGenerateSessionCode()
    {
        $sunuid = new SunuID($this->config);
        
        $reflection = new \ReflectionClass($sunuid);
        $method = $reflection->getMethod('generateSessionCode');
        $method->setAccessible(true);
        
        $code1 = $method->invoke($sunuid);
        $code2 = $method->invoke($sunuid);
        
        $this->assertNotEquals($code1, $code2);
        $this->assertNotEmpty($code1);
        $this->assertNotEmpty($code2);
    }

    public function testGetLogger()
    {
        $sunuid = new SunuID($this->config);
        $logger = $sunuid->getLogger();
        
        $this->assertInstanceOf(\Monolog\Logger::class, $logger);
    }
} 