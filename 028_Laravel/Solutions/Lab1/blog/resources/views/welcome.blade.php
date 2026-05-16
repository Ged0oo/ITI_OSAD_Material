<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
	<head>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<meta name="csrf-token" content="{{ csrf_token() }}">

		<title>{{ config('app.name', 'Laravel') }}</title>

		@vite(['resources/css/app.css', 'resources/js/app.js'])
	</head>
	<body class="font-sans antialiased bg-gray-100 text-gray-900">
		<div class="min-h-screen flex items-center justify-center p-6">
			<div class="w-full max-w-2xl bg-white shadow rounded-lg p-8">
				<div class="flex items-center justify-between mb-6">
					<h1 class="text-2xl font-semibold">{{ config('app.name', 'Laravel') }}</h1>

					<div class="flex items-center gap-3">
						@auth
							<a href="{{ route('dashboard') }}" class="px-4 py-2 bg-gray-900 text-white rounded">Dashboard</a>
						@else
							<a href="{{ route('login') }}" class="px-4 py-2 bg-gray-900 text-white rounded">Log in</a>
							<a href="{{ route('register') }}" class="px-4 py-2 border border-gray-300 rounded">Register</a>
						@endauth
					</div>
				</div>

				<p class="text-gray-600">Authentication is configured with Laravel Breeze (Blade).</p>
			</div>
		</div>
	</body>
</html>