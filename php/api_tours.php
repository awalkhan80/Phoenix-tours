<?php
/**
 * Phoenix Travel & Tours - Tours API (MySQL Backend)
 * Domain: https://desertsafaridxbpro.com
 * WhatsApp: +971561505270
 */

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once __DIR__ . '/db_connect.php';

$pdo = Database::getConnection();
$method = $_SERVER['REQUEST_METHOD'];

// Handle GET: List all tours or get single tour by ID
if ($method === 'GET') {
    if (!$pdo) {
        // Return JSON fallback if DB is not connected
        echo json_encode([
            'status' => 'fallback',
            'message' => 'Database connection not initialized. Using default schema.',
            'data' => []
        ]);
        exit();
    }

    try {
        $id = $_GET['id'] ?? null;
        if ($id) {
            $stmt = $pdo->prepare("SELECT * FROM tours WHERE id = ? LIMIT 1");
            $stmt->execute([$id]);
            $tour = $stmt->fetch();
            if ($tour) {
                echo json_encode(['status' => 'success', 'data' => $tour]);
            } else {
                http_response_code(404);
                echo json_encode(['status' => 'error', 'message' => 'Tour not found']);
            }
        } else {
            $stmt = $pdo->query("SELECT * FROM tours ORDER BY is_active DESC, starting_price ASC");
            $tours = $stmt->fetchAll();
            echo json_encode(['status' => 'success', 'data' => $tours]);
        }
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
    }
    exit();
}

// Handle POST: Create or Update Tour
if ($method === 'POST') {
    if (!$pdo) {
        http_response_code(503);
        echo json_encode(['status' => 'error', 'message' => 'Database unavailable']);
        exit();
    }

    $input = json_decode(file_get_contents('php://input'), true);
    if (!$input || empty($input['name'])) {
        http_response_code(400);
        echo json_encode(['status' => 'error', 'message' => 'Invalid tour payload']);
        exit();
    }

    $id = $input['id'] ?? strtolower(preg_replace('/[^a-z0-9]+/i', '-', trim($input['name'])));
    $name = $input['name'];
    $category = $input['category'] ?? 'safari';
    $headline = $input['headline'] ?? $name;
    $description = $input['description'] ?? '';
    $starting_price = floatval($input['starting_price'] ?? ($input['packages'][0]['price'] ?? 0));
    $currency = 'AED';
    $duration = $input['duration'] ?? 'Dubai';
    $image_url = $input['image'] ?? ($input['image_url'] ?? 'hero.jpg');
    $pickup_type = $input['pickup_type'] ?? 'Hotel Pickup Included';
    $is_active = isset($input['active']) ? ($input['active'] ? 1 : 0) : 1;

    try {
        $sql = "INSERT INTO tours (id, name, category, headline, description, starting_price, currency, duration, image_url, pickup_type, is_active)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                ON DUPLICATE KEY UPDATE
                    name = VALUES(name),
                    category = VALUES(category),
                    headline = VALUES(headline),
                    description = VALUES(description),
                    starting_price = VALUES(starting_price),
                    duration = VALUES(duration),
                    image_url = VALUES(image_url),
                    pickup_type = VALUES(pickup_type),
                    is_active = VALUES(is_active)";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([
            $id, $name, $category, $headline, $description, $starting_price, $currency, $duration, $image_url, $pickup_type, $is_active
        ]);

        echo json_encode(['status' => 'success', 'message' => 'Tour saved successfully', 'id' => $id]);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
    }
    exit();
}

// Handle DELETE
if ($method === 'DELETE') {
    if (!$pdo) {
        http_response_code(503);
        echo json_encode(['status' => 'error', 'message' => 'Database unavailable']);
        exit();
    }

    $id = $_GET['id'] ?? null;
    if (!$id) {
        http_response_code(400);
        echo json_encode(['status' => 'error', 'message' => 'Tour ID is required']);
        exit();
    }

    try {
        $stmt = $pdo->prepare("DELETE FROM tours WHERE id = ?");
        $stmt->execute([$id]);
        echo json_encode(['status' => 'success', 'message' => 'Tour removed']);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
    }
    exit();
}
