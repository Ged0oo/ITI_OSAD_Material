<?php

namespace App\Http\Requests;

use App\Rules\NoHtml;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdatePostRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
    * @return array<string, mixed>
     */
    public function rules(): array
    {
        return [
            'title' => ['required', 'min:3', Rule::unique('posts', 'title')->ignore($this->route('id'))],
            'content' => ['required', 'min:10', new NoHtml()],
            'photo' => ['nullable', 'image', 'mimes:jpeg,png', 'max:5120'],
        ];
    }
}
