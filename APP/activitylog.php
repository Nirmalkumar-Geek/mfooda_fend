<?php

$logFile = '/var/log/apache2/access.log';
$lines = file($logFile);

$lastTenLines = array_slice($lines, -10);

foreach ($lastTenLines as $line) {
    
    echo $line . '<br>';
}

?>

