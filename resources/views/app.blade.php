{{-- resources/views/app.blade.php --}}
<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" translate="no">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="google" content="notranslate">

    @viteReactRefresh
    @vite(['resources/js/app.tsx'])

    @inertiaHead
</head>
<body>
    @inertia
</body>
</html>
