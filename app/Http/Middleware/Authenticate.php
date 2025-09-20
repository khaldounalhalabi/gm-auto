<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class Authenticate
{
    /**
     * Handle an incoming request.
     *
     * @param  Closure(Request): (Response)  $next
     */
    public function handle(Request $request, Closure $next, string $guard): Response
    {
        if ($guard == 'api') {
            if (! auth('api')?->user()) {
                return rest()->notAuthorized()
                    ->message(trans('site.unauthorized_user'))
                    ->send();
            }
        } elseif ($guard == 'web') {
            if (! auth('web')->user()) {
                return redirect()->route('v1.web.public.login.page');
            }
        } else {
            if (! auth($guard)->user()) {
                abort(Response::HTTP_UNAUTHORIZED);
            }
        }

        return $next($request);
    }
}
