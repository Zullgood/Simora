<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class CheckPermissions
{
    public function handle(Request $request, Closure $next, $permission)
    {
        $user = $request->user();
        
        if (!$user) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        // Check if user is admin employee with read-only access
        if ($user instanceof \App\Models\Employee && $user->role === 'admin') {
            if (in_array($permission, ['create', 'edit', 'delete'])) {
                return response()->json([
                    'success' => false,
                    'message' => 'Admin hanya memiliki akses read-only'
                ], 403);
            }
        }

        return $next($request);
    }
}