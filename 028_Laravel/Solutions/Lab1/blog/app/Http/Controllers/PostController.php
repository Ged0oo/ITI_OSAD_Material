<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\User;
use Illuminate\Http\Request;

class PostController extends Controller
{
    public function index()
    {
        $posts = Post::paginate(10);
        return view('posts.index', ['posts' => $posts]);
    }

    public function create()
    {
        $users = User::all();
        return view('posts.create', ['users' => $users]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'title' => 'required',
            'content' => 'required',
            'user_id' => 'required|exists:users,id',
        ]);

        Post::create($data);

        return redirect()->route('posts.index');
    }

    public function show(Post $post)
    {
        // $post = Post::findOrFail($id);
        return view('posts.show', compact('post'));
    }

    public function edit($id)
    {
        $post = Post::findOrFail($id);
        $users = User::all();
        return view('posts.edit', compact('post', 'users'));
    }

    public function update(Request $request, $id)
    {
        $data = $request->validate([
            'title' => 'required',
            'content' => 'required',
            'user_id' => 'required|exists:users,id',
        ]);

        $post = Post::findOrFail($id);
        $post->update($data);

        return redirect()->route('posts.show', $id);
    }

    public function destroy($id)
    {
        $post = Post::findOrFail($id);
        $post->delete();

        return redirect()->route('posts.index');
    }
}