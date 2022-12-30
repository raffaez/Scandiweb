<?php

namespace Repository;

use DB\MySQL;

class ProductRepository
{
    private object $MySQL;
    public const TABLE = "tb_products";

    /**
     * ProductRepository constructor
     */
    public function __construct()
    {
        $this->MySQL = new MySQL();
    }

    /**
     * @param $sku
     * @param $name
     * @param $price
     * @param $type
     * @return int
     */
    public function insertProduct($sku, $name, $price, $type){
        $queryInsert = "INSERT INTO " . self::TABLE . " (sku, name, price, type) VALUES (:sku, :name, :price, :type)";
        $this->MySQL->getDb()->beginTransaction();
        $stmt = $this->MySQL->getDb()->prepare($queryInsert);
        $stmt->bindParam(":sku", $sku);
        $stmt->bindParam(":name", $name);
        $stmt->bindParam(":price", $price);
        $stmt->bindParam(":type", $type);
        $stmt->execute();

        return $stmt->rowCount();
    }

    /**
     * @return MySQL|object
     */
    public function getMySQL()
    {
        return $this->MySQL;
    }
}