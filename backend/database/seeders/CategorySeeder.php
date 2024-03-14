<?php

namespace Database\Seeders;

use Illuminate\Support\Facades\DB;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table("categories")->insert([
            "type" => "Top"
        ]);

        DB::table("categories")->insert([
            "type" => "Bottom"
        ]);

        DB::table("categories")->insert([
            "type" => "Underwear"
        ]);

        DB::table("categories")->insert([
            "type" => "Footwear"
        ]);
    }
}
