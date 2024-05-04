<?php

namespace App\Policies;

use App\Models\User;
use App\Models\WishlistItem;
use Illuminate\Auth\Access\Response;

class WishlistItemPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return $user->role === 'user';
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user): bool
    {
        return $user->role === 'user';
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return $user->role === 'user';
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, WishlistItem $wishlistItem): bool
    {
        return $user->id === $wishlistItem->wishlist->user_id;
    }
}
