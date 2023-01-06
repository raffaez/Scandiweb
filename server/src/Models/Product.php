<?php

namespace Models;

use Repository\ProductRepository;

abstract class Product implements Validate
{
    private const TABLE = 'tb_products';
    private const TYPES = ['BK', 'DC', 'FN'];
    private object $ProductRepository;
    public function __construct($input)
    {
        $this->ProductRepository = new ProductRepository();

        $this->sku = $input['sku'];
        $this->name = $input['name'];
        $this->price = $input['price'];
        $this->type = $input['type'];
        $this->attribute = $input['attribute'];
    }

    private function findBySku(string $sku){
        return $this->ProductRepository->getMySQL()->getOneByKey(self::TABLE, $sku);
    }
    public function validateSKU()
    {
        return (
            strlen($this->sku) > 0 && !$this->findBySku($this->sku)
        );
    }

    public function validateName()
    {
        return (
            strlen($this->name) > 0
        );
    }

    public function validatePrice()
    {
        return (
            is_numeric($this->price) && floatval($this->price) > 0
        );
    }

    public function validateType()
    {
        return (
            strlen($this->type) > 0 && in_array($this->type, self::TYPES)
        );
    }
}