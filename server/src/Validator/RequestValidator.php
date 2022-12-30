<?php

namespace Validator;
use InvalidArgumentException;
use Service\ProductService;
use Util\ConstantsUtil;
use Util\JsonUtil;

class RequestValidator
{
    private $request;
    private $requestData;
    const GET = 'GET';
    const DELETE = 'DELETE';
    const PRODUCTS = 'PRODUCTS';

    public function __construct($request)
    {
        $this->request = $request;
    }

    public function processRequest()
    {
        $return = utf8_encode(ConstantsUtil::MSG_ERROR_ROUTE_TYPE);

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

        $method = $this->request['method'];
        return $this->$method();
    }

    /**
     * @return mixed|string
     */
    private function get()
    {
         $return = utf8_encode(ConstantsUtil::MSG_ERROR_ROUTE_TYPE);
         if(in_array($this->request['route'], ConstantsUtil::TYPE_GET, true)){
             switch ($this->request['route']){
                 case self::PRODUCTS:
                     $ProductService = new ProductService($this->request);
                     $return = $ProductService->validateGet();
                     break;
                 default:
                     throw new InvalidArgumentException(ConstantsUtil::MSG_ERROR_RESOURCE_NOTFOUND);
             }
         }

         return $return;
    }

    private function delete()
    {
        $return = utf8_encode(ConstantsUtil::MSG_ERROR_ROUTE_TYPE);
        if(in_array($this->request['route'], ConstantsUtil::TYPE_DELETE, true)){
            switch ($this->request['route']){
                case self::PRODUCTS:
                    $ProductService = new ProductService($this->request);
                    $return = $ProductService->validateDelete();
                    break;
                default:
                    throw new InvalidArgumentException(ConstantsUtil::MSG_ERROR_RESOURCE_NOTFOUND);
            }
        }

        return $return;
    }
}