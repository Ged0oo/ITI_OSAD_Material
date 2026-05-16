<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Cviebrock\EloquentSluggable\Sluggable;


class Post extends Model
{
    use HasFactory;
    use Sluggable;
    use SoftDeletes;

    protected $fillable = ['title', 'content', 'photo', 'user_id'];

    public function setTitleAttribute($value)
    {
        $this->attributes['title'] = trim($value);
    }

    public function getTitleAttribute($value)
    {
        return ucwords(strtolower($value));
    }

    public function setContentAttribute($value)
    {
        $clean = trim($value);
        $this->attributes['content'] = $clean;
    }

    public function getContentAttribute($value)
    {
        return $value;
    }

    public function sluggable(): array
    {
        return [
            'slug' => [
                'source' => 'title',
                'onUpdate' => true,
            ]
        ];
    }

    public function user(){
        return $this->belongsTo(User::class, 'user_id');
    }

    public function comments(){
        return $this->hasMany(Comment::class);
    }

    public function likes(){
        return $this->morphMany(Like::class, 'likeable');
    }
}
