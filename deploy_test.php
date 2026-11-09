<?php
header('Content-Type: application/json');
echo json_encode([
    'status' => 'ok',
    'php_version' => PHP_VERSION,
    'current_dir' => __DIR__,
    'parent_dir' => dirname(__DIR__)
]);
