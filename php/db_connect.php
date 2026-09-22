<?php
/**
 * Phoenix Travel & Tours - Enterprise Database Connection
 * Domain: https://desertsafaridxbpro.com
 * Head Office: Office 701, XL Tower, Business Bay, Dubai, UAE
 * WhatsApp: +971561505270
 */

class Database {
    private static $host = 'localhost';
    private static $db_name = 'phoenix_tours';
    private static $username = 'root';
    private static $password = '';
    private static $pdo = null;

    public static function getConnection() {
        if (self::$pdo === null) {
            // Load credentials from environment if available
            $host = getenv('DB_HOST') ?: self::$host;
            $db_name = getenv('DB_NAME') ?: self::$db_name;
            $user = getenv('DB_USER') ?: self::$username;
            $pass = getenv('DB_PASS') !== false ? getenv('DB_PASS') : self::$password;

            try {
                $dsn = "mysql:host={$host};dbname={$db_name};charset=utf8mb4";
                $options = [
                    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                    PDO::ATTR_EMULATE_PREPARES => false,
                ];
                self::$pdo = new PDO($dsn, $user, $pass, $options);
            } catch (PDOException $e) {
                // If connection fails, log error
                error_log("Database connection failed: " . $e->getMessage());
                return null;
            }
        }
        return self::$pdo;
    }
}
