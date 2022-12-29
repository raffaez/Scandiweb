<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ERROR);

define('HOST', 'localhost');
define('DATABASE', 'phpapidb');
define('USER', 'root');
define('PASSWORD', '');

define('DS', DIRECTORY_SEPARATOR);
define('DIR_APP', __DIR__);
define('DIR_PROJECT', 'ecommerce/server');

if(file_exists('autoload.php')){
    include 'autoload.php';
}else{
    echo "Could not include bootstrap";
    exit;
}