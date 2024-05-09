<?php

namespace App\Policies;

use App\Models\Order;
use App\Models\User;
use Stripe\Checkout\Session as StripeSession;

class OrderPolicy
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
    public function view(User $user, Order $order): bool
    {
        return $user->id === $order->user_id || $user->role === 'manager';
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return $user->role === 'client';
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Order $order): bool
    {
        return $user->id === $order->user_id || $user->role === 'manager';
    }

    public function createOrder(User $user): bool
    {
        return $user->role === 'client';
    }
}
