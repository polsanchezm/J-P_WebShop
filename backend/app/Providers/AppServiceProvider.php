<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    protected $policies = [
        Product::class => ProductPolicy::class,
        ProductVariant::class => ProductVariantPolicy::class,
        Order::class => OrderPolicy::class,
        OrderDetail::class => OrderDetailPolicy::class,
        Wishlist::class => WishlistPolicy::class,
        WishlistItem::class => WishlistItemPolicy::class,
        ShippingDetail::class => ShippingDetailPolicy::class,
        User::class => UserPolicy::class,
    ];

    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
