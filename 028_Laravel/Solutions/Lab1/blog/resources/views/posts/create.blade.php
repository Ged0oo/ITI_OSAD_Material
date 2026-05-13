<!DOCTYPE html>
<html>
<head>
    <title>Create Post</title>
</head>
<body>
    <h1>Create Post</h1>

    <form method="POST" action="{{ route('posts.store') }}">
        @csrf

        <div>
            <label>Title</label>
            <input type="text" name="title" value="{{ old('title') }}" required>
        </div>

        <div>
            <label>Content</label>
            <textarea name="content" required>{{ old('content') }}</textarea>
        </div>

        <button type="submit">Create</button>
    </form>

    <p><a href="{{ route('posts.index') }}">Back to list</a></p>
</body>
</html>
