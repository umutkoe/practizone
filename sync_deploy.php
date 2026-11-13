<?php
header('Content-Type: application/json');

$token = $_GET['token'] ?? '';
if ($token !== 'pz_deploy_20261113_secret') {
    http_response_code(403);
    echo json_encode(['error' => 'forbidden']);
    exit;
}

$sourceDir = __DIR__;
$targetDir = dirname(__DIR__);

function copyRecursive($src, $dst, $targetRoot) {
    $dir = opendir($src);
    @mkdir($dst, 0755, true);
    $copied = [];
    while (false !== ($file = readdir($dir))) {
        if ($file === '.' || $file === '..') continue;
        if ($file === '.git' || $file === 'sync_deploy.php') continue;
        
        $srcPath = $src . '/' . $file;
        $dstPath = $dst . '/' . $file;
        
        if (is_dir($srcPath)) {
            $copied = array_merge($copied, copyRecursive($srcPath, $dstPath, $targetRoot));
        } else {
            if (copy($srcPath, $dstPath)) {
                $copied[] = str_replace($targetRoot . '/', '', $dstPath);
            }
        }
    }
    closedir($dir);
    return $copied;
}

$copiedFiles = copyRecursive($sourceDir, $targetDir, $targetDir);

// Delete sync_deploy.php from site_repo
@unlink(__FILE__);

echo json_encode([
    'success' => true,
    'copied_count' => count($copiedFiles),
    'sample_copied' => array_slice($copiedFiles, 0, 25)
]);
