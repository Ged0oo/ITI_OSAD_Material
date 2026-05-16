<x-app-layout>
    <x-slot name="header">
        <div class="flex items-center justify-between">
            <h2 class="font-semibold text-xl text-gray-800 leading-tight">
                {{ __('Posts') }}
            </h2>
            <a href="{{ route('posts.create') }}" class="inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700">
                Create Post
            </a>
        </div>
    </x-slot>

    <div class="py-8">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8 w-full">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6 w-full">
                @forelse ($posts as $post)
                <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg w-full">
                    <div class="p-6 text-gray-900 space-y-3">
                        <div class="flex items-center justify-between">
                            <h3 class="text-lg font-semibold">{{ $post->title }}</h3>
                            <span class="text-sm text-gray-500">{{ $post->created_at->format('Y-m-d') }}</span>
                        </div>

                        <p class="text-sm text-gray-500">Slug: {{ $post->slug }}</p>

                        @if($post->photo)
                            <img src="{{ asset('storage/' . $post->photo) }}" alt="{{ $post->title }}" class="w-full h-40 object-cover rounded border">
                        @endif

                        <p class="text-sm">By {{ $post->user->name }}</p>

                        <div class="text-sm text-gray-600 flex items-center gap-4">
                            <span>Comments: {{ $post->comments->count() }}</span>
                            <span>Likes: {{ $post->likes->count() }}</span>
                        </div>

                        <div class="flex items-center gap-3 text-sm">
                            <a href="{{ route('posts.show', $post->id) }}" class="text-blue-600 hover:underline">View</a>
                            <a href="{{ route('posts.edit', $post->id) }}" class="text-amber-600 hover:underline">Edit</a>
                            <form method="POST" action="{{ route('posts.destroy', $post->id) }}">
                                @csrf
                                @method('DELETE')
                                <button type="submit" class="text-red-600 hover:underline">Delete</button>
                            </form>
                        </div>
                    </div>
                </div>
            @empty
                <div class="col-span-3 bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div class="p-6 text-gray-600">No posts yet.</div>
                </div>
            @endforelse
            </div>

            <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg p-4">
                {{ $posts->links() }}
            </div>
        </div>
    </div>
</x-app-layout>
