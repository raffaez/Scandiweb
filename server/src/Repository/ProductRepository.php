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
     * @return MySQL|object
     */
    public function getMySQL()
    {
        return $this->MySQL;
    }
}