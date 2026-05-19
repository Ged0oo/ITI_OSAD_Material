<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\PostResource;
use App\Models\Post;
use Illuminate\Http\Request;

class PostController extends Controller
{
    public function index()
    {
        $posts = Post::with('user')->latest()->paginate(10);

        return PostResource::collection($posts);
    }

    public function show(Post $post)
    {
        $post->load('user');

        return new PostResource($post);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'title' => ['required', 'string', 'min:3'],
            'content' => ['required', 'string', 'min:10'],
            'photo' => ['nullable', 'image', 'mimes:jpeg,png,jpg,webp', 'max:5120'],
        ]);

        $data['user_id'] = $request->user()->id;

        if ($request->hasFile('photo')) {
            $data['photo'] = $request->file('photo')->store('posts', 'public');
        }

        $post = Post::create($data);

        return (new PostResource($post->load('user')))->response()->setStatusCode(201);
    }
}
