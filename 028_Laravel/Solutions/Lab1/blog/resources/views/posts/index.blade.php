<!DOCTYPE html>
<html>
<head>
    <title>Posts</title>
</head>
<body> 
    <h1> posts </h1>
    <p><a href="{{ route('posts.create') }}">Create New Post</a></p>
    <ul>
        @foreach ($posts as $post)
            <li>--------------------------</li>
            <li>Post Title: {{$post->title}}</li>
            <li>Slug: {{$post->slug}}</li>
            <a href="{{ route('posts.show', $post->id) }}">View Post</a>
            |
            <a href="{{ route('posts.edit', $post->id) }}">Edit</a>
            |
            <form style="display:inline" method="POST" action="{{ route('posts.destroy', $post->id) }}">
                @csrf
                @method('DELETE')
                <button type="submit">Delete</button>
            </form>
        @endforeach
    </ul>

    <div>
        {{ $posts->links() }}
    </div>
</body>
</html>
