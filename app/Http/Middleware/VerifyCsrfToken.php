<?php

namespace App\Http\Middleware;

use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken as Middleware;

class VerifyCsrfToken extends Middleware
{
    /**
     * The URIs that should be excluded from CSRF verification.
     *
     * @var array
     */
    protected $except = [
        /*
        '/login/login',
        'login',
        '/login',
        '/getcurrentuser/getcurrentuser',
        '/getcurrentuser',
        'getcurrentuser',
        'register',
        '/register/register',
        '/register',
        '/sanctum/csrf-cookie',
        '/register/store',
        '/register/register',
        'register',
        '/register'*/
        '/logout',
        '/sanctum/csrf-cookie',
        '/uploadvideofile',
    ];
}
