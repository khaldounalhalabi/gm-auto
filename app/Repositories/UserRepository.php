<?php

namespace App\Repositories;

use App\Models\User;
use App\Repositories\Contracts\BaseRepository;

/**
 * @extends BaseRepository<User>
 */
class UserRepository extends BaseRepository
{
    protected string $modelClass = User::class;

    public function getUserByEmail(string $email): ?User
    {
        return $this->globalQuery()->where('email', $email)->first();
    }

    public function getUserByPasswordResetCode(string $code): ?User
    {
        return $this->globalQuery()->where('reset_password_code', $code)->first();
    }
}
