<?php

use Util\ConstantsUtil;
use Util\JsonUtil;
use Validator\RequestValidator;

include 'bootstrap.php';


try {
    $RequestValidator = new RequestValidator(\Util\RoutesUtil::getRoutes());
    $return = $RequestValidator->processRequest();

    $JsonUtil = new JsonUtil();
    $JsonUtil->handleReturnArray($return);
} catch (Exception $e) {
    echo json_encode([
        ConstantsUtil::TYPE => ConstantsUtil::TYPE_ERROR,
        ConstantsUtil::RESPONSE => utf8_encode($e->getMessage())
    ]);
    exit;
}