<?php

namespace App\Policies;

use App\Models\OrderDetail;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class OrderDetailPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return $user->role === 'client' || 'manager';
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, OrderDetail $orderDetail): bool
    {
        return $user->id === $orderDetail->order->user_id || $user->role === 'manager';
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return $user->role === 'client';
    }
}
