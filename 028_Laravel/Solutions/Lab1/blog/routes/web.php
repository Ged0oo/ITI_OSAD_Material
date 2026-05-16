<?php

use App\Http\Controllers\PostController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/dashboard', function () {
    return view('dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::resource('posts', PostController::class);
    Route::post('posts/{post}/comments', [PostController::class, 'storeComment'])->name('posts.comments.store');
    Route::delete('posts/{post}/comments/{comment}', [PostController::class, 'destroyComment'])->name('posts.comments.destroy');
    Route::post('posts/{post}/likes', [PostController::class, 'toggleLike'])->name('posts.likes.toggle');
    Route::post('posts/{post}/comments/{comment}/likes', [PostController::class, 'toggleCommentLike'])->name('posts.comments.likes.toggle');
});

require __DIR__.'/auth.php';
