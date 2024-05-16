<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;


class UserManagerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Crea l'usuari amb el rol de Manager
        $date = Carbon::createFromFormat('d/m/Y H:i:s', '03/01/2003 13:43:33');
        $birthday = $date->subDays(1)->format('Y-m-d');
        DB::table('users')->insert([
            'name' => 'Manager',
            'surnames' => 'Manager',
            'email' => 'manager@gmail.com',
            'password' => Hash::make('1qazZAQ!'),
            'birthdate' => $birthday,
            'role' => 'manager',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ]);
    }
}
