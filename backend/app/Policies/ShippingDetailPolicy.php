<?php

namespace App\Policies;

use App\Models\ShippingDetail;
use App\Models\User;

class ShippingDetailPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return $user->role === 'user' || 'manager';
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, ShippingDetail $shipping): bool
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
    public function update(User $user, ShippingDetail $shipping): bool
    {
        return $user->id === $shipping->user_id;
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, ShippingDetail $shipping): bool
    {
        return $user->id === $shipping->user_id;
    }
}
