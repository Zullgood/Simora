<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class SuperAdminController extends Controller
{
    public function index()
    {
        $users = User::where('role', 'super_admin')->get();
        return response()->json(['success' => true, 'data' => $users]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users',
            'password' => 'required|string|min:6',
            'department' => 'string',
            'status' => 'required|in:active,inactive',
            'photo' => 'nullable|string',
        ]);

        $validated['role'] = 'super_admin';
        $validated['department'] = 'IT';
        $validated['password'] = Hash::make($validated['password']);
        $user = User::create($validated);
        
        return response()->json(['success' => true, 'data' => $user], 201);
    }

    public function show(User $superAdmin)
    {
        return response()->json(['success' => true, 'data' => $superAdmin]);
    }

    public function update(Request $request, User $superAdmin)
    {
        $validated = $request->validate([
            'name' => 'string|max:255',
            'email' => 'email|unique:users,email,' . $superAdmin->id,
            'password' => 'nullable|string|min:6',
            'department' => 'string',
            'status' => 'in:active,inactive',
            'photo' => 'nullable|string',
        ]);

        $validated['role'] = 'super_admin';
        $validated['department'] = 'IT';

        if (isset($validated['password']) && !empty($validated['password'])) {
            $validated['password'] = Hash::make($validated['password']);
        } else {
            unset($validated['password']);
        }

        $superAdmin->update($validated);
        return response()->json(['success' => true, 'data' => $superAdmin]);
    }

    public function destroy(User $superAdmin)
    {
        $superAdmin->delete();
        return response()->json(['success' => true, 'message' => 'Super admin deleted']);
    }
}