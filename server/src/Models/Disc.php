<?php

namespace Models;

class Disc extends Product
{
    public function __construct($dataRequestBody)
    {
        parent::__construct($dataRequestBody);
    }

    public function validateAttribute()
    {
        //size in MB
        return (
            !preg_match(`/[0-9]+MB/`, $this->attribute) && floatval(trim($this->attribute, "MB")) > 0
        );
    }
}