<?php

use Util\ConstantsUtil;
use Util\JsonUtil;
use Util\RoutesUtil;
use Validator\RequestValidator;

include 'bootstrap.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

try {
    $RequestValidator = new RequestValidator(RoutesUtil::getRoutes());
    $return = $RequestValidator->processRequest();

    $JsonUtil = new JsonUtil();
    $JsonUtil->handleReturnArray($return);
} catch (Exception $e) {
    echo json_encode([
        ConstantsUtil::TYPE => ConstantsUtil::TYPE_ERROR,
        ConstantsUtil::RESPONSE => utf8_encode($e->getMessage())
    ], JSON_THROW_ON_ERROR);
    exit;
}