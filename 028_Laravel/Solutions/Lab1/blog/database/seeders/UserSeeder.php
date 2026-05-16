<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // DB::table("users")->insert(
        //     ['name' => 'John Doe', 'created_at' => now(), 'updated_at' => now()],
        //     ['name' => 'Jane Smith', 'created_at' => now(), 'updated_at' => now()],
        //     ['name' => 'Alice Johnson', 'created_at' => now(), 'updated_at' => now()],
        //     ['name' => 'Bob Brown', 'created_at' => now(), 'updated_at' => now()],
        //     ['name' => 'Charlie Davis', 'created_at' => now(), 'updated_at' => now()],
        //     ['name' => 'Eve Wilson', 'created_at' => now(), 'updated_at' => now()],
        //     ['name' => 'Frank Miller', 'created_at' => now(), 'updated_at' => now()],
        //     ['name' => 'Grace Lee', 'created_at' => now(), 'updated_at' => now()],
        //     ['name' => 'Hank Taylor', 'created_at' => now(), 'updated_at' => now()],
        //     ['name' => 'Ivy Anderson', 'created_at' => now(), 'updated_at' => now()]
        // );
        User::factory()->count(5)->create();
    }
}
