<?php

namespace Validator;
use InvalidArgumentException;
use Service\ProductService;
use Util\ConstantsUtil;
use Util\JsonUtil;

class RequestValidator
{
    private $request;
    private $requestData = [];
    const GET = 'GET';
    const DELETE = 'DELETE';
    const PRODUCTS = 'PRODUCTS';

    /**
     * @param $request
     */
    public function __construct($request)
    {
        $this->request = $request;
    }

    /**
     * @return mixed|string
     */
    public function processRequest()
    {
        $return = utf8_encode(ConstantsUtil::MSG_ERROR_ROUTE_TYPE);

        if(in_array($this->request['method'], ConstantsUtil::TYPE_REQUEST, true)){
            $return = $this->directRequest();
        }

        return $return;
    }

    /**
     * @return mixed
     */
    private function directRequest()
    {
        if($this->request['method'] !== self::GET){
            $this->requestData = JsonUtil::handleRequestBodyJson();
        }

        $resource = $this->request['resource'];
        return $this->$resource();
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

    /**
     * @return mixed|string
     */
    private function delete()
    {
        $return = utf8_encode(ConstantsUtil::MSG_ERROR_ROUTE_TYPE);
        if(in_array($this->request['route'], ConstantsUtil::TYPE_DELETE, true)){
            switch ($this->request['route']){
                case self::PRODUCTS:
                    $ProductService = new ProductService($this->request);
                    $ProductService->setDataRequestBody($this->requestData);
                    $return = $ProductService->validateDelete();
                    break;
                default:
                    throw new InvalidArgumentException(ConstantsUtil::MSG_ERROR_RESOURCE_NOTFOUND);
            }
        }

        return $return;
    }

    /**
     * @return mixed|string
     */
    private function post()
    {
        $return = utf8_encode(ConstantsUtil::MSG_ERROR_ROUTE_TYPE);
        if(in_array($this->request['route'], ConstantsUtil::TYPE_POST, true)){
            switch ($this->request['route']){
                case self::PRODUCTS:
                    $ProductService = new ProductService($this->request);
                    $ProductService->setDataRequestBody($this->requestData);
                    $return = $ProductService->validatePost();
                    break;
                default:
                    throw new InvalidArgumentException(ConstantsUtil::MSG_ERROR_RESOURCE_NOTFOUND);
            }
        }

        return $return;
    }

    /**
     * @return mixed|string
     */
    private function put()
    {
        $return = utf8_encode(ConstantsUtil::MSG_ERROR_ROUTE_TYPE);
        if(in_array($this->request['route'], ConstantsUtil::TYPE_PUT, true)){
            switch ($this->request['route']){
                case self::PRODUCTS:
                    $ProductService = new ProductService($this->request);
                    $ProductService->setDataRequestBody($this->requestData);
                    $return = $ProductService->validatePut();
                    break;
                default:
                    throw new InvalidArgumentException(ConstantsUtil::MSG_ERROR_RESOURCE_NOTFOUND);
            }
        }

        return $return;
    }
}