<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class PostController extends Controller
{
    private static $posts = [
        [ "id" => 1, "title" => "First Post", "content" => "This is the content of the first post.",],
        [ "id" => 2, "title" => "Second Post", "content" => "This is the content of the second post.",],
        [ "id"=> 3, "title"=> "Third Post", "content"=> "This is the content of the third post.",],
    ];
    public function index()
    {
        return view('posts.index', ['posts' => self::$posts]);
    }

    public function create()
    {
        return view('posts.create');
    }

    public function store(Request $request)
    {
        dd($request->all());
        
        $data = $request->validate([
            'title' => 'required',
            'content' => 'required',
        ]);

        $id = count(self::$posts) + 1;

        $post = [
            'id' => $id,
            'title' => $data['title'],
            'content' => $data['content'],
        ];

        array_push(self::$posts, $post);

        return redirect()->route('posts.index');
    }

    public function show($id)
    {
        foreach (self::$posts as $post) {
            if ($post['id'] == $id) {
                return view('posts.show', compact('post'));
            }
        }

        abort(404);
    }

    public function edit($id)
    {
        foreach (self::$posts as $post) {
            if ($post['id'] == $id) {
                return view('posts.edit', compact('post'));
            }
        }
        abort(404);
    }

    public function update(Request $request, $id)
    {
        dd($request->all(), $id);
        
        $data = $request->validate([
            'title' => 'required',
            'content' => 'required',
        ]);

        foreach (self::$posts as &$post) {
            if ($post['id'] == $id) {
                $post['title'] = $data['title'];
                $post['content'] = $data['content'];
                break;
            }
        }

        return redirect()->route('posts.show', $id);
    }

    public function destroy($id)
    {
        return redirect()->route('posts.index');
    }
}