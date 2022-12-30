<?php

namespace Service;

use InvalidArgumentException;
use Repository\ProductRepository;
use Util\ConstantsUtil;

class ProductService
{
    public const TABLE = 'tb_products';
    public const GET_RESOURCES = ['get'];
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

    private function getOneByKey()
    {
        return $this->ProductRepository->getMySQL()->getOneByKey(self::TABLE, $this->data['sku']);
    }

    private function get()
    {
        return $this->ProductRepository->getMySQL()->getAll(self::TABLE);
    }
}