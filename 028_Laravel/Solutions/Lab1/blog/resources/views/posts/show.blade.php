<!DOCTYPE html>
<html>
<head>
    <title>Posts</title>
</head>
<body> 
    <h1> posts </h1>
    <ul>
            <li>Post ID: {{$post->id}}</li>
            <li>Post Title: {{$post->title}}</li>
            <li>Slug Post Title: {{$post->slug}}</li>
            <li>Post Content: {{$post->content}}</li>
            <li>Post Author: {{$post->user->name}}</li>
            <li>Post Creation Date: {{ $post->created_at->format('Y-m-d') }}</li>
    </ul>

</body>      
</html>
