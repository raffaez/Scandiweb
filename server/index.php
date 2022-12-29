<?php

use Validator\RequestValidator;

include 'bootstrap.php';


try {
    $RequestValidator = new RequestValidator(\Util\RoutesUtil::getRoutes());
    $return = $RequestValidator->processRequest();
} catch (Exception $e) {
    echo $e->getMessage();
}