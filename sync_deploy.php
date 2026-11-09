<?php
header('Content-Type: application/json');

$token = $_GET['token'] ?? '';
if ($token !== 'pz_deploy_20261109_secret') {
    http_response_code(403);
    echo json_encode(['error' => 'forbidden']);
    exit;
}

$sourceDir = __DIR__;
$targetDir = dirname(__DIR__);

function copyRecursive($src, $dst) {
    $dir = opendir($src);
    @mkdir($dst, 0755, true);
    $copied = [];
    while (false !== ($file = readdir($dir))) {
        if ($file === '.' || $file === '..') continue;
        if ($file === 'deploy_test.php' || $file === 'sync_deploy.php') continue;
        
        $srcPath = $src . '/' . $file;
        $dstPath = $dst . '/' . $file;
        
        if (is_dir($srcPath)) {
            $copied = array_merge($copied, copyRecursive($srcPath, $dstPath));
        } else {
            if (copy($srcPath, $dstPath)) {
                $copied[] = str_replace($targetDir . '/', '', $dstPath);
            }
        }
    }
    closedir($dir);
    return $copied;
}

// 1. Copy all project files to target
$copiedFiles = copyRecursive($sourceDir, $targetDir);

// 2. Also move .git directory to target so target becomes the Git repository
$srcGit = $sourceDir . '/.git';
$dstGit = $targetDir . '/.git';
$gitMoved = false;

if (is_dir($srcGit)) {
    // If dstGit already exists, remove it first
    if (is_dir($dstGit)) {
        // recursive delete dstGit
        $rdi = new RecursiveDirectoryIterator($dstGit, RecursiveDirectoryIterator::SKIP_DOTS);
        $rii = new RecursiveIteratorIterator($rdi, RecursiveIteratorIterator::CHILD_FIRST);
        foreach ($rii as $file) {
            $file->isDir() ? rmdir($file->getRealPath()) : unlink($file->getRealPath());
        }
        rmdir($dstGit);
    }
    $gitMoved = rename($srcGit, $dstGit);
}

// 3. Remove site_repo leftovers
function deleteRecursive($dir) {
    if (!is_dir($dir)) return;
    $items = scandir($dir);
    foreach ($items as $item) {
        if ($item === '.' || $item === '..') continue;
        $path = $dir . '/' . $item;
        is_dir($path) ? deleteRecursive($path) : unlink($path);
    }
    rmdir($dir);
}

// Clean up self and deploy_test.php in target if copied
@unlink($targetDir . '/deploy_test.php');
@unlink($targetDir . '/sync_deploy.php');

echo json_encode([
    'success' => true,
    'git_moved' => $gitMoved,
    'copied_count' => count($copiedFiles),
    'sample_copied' => array_slice($copiedFiles, 0, 15)
]);

// Register shutdown function to remove site_repo after response is sent
register_shutdown_function(function() use ($sourceDir) {
    deleteRecursive($sourceDir);
});
