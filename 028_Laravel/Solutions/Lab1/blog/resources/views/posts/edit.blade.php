<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">Edit Post</h2>
    </x-slot>

    <div class="py-8">
        <div class="max-w-3xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                <form method="POST" action="{{ route('posts.update', $post->id) }}" enctype="multipart/form-data" class="space-y-4">
                    @csrf
                    @method('PUT')

                    <div>
                        <label class="block text-sm font-medium text-gray-700">Title</label>
                        <input type="text" name="title" value="{{ old('title', $post->title) }}" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
                        @error('title')<div class="text-sm text-red-600 mt-1">{{ $message }}</div>@enderror
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-gray-700">Content</label>
                        <textarea name="content" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm" rows="5">{{ old('content', $post->content) }}</textarea>
                        @error('content')<div class="text-sm text-red-600 mt-1">{{ $message }}</div>@enderror
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-gray-700">Photo</label>
                        @if($post->photo)
                            <div class="mt-2">
                                <img src="{{ asset('storage/' . $post->photo) }}" alt="Current photo" class="w-48 rounded border">
                            </div>
                        @endif
                        <input type="file" name="photo" accept="image/*" class="mt-2 block w-full text-sm text-gray-700">
                        @error('photo')<div class="text-sm text-red-600 mt-1">{{ $message }}</div>@enderror
                    </div>

                    <div class="flex items-center gap-3">
                        <button type="submit" class="inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700">Update</button>
                        <a href="{{ route('posts.show', $post->id) }}" class="text-sm text-gray-600 hover:underline">Back to post</a>
                    </div>
                </form>
            </div>
        </div>
    </div>
</x-app-layout>
