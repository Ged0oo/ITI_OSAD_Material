<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\Comment;
use App\Http\Requests\StorePostRequest;
use App\Http\Requests\UpdatePostRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth;

class PostController extends Controller
{
    public function index()
    {
        $posts = Post::with(['user', 'comments.user', 'likes.user'])->paginate(10);
        return view('posts.index', ['posts' => $posts]);
    }

    public function create()
    {
        return view('posts.create');
    }

    public function store(StorePostRequest $request)
    {
        $data = $request->validated();
        $data['user_id'] = Auth::id();

        if ($request->hasFile('photo')) {
            $data['photo'] = $request->file('photo')->store('posts', 'public');
        }

        Post::create($data);

        return redirect()->route('posts.index');
    }

    public function show(Post $post)
    {
        $post->load(['user', 'comments.user', 'comments.likes.user', 'likes.user']);
        return view('posts.show', compact('post'));
    }

    public function storeComment(Post $post, Request $request)
    {

        $data = $request->validate([
            'content' => ['required', 'min:3'],
        ]);

        $post->comments()->create([
            'user_id' => Auth::id(),
            'content' => $data['content'],
            'post_id' => $post->id,
        ]);

        return redirect()->route('posts.show', $post->id);
    }

    public function toggleLike(Post $post, Request $request)
    {
        $userId = Auth::id();
        $existingLike = $post->likes()->where('user_id', $userId)->first();

        if ($existingLike) $existingLike->delete();
        else $post->likes()->create(['user_id' => $userId]);

        return redirect()->route('posts.show', $post->id);
    }

    public function toggleCommentLike(Post $post, $commentId, Request $request)
    {
        $comment = Comment::findOrFail($commentId);
        $userId = Auth::id();

        $existingLike = $comment->likes()->where('user_id', $userId)->first();

        if ($existingLike) $existingLike->delete();
        else $comment->likes()->create(['user_id' => $userId]);

        return redirect()->route('posts.show', $post->id);
    }

    public function destroyComment(Post $post, Comment $comment)
    {
        abort_unless($comment->post_id === $post->id, 404);

        $userId = Auth::id();
        $canDelete = $comment->user_id === $userId || $post->user_id === $userId;

        abort_unless($canDelete, 403);

        Comment::whereKey($comment->id)->update(['deleted_at' => now()]);

        return redirect()->route('posts.show', $post->id);
    }

    public function edit($id)
    {
        $post = Post::findOrFail($id);
        return view('posts.edit', compact('post'));
    }

    public function update(UpdatePostRequest $request, $id)
    {
        $data = $request->validated();
        $post = Post::findOrFail($id);

        if ($request->hasFile('photo')) {
            if ($post->photo && Storage::disk('public')->exists($post->photo)) {
                Storage::disk('public')->delete($post->photo);
            }
            $data['photo'] = $request->file('photo')->store('posts', 'public');
        }

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