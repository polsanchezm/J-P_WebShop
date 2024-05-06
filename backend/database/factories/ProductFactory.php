<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->word(),
            'description' => fake()->realText(),
            'category_id' => fake()->randomElement([1, 2, 3, 4]),
            'image' => fake()->imageUrl(),
            // 'size' => fake()->randomElement(['XS', 'S', 'M', 'L', 'XL']),
            // 'color' => fake()->colorName(),
            'price' => fake()->randomFloat(2, 10, 1000),
            // 'stock' => fake()->boolean(),
        ];
    }
}
