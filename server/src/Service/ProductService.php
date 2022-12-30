<?php

namespace Service;

use InvalidArgumentException;
use Repository\ProductRepository;
use Util\ConstantsUtil;

class ProductService
{
    public const TABLE = 'tb_products';
    public const GET_RESOURCES = ['get'];
    public const DELETE_RESOURCES = ['delete'];
    private array $data;
    private object $ProductRepository;

    /**
     * @param $data
     */
    public function __construct($data = [])
    {
        $this->data = $data;
        $this->ProductRepository = new ProductRepository()
;    }

    /**
     * @return mixed
     */
    public function validateGet()
    {
        $return = null;
        $resource = $this->data['resource'];

        if(in_array($resource, self::GET_RESOURCES, true)) {
            $return = $this->data['sku'] !== null ? $this->getOneByKey() : $this->$resource();
        } else {
            throw new InvalidArgumentException(ConstantsUtil::MSG_ERROR_RESOURCE_NOTFOUND);
        }

        if($return === null){
            throw new InvalidArgumentException(ConstantsUtil::MSG_ERROR_GENERIC);
        }

        return $return;
    }

    public function validateDelete()
    {
        $return = null;
        $resource = $this->data['resource'];

        if(in_array($resource, self::DELETE_RESOURCES, true)) {
            if($this->data['sku'] !== null){
                $return = $this->$resource();
            } else {
                throw new InvalidArgumentException(ConstantsUtil::MSG_ERROR_SKU_NECESSARY);
            }
        } else {
            throw new InvalidArgumentException(ConstantsUtil::MSG_ERROR_RESOURCE_NOTFOUND);
        }

        if($return === null){
            throw new InvalidArgumentException(ConstantsUtil::MSG_ERROR_GENERIC);
        }

        return $return;
    }

    private function getOneByKey()
    {
        return $this->ProductRepository->getMySQL()->getOneByKey(self::TABLE, $this->data['sku']);
    }

    private function get()
    {
        return $this->ProductRepository->getMySQL()->getAll(self::TABLE);
    }

    private function delete()
    {
        return $this->ProductRepository->getMySQL()->delete(self::TABLE, $this->data['sku']);
    }
}