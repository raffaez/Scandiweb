<?php

namespace Models;

class Furniture extends Product
{
    public function __construct($dataRequestBody)
    {
        parent::__construct($dataRequestBody);
    }

    public function validateAttribute()
    {
        //WxHxL
        return (
            strlen($this->attribute) > 0 && !preg_match(`/[0-9]+x[0-9]+x[0-9]+/`, $this->attribute)
        );
    }
}