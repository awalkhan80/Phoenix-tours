<?php
/**
 * Phoenix Travel & Tours - SEO & AEO Management API (MySQL Backend)
 * Domain: https://desertsafaridxbpro.com
 * WhatsApp: +971561505270
 */

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once __DIR__ . '/db_connect.php';

$pdo = Database::getConnection();
$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    if (!$pdo) {
        echo json_encode(['status' => 'fallback', 'message' => 'DB not connected', 'data' => []]);
        exit();
    }

    try {
        $slug = $_GET['slug'] ?? null;
        if ($slug) {
            $stmt = $pdo->prepare("SELECT * FROM pages_seo WHERE slug = ? LIMIT 1");
            $stmt->execute([$slug]);
            $seo = $stmt->fetch();

            $aeoStmt = $pdo->prepare("SELECT * FROM aeo_answers WHERE page_slug = ? ORDER BY display_order ASC");
            $aeoStmt->execute([$slug]);
            $aeo = $aeoStmt->fetchAll();

            $faqStmt = $pdo->prepare("SELECT * FROM faqs WHERE page_slug = ? ORDER BY display_order ASC");
            $faqStmt->execute([$slug]);
            $faqs = $faqStmt->fetchAll();

            echo json_encode([
                'status' => 'success',
                'data' => [
                    'seo' => $seo,
                    'aeo' => $aeo,
                    'faqs' => $faqs
                ]
            ]);
        } else {
            $stmt = $pdo->query("SELECT * FROM pages_seo ORDER BY sitemap_priority DESC");
            $allSeo = $stmt->fetchAll();
            echo json_encode(['status' => 'success', 'data' => $allSeo]);
        }
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
    }
    exit();
}

if ($method === 'POST') {
    if (!$pdo) {
        http_response_code(503);
        echo json_encode(['status' => 'error', 'message' => 'Database unavailable']);
        exit();
    }

    $input = json_decode(file_get_contents('php://input'), true);
    if (!$input || empty($input['slug'])) {
        http_response_code(400);
        echo json_encode(['status' => 'error', 'message' => 'Page slug is required']);
        exit();
    }

    try {
        $sql = "INSERT INTO pages_seo (slug, page_path, canonical_url, seo_title, meta_description, primary_h1, primary_keyword, search_intent, sitemap_priority)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
                ON DUPLICATE KEY UPDATE
                    page_path = VALUES(page_path),
                    canonical_url = VALUES(canonical_url),
                    seo_title = VALUES(seo_title),
                    meta_description = VALUES(meta_description),
                    primary_h1 = VALUES(primary_h1),
                    primary_keyword = VALUES(primary_keyword),
                    search_intent = VALUES(search_intent),
                    sitemap_priority = VALUES(sitemap_priority)";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([
            $input['slug'],
            $input['page_path'] ?? '/' . $input['slug'],
            $input['canonical_url'] ?? ('https://desertsafaridxbpro.com/' . $input['slug']),
            $input['seo_title'] ?? '',
            $input['meta_description'] ?? '',
            $input['primary_h1'] ?? '',
            $input['primary_keyword'] ?? '',
            $input['search_intent'] ?? 'COMMERCIAL_INVESTIGATION',
            $input['sitemap_priority'] ?? 0.80
        ]);

        echo json_encode(['status' => 'success', 'message' => 'SEO metadata saved successfully']);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
    }
    exit();
}
