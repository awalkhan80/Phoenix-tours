<?php
/**
 * Phoenix Travel & Tours - Bookings API (MySQL Backend)
 * Domain: https://desertsafaridxbpro.com
 * WhatsApp: +971561505270
 */

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once __DIR__ . '/db_connect.php';

$pdo = Database::getConnection();

// Ensure bookings table exists
if ($pdo) {
    $pdo->exec("CREATE TABLE IF NOT EXISTS `bookings` (
      `id` VARCHAR(50) PRIMARY KEY,
      `name` VARCHAR(150) NOT NULL,
      `phone` VARCHAR(50) NOT NULL,
      `email` VARCHAR(150) DEFAULT NULL,
      `tour_name` VARCHAR(200) NOT NULL,
      `package_name` VARCHAR(150) DEFAULT NULL,
      `quantity` INT NOT NULL DEFAULT 1,
      `booking_date` VARCHAR(50) NOT NULL,
      `time_slot` VARCHAR(50) DEFAULT 'Standard',
      `pickup_location` TEXT DEFAULT NULL,
      `total_price` DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
      `status` ENUM('New', 'Confirmed', 'Completed', 'Cancelled') NOT NULL DEFAULT 'New',
      `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4");
}

$method = $_SERVER['REQUEST_METHOD'];

// Handle GET: Retrieve bookings for admin dashboard
if ($method === 'GET') {
    if (!$pdo) {
        echo json_encode(['status' => 'fallback', 'message' => 'DB not connected', 'data' => []]);
        exit();
    }

    try {
        $stmt = $pdo->query("SELECT * FROM bookings ORDER BY created_at DESC LIMIT 200");
        $rows = $stmt->fetchAll();
        $formatted = array_map(function($r) {
            return [
                'id' => $r['id'],
                'createdAt' => $r['created_at'],
                'name' => $r['name'],
                'phone' => $r['phone'],
                'email' => $r['email'],
                'tour' => $r['tour_name'],
                'package' => $r['package_name'],
                'quantity' => intval($r['quantity']),
                'date' => $r['booking_date'],
                'time' => $r['time_slot'],
                'pickup' => $r['pickup_location'],
                'total' => floatval($r['total_price']),
                'status' => $r['status']
            ];
        }, $rows);
        echo json_encode(['status' => 'success', 'data' => $formatted]);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
    }
    exit();
}

// Handle POST: Create booking or update status
if ($method === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    if (!$input || empty($input['phone'])) {
        http_response_code(400);
        echo json_encode(['status' => 'error', 'message' => 'Phone number is required']);
        exit();
    }

    $id = $input['id'] ?? ('PX-' . strtoupper(substr(uniqid(), -8)));
    $name = $input['name'] ?? 'Customer';
    $phone = $input['phone'];
    $email = $input['email'] ?? null;
    $tour = $input['tour'] ?? ($input['tour_name'] ?? 'Dubai Desert Safari');
    $package = $input['package'] ?? ($input['package_name'] ?? 'Standard');
    $quantity = intval($input['quantity'] ?? 1);
    $date = $input['date'] ?? date('Y-m-d');
    $time = $input['time'] ?? 'To confirm';
    $pickup = $input['pickup'] ?? ($input['pickup_location'] ?? 'Hotel in Dubai');
    $total = floatval($input['total'] ?? ($input['total_price'] ?? 0));
    $status = $input['status'] ?? 'New';

    if ($pdo) {
        try {
            $sql = "INSERT INTO bookings (id, name, phone, email, tour_name, package_name, quantity, booking_date, time_slot, pickup_location, total_price, status)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                    ON DUPLICATE KEY UPDATE
                        status = VALUES(status),
                        total_price = VALUES(total_price)";
            $stmt = $pdo->prepare($sql);
            $stmt->execute([$id, $name, $phone, $email, $tour, $package, $quantity, $date, $time, $pickup, $total, $status]);
        } catch (PDOException $e) {
            error_log("Failed to insert booking: " . $e->getMessage());
        }
    }

    // Build WhatsApp direct message link
    $waText = "New Tour Reservation:\n"
            . "Booking ID: {$id}\n"
            . "Name: {$name}\n"
            . "Phone: {$phone}\n"
            . "Tour: {$tour}\n"
            . "Package: {$package}\n"
            . "Guests/Qty: {$quantity}\n"
            . "Date: {$date}\n"
            . "Total: AED " . number_format($total, 2) . "\n"
            . "Payment: Pay on Arrival";
    $waLink = "https://wa.me/971561505270?text=" . urlencode($waText);

    echo json_encode([
        'status' => 'success',
        'message' => 'Booking registered successfully',
        'id' => $id,
        'whatsapp_url' => $waLink
    ]);
    exit();
}
