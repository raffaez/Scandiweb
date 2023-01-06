<?php

namespace Util;


use InvalidArgumentException;

class JsonUtil
{
    /**
     * @param $return
     * @return void
     */
    public function handleReturnArray($return)
    {
        $data = [];
        $data[ConstantsUtil::TYPE] = ConstantsUtil::TYPE_ERROR;

        if((is_array($return) && count($return) > 0) || strlen($return) > 10){
            $data[ConstantsUtil::TYPE] = ConstantsUtil::TYPE_SUCCESS;
            $data[ConstantsUtil::RESPONSE] = $return;
        }

        $this->returnJson($data);
    }

    /**
     * @param $json
     * @return void
     */
    private function returnJson($json)
    {
        header('Content-Type: application/json');
        header('Cache-Control: no-cache, no-store, must-revalidate');
        header('Access-Control-Allow-Methods: GET,POST,PUT,DELETE');
        header('Access-Control-Allow-Origin: *');
        echo json_encode($json);
        exit;
    }

    /**
     * @return array|void
     */
    public static function handleRequestBodyJson()
    {
        try {
            $postJson = json_decode(file_get_contents('php://input'), true);
        } catch (\JsonException $e) {
            throw new InvalidArgumentException(ConstantsUtil::MSG_ERROR_EMPTY_JSON);
        }

        if(is_array($postJson) && count($postJson) > 0){
            return $postJson;
        }
    }
}