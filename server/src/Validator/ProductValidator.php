<?php

namespace Validator;

use InvalidArgumentException;
use Models\Book;
use Models\Disc;
use Models\Furniture;
use Models\Validate;
use Util\ConstantsUtil;

class ProductValidator
{

    private array $dataRequestBody;

    public function __construct(array $dataRequestBody)
    {
        $this->dataRequestBody = $dataRequestBody;

        switch($this->dataRequestBody['type']){
            case 'BK':
                $this->validate(new Book($this->dataRequestBody));
                break;
            case 'DC':
                $this->validate(new Disc($this->dataRequestBody));
                break;
            case 'FN':
                $this->validate(new Furniture($this->dataRequestBody));
                break;
        }
    }

    private function validate(Validate $product): Validate
    {
        if(!$product->validateSKU()){
            throw new InvalidArgumentException(ConstantsUtil::MSG_ERROR_INVALID_SKU);
        }
        if(!$product->validateName()){
            throw new InvalidArgumentException(ConstantsUtil::MSG_ERROR_INVALID_NAME);
        }
        if(!$product->validatePrice()){
            throw new InvalidArgumentException(ConstantsUtil::MSG_ERROR_INVALID_PRICE);
        }
        if(!$product->validateType()){
            throw new InvalidArgumentException(ConstantsUtil::MSG_ERROR_INVALID_TYPE);
        }
        if(!$product->validateAttribute()){
            throw new InvalidArgumentException(ConstantsUtil::MSG_ERROR_INVALID_ATTRIBUTE);
        }

        return $product;
    }
}