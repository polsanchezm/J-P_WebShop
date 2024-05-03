<?php

namespace App\Policies;

use App\Models\Shipping;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class ShippingPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user, Shipping $shipping): bool
    {
        return $user->id === $shipping->user_id || $user->role === 'manager';
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Shipping $shipping): bool
    {
        return $user->id === $shipping->user_id || $user->role === 'manager';
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return $user->role === 'user';
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Shipping $shipping): bool
    {
        return $user->id === $shipping->user_id;
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Shipping $shipping): bool
    {
        return $user->id === $shipping->user_id;
    }
}
