<?php

namespace DB;

use InvalidArgumentException;
use PDO;
use PDOException;
use Util\ConstantesGenericasUtil;
use Util\ConstantsUtil;

class MySQL
{
    private object $db;

    /**
     * MySQL constructor.
     */
    public function __construct()
    {
        $this->db = $this->setDB();
    }

    /**
     * @return PDO
     */
    public function setDB(): PDO
    {
        try {
            return new PDO(
                'mysql:host=' . HOST . '; dbname=' . DATABASE . ';', USER, PASSWORD
            );
        } catch (PDOException $exception) {
            throw new PDOException($exception->getMessage());
        }
    }

    /**
     * @param $table
     * @param $sku
     * @return string
     */
    public function delete($table, $sku): string
    {
        $queryDelete = 'DELETE FROM ' . $table . ' WHERE sku = :sku';
        if ($table && $sku) {
            $this->db->beginTransaction();
            $stmt = $this->db->prepare($queryDelete);
            $stmt->bindParam(':sku', $sku);
            $stmt->execute();
            if ($stmt->rowCount() > 0) {
                $this->db->commit();
                return ConstantsUtil::MSG_SUCCESS_DELETE;
            }
            $this->db->rollBack();
            throw new InvalidArgumentException(ConstantsUtil::MSG_ERROR_NO_RETURN);
        }
        throw new InvalidArgumentException(ConstantsUtil::MSG_ERROR_GENERIC);
    }

    /**
     * @param $table
     * @return array
     */
    public function getAll($table): array
    {
        if ($table) {
            $query = 'SELECT * FROM ' . $table;
            $stmt = $this->db->query($query);
            $result = $stmt->fetchAll($this->db::FETCH_ASSOC);
            if (is_array($result) && count($result) > 0) {
                return $result;
            }
        }
        throw new InvalidArgumentException(ConstantsUtil::MSG_ERROR_NO_RETURN);
    }

    /**
     * @param $table
     * @param $sku
     * @return mixed
     */
    public function getOneByKey($table, $sku)
    {
        if ($table && $sku) {
            $query = 'SELECT * FROM ' . $table . ' WHERE sku = :sku';
            $stmt = $this->db->prepare($query);
            $stmt->bindParam(':sku', $sku);
            $stmt->execute();
            $totalResult = $stmt->rowCount();
            if ($totalResult === 1) {
                return $stmt->fetch($this->db::FETCH_ASSOC);
            }
            throw new InvalidArgumentException(ConstantsUtil::MSG_ERROR_NO_RETURN);
        }

        throw new InvalidArgumentException(ConstantsUtil::MSG_ERROR_SKU_NECESSARY);
    }

    /**
     * @return object|PDO
     */
    public function getDb()
    {
        return $this->db;
    }
}