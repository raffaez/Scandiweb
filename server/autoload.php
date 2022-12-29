<?php

/**
 * CLASSES AUTOLOAD
 * @param $class
 */
function autoload($class)
{
    $baseDir = DIR_APP . DS;
    $class = $baseDir . 'src' . DS . str_replace('\\', DS, $class) . '.php';
    if (file_exists($class) && !is_dir($class)) {
        include $class;
    }
}

spl_autoload_register('autoload');