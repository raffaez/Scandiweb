<?php

namespace Models;

class Book extends Product
{
    public function __construct($dataRequestBody)
    {
        parent::__construct($dataRequestBody);
    }

    public function validateAttribute()
    {
        //weight in KG
        return (
            !preg_match(`/[0-9]+KG/`, $this->attribute) && floatval(trim($this->attribute, "KG")) > 0
        );
    }
}