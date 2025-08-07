<?php

namespace SunuID\Exception;

/**
 * Exception spécifique au SDK SunuID
 */
class SunuIDException extends \Exception
{
    /**
     * Code d'erreur
     */
    private string $errorCode;

    /**
     * Données supplémentaires
     */
    private array $context;

    /**
     * Constructeur
     */
    public function __construct(string $message, string $errorCode = 'UNKNOWN_ERROR', array $context = [], int $code = 0, \Throwable $previous = null)
    {
        parent::__construct($message, $code, $previous);
        $this->errorCode = $errorCode;
        $this->context = $context;
    }

    /**
     * Obtenir le code d'erreur
     */
    public function getErrorCode(): string
    {
        return $this->errorCode;
    }

    /**
     * Obtenir le contexte
     */
    public function getContext(): array
    {
        return $this->context;
    }

    /**
     * Exception de configuration invalide
     */
    public static function invalidConfig(string $message, array $context = []): self
    {
        return new self($message, 'INVALID_CONFIG', $context);
    }

    /**
     * Exception d'initialisation échouée
     */
    public static function initializationFailed(string $message, array $context = []): self
    {
        return new self($message, 'INITIALIZATION_FAILED', $context);
    }

    /**
     * Exception d'API
     */
    public static function apiError(string $message, array $context = []): self
    {
        return new self($message, 'API_ERROR', $context);
    }

    /**
     * Exception de QR code
     */
    public static function qrCodeError(string $message, array $context = []): self
    {
        return new self($message, 'QR_CODE_ERROR', $context);
    }

    /**
     * Exception d'authentification
     */
    public static function authenticationError(string $message, array $context = []): self
    {
        return new self($message, 'AUTHENTICATION_ERROR', $context);
    }

    /**
     * Exception de réseau
     */
    public static function networkError(string $message, array $context = []): self
    {
        return new self($message, 'NETWORK_ERROR', $context);
    }
} 