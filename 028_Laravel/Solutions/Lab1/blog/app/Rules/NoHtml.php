<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;

class NoHtml implements Rule
{
    /**
     * Determine if the validation rule passes.
     */
    public function passes($attribute, $value): bool
    {
        // Passes if stripping tags does not change the value
        return strip_tags($value) === $value;
    }

    /**
     * Get the validation error message.
     */
    public function message(): string
    {
        return 'The :attribute must not contain HTML.';
    }
}
