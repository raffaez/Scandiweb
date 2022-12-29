<?php

namespace Validator;
use Util\ConstantsUtil;
use Util\JsonUtil;

class RequestValidator
{
    private string $request;
    private array $requestData;
    const GET = 'GET';
    const DELETE = 'DELETE';

    public function __construct($request)
    {
        $this->request = $request;
    }

    public function processRequest()
    {
        $return = utf8_encode(ConstantsUtil::MSG_ERROR_ROUTE_TYPE);

        $this->request['method'] = 'POST';
        if(in_array($this->request['method'], ConstantsUtil::TYPE_REQUEST, true)){
            $return = $this->directRequest();
        }

        return $return;
    }

    private function directRequest()
    {
        if($this->request['method'] !== self::GET && $this->request['method'] !== self::DELETE){
            $this->requestData = JsonUtil::handleRequestBodyJson();
        }
    }
}