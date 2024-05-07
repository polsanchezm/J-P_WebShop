<?php

namespace App\Policies;

use App\Models\User;

class WishlistPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return $user->role === 'client';
    }
}
