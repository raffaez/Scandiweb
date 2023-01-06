<?php

namespace Util;

abstract class ConstantsUtil
{
    /* REQUESTS */
    public const TYPE_REQUEST = ['GET', 'POST', 'DELETE', 'PUT'];
    public const TYPE_GET = ['PRODUCTS'];
    public const TYPE_POST = ['PRODUCTS'];
    public const TYPE_DELETE = ['PRODUCTS'];
    public const TYPE_PUT = ['PRODUCTS'];

    /* ERRORS */
    public const MSG_ERROR_ROUTE_TYPE = 'Forbidden route!';
    public const MSG_ERROR_RESOURCE_NOTFOUND = 'Resource not found!';
    public const MSG_ERROR_GENERIC = 'An error occurred in the request!';
    public const MSG_ERROR_NO_RETURN = 'No record found!';
    public const MSG_ERROR_NOT_ALTERED = 'No record altered!';
    public const MSG_ERROR_EMPTY_JSON = 'Empty request body!';

    /* SUCCESS */
    public const MSG_SUCCESS_DELETE = 'Records successfully deleted!';
    public const MSG_SUCCESS_UPDATE = 'Record successfully updated!';

    /* RESOURCE PRODUCTS */
    public const MSG_ERROR_SKU_NECESSARY = 'Sku necessary!';
    public const MSG_ERROR_INVALID_SKU = 'Invalid SKU or already taken!';
    public const MSG_ERROR_INVALID_NAME = 'Invalid name!';
    public const MSG_ERROR_INVALID_PRICE = 'Invalid price!';
    public const MSG_ERROR_INVALID_TYPE = 'Invalid type!';
    public const MSG_ERROR_INVALID_ATTRIBUTE = 'Invalid attribute!';
    public const MSG_ERROR_INSUFFICIENT_DATA = 'Insufficient data!';

    /* RETURN JSON */
    const TYPE_SUCCESS = 'success';
    const TYPE_ERROR = 'error';

    /* MISC */
    public const TYPE = 'type';
    public const RESPONSE = 'response';
}