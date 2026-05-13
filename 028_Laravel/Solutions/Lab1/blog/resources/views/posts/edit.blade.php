<!DOCTYPE html>
<html>
<head>
    <title>Edit Post</title>
</head>
<body>
    <h1>Edit Post</h1>

    <form method="POST" action="{{ route('posts.update', $post['id']) }}">
        @csrf
        @method('PUT')

        <div>
            <label>Title</label>
            <input type="text" name="title" value="{{ old('title', $post['title']) }}" required>
        </div>

        <div>
            <label>Content</label>
            <textarea name="content" required>{{ old('content', $post['content']) }}</textarea>
        </div>

        <button type="submit">Update</button>
    </form>

    <p><a href="{{ route('posts.show', $post['id']) }}">Back to post</a></p>
</body>
</html>
