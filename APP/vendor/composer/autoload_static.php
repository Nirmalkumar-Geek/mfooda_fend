<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInit74e70d7d1c4a7fa8e9ba2a197937f6dd
{
    public static $prefixLengthsPsr4 = array (
        'F' => 
        array (
            'Firebase\\JWT\\' => 13,
        ),
    );

    public static $prefixDirsPsr4 = array (
        'Firebase\\JWT\\' => 
        array (
            0 => __DIR__ . '/..' . '/firebase/php-jwt/src',
        ),
    );

    public static $classMap = array (
        'Composer\\InstalledVersions' => __DIR__ . '/..' . '/composer/InstalledVersions.php',
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->prefixLengthsPsr4 = ComposerStaticInit74e70d7d1c4a7fa8e9ba2a197937f6dd::$prefixLengthsPsr4;
            $loader->prefixDirsPsr4 = ComposerStaticInit74e70d7d1c4a7fa8e9ba2a197937f6dd::$prefixDirsPsr4;
            $loader->classMap = ComposerStaticInit74e70d7d1c4a7fa8e9ba2a197937f6dd::$classMap;

        }, null, ClassLoader::class);
    }
}
