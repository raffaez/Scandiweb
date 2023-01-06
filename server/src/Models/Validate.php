<?php

namespace Models;
interface Validate
{
    public function validateSKU();

    public function validateName();

    public function validatePrice();

    public function validateType();

    public function validateAttribute();
}