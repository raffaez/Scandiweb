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
    public function insertProduct(array $product): int
    {
        $queryInsert = "INSERT INTO "
                            . self::TABLE .
                            " (sku, name, price, type, attribute) 
                        VALUES 
                            (:sku, :name, :price, :type, :attribute)";
        $this->MySQL->getDb()->beginTransaction();
        $stmt = $this->MySQL->getDb()->prepare($queryInsert);
        $stmt->bindParam(":sku", $product["sku"]);
        $stmt->bindParam(":name", $product["name"]);
        $stmt->bindParam(":price", $product["price"]);
        $stmt->bindParam(":type", $product["type"]);
        $stmt->bindParam(":attribute", $product["attribute"]);

        $stmt->execute();

        return $stmt->rowCount();
    }

    /**
     * @param $sku
     * @param $data
     * @return int
     */
    public function updateProduct(string $sku, array $product): int
    {
        $queryUpdate = "UPDATE "
                            . self::TABLE .
                        " SET 
                            name = :name,
                            price = :price,
                            size = :size,
                            weight = :weight,
                            dimensions = :dimensions
                            
                        WHERE 
                            sku = :sku";
        $this->MySQL->getDb()->beginTransaction();
        $stmt = $this->MySQL->getDb()->prepare($queryUpdate);
        $stmt->bindParam(":sku", $sku);
        $stmt->bindParam(":name", $product["name"]);
        $stmt->bindParam(":price", $product["price"]);
        $stmt->bindParam(":size", $product["size"]);
        $stmt->bindParam(":weight", $product["weight"]);
        $stmt->bindParam(":dimensions", $product["dimensions"]);

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