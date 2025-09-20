<?php

namespace App\Http\Controllers\WEB\v1;

use App\Http\Controllers\WebController;
use App\Http\Requests\v1\AuthRequests\AuthLoginRequest;
use App\Http\Requests\v1\AuthRequests\AuthRegisterRequest;
use App\Http\Requests\v1\AuthRequests\CheckPasswordResetRequest;
use App\Http\Requests\v1\AuthRequests\RequestResetPasswordRequest;
use App\Http\Requests\v1\AuthRequests\ResetPasswordRequest;
use App\Http\Requests\v1\AuthRequests\UpdateUserRequest;
use App\Http\Resources\v1\UserResource;
use App\Services\v1\User\UserService;
use Exception;
use Inertia\Inertia;

class BaseAuthController extends WebController
{
    private UserService $userService;

    private ?string $role = null;

    /**
     * @throws Exception
     */
    public function __construct()
    {
        $this->userService = UserService::make();
        $this->userService->setGuard('web');
        $this->relations = [];
    }

    public function roleHook(string $role)
    {
        $this->role = $role;
    }

    public function login(AuthLoginRequest $request)
    {
        $user = $this->userService->login($request->validated(), $this->role, $this->relations);
        if ($user) {
            return redirect()->route('v1.web.protected.me');
        } else {
            session()->flash('error', trans('site.credentials_not_match_records'));

            return redirect()->back();
        }
    }

    public function updateUserDetails(UpdateUserRequest $request)
    {
        $user = $this->userService->updateUserDetails($request->validated(), $this->role, $this->relations);

        if ($user) {
            return redirect()->route('v1.web.protected.me');
        } else {
            session()->flash('error', trans('site.something_went_wrong'));

            return redirect()->back();
        }
    }

    public function userDetails()
    {
        $user = $this->userService->userDetails($this->role);

        if ($user) {
            return Inertia::render('user-details', [
                'user' => UserResource::make($user),
            ]);
        } else {
            session()->flash('error', trans('site.something_went_wrong'));

            return redirect()->back();
        }
    }

    public function requestResetPassword(RequestResetPasswordRequest $request)
    {
        $result = $this->userService->passwordResetRequest($request->validated()['email']);
        if ($result) {
            return Inertia::render('reset-password-code-form');
        } else {
            session()->flash('error', trans('site.something_went_wrong'));

            return redirect()->back();
        }
    }

    public function validateResetPasswordCode(CheckPasswordResetRequest $request)
    {
        $request->validated();

        return redirect()->route('v1.web.public.reset.password.page');
    }

    public function resetPassword(ResetPasswordRequest $request)
    {
        $data = $request->validated();
        $result = $this->userService->passwordReset($data['reset_password_code'], $data['password']);

        if ($result) {
            return redirect()->route('v1.web.public.login.page');
        } else {
            session()->flash('error', trans('site.something_went_wrong'));

            return redirect()->back();
        }
    }

    public function register(AuthRegisterRequest $request)
    {
        $user = $this->userService->register($request->validated(), $this->role);
        if ($user) {
            return redirect()->route('v1.web.protected.me');
        } else {
            session()->flash('error', trans('site.something_went_wrong'));

            return redirect()->back();
        }
    }

    public function logout()
    {
        $this->userService->logout();

        return redirect()->route('v1.web.public.login.page');
    }
}
