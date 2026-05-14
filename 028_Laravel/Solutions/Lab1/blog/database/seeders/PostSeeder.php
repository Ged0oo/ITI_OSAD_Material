<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Post;
use Illuminate\Support\Facades\DB;


class PostSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // DB::table("posts")->insert(
        //     [
        //         'title' => 'First Post',
        //         'content' => 'This is the content of the first post.',
        //         'user_id' => 1,
        //         'created_at' => now(),
        //         'updated_at' => now()
        //     ]
        // );
        Post::factory()->count(500)->create();
    }
}
