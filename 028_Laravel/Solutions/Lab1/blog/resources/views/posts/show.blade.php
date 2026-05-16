<x-app-layout>
    <x-slot name="header">
        <div class="flex items-center justify-between">
            <h2 class="font-semibold text-xl text-gray-800 leading-tight">Post Details</h2>
            <a href="{{ route('posts.index') }}" class="text-sm text-gray-600 hover:underline">Back to posts</a>
        </div>
    </x-slot>

    <div class="py-8 flex items-center justify-center">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
            <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                <div class="p-6 text-gray-900 space-y-3">
                    <h3 class="text-2xl font-semibold">{{ $post->title }}</h3>
                    <p class="text-sm text-gray-500">Slug: {{ $post->slug }}</p>
                    @if($post->photo)
                        <img src="{{ asset('storage/' . $post->photo) }}" alt="{{ $post->title }}" class="w-72 rounded border">
                    @endif
                    <p>{{ $post->content }}</p>
                    <p class="text-sm text-gray-600">Author: {{ $post->user->name }}</p>
                    <div class="text-sm text-gray-600 flex items-center gap-4">
                        <span>Likes: {{ $post->likes->count() }}</span>
                        <span>Comments: {{ $post->comments->count() }}</span>
                        <span>Created: {{ $post->created_at->format('Y-m-d') }}</span>
                    </div>
                </div>
            </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6 space-y-4">
                    @auth
                        <form method="POST" action="{{ route('posts.likes.toggle', $post->id) }}" class="space-y-3">
                            @csrf
                            <button type="submit" class="inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700">
                                {{ $post->likes()->where('user_id', auth()->id())->exists() ? 'Unlike' : 'Like' }}
                            </button>
                        </form>
                    @else
                        <p class="text-sm text-gray-600">Please <a href="{{ route('login') }}" class="text-blue-600 hover:underline">log in</a> to like this post.</p>
                    @endauth
                </div>

                <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6 space-y-4">
                    <h4 class="text-lg font-semibold">Add Comment</h4>
                    @auth
                    <form method="POST" action="{{ route('posts.comments.store', $post->id) }}" class="space-y-3">
                            @csrf
                            <div>
                                <textarea name="content" required rows="4" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm">{{ old('content') }}</textarea>
                                @error('content')<div class="text-sm text-red-600 mt-1">{{ $message }}</div>@enderror
                            </div>
                            <button type="submit" class="inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700">Add Comment</button>
                        </form>
                    @else
                        <p class="text-sm text-gray-600">Please <a href="{{ route('login') }}" class="text-blue-600 hover:underline">log in</a> to comment on this post.</p>
                    @endauth

                    <h5 class="font-medium">Comments</h5>
                    <ul class="space-y-3 text-sm text-gray-700">
                        @forelse($post->comments as $comment)
                            <li class="border rounded p-3 bg-gray-50">
                                <div class="flex items-center justify-between mb-2">
                                    <strong>{{ $comment->user->name }}</strong>
                                    <span class="text-xs text-gray-500">{{ $comment->created_at->diffForHumans() }}</span>
                                </div>
                                <p class="mb-2">{{ $comment->content }}</p>
                                <div class="flex items-center gap-4 text-xs">
                                    <span class="text-gray-600">Likes: {{ $comment->likes->count() }}</span>
                                    @auth
                                        <form method="POST" action="{{ route('posts.comments.likes.toggle', [$post->id, $comment->id]) }}" class="inline">
                                            @csrf
                                            <button type="submit" class="text-blue-600 hover:underline">
                                                {{ $comment->likes()->where('user_id', auth()->id())->exists() ? 'Unlike' : 'Like' }}
                                            </button>
                                        </form>
                                        @if(auth()->id() === $comment->user_id || auth()->id() === $post->user_id)
                                            <form method="POST" action="{{ route('posts.comments.destroy', [$post->id, $comment->id]) }}" class="inline" onsubmit="return confirm('Delete this comment?')">
                                                @csrf
                                                @method('DELETE')
                                                <button type="submit" class="text-red-600 hover:underline">Delete</button>
                                            </form>
                                        @endif
                                    @else
                                        <a href="{{ route('login') }}" class="text-blue-600 hover:underline">Log in to like</a>
                                    @endauth
                                </div>
                            </li>
                        @empty
                            <li>No comments yet.</li>
                        @endforelse
                    </ul>
                </div>
            </div>
        </div>
    </div>
</x-app-layout>
