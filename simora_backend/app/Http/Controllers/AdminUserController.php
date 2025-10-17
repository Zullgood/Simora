<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AdminUserController extends Controller
{
    public function index()
    {
        $users = User::where('role', 'admin')->get();
        return response()->json(['success' => true, 'data' => $users]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users',
            'password' => 'required|string|min:6',
            'role' => 'required|in:admin,super_admin',
            'department' => 'required|string',
            'status' => 'required|in:active,inactive',
            'photo' => 'nullable|string',
        ]);

        $validated['password'] = Hash::make($validated['password']);
        $user = User::create($validated);
        
        return response()->json(['success' => true, 'data' => $user], 201);
    }

    public function show(User $adminUser)
    {
        return response()->json(['success' => true, 'data' => $adminUser]);
    }

    public function update(Request $request, User $adminUser)
    {
        $validated = $request->validate([
            'name' => 'string|max:255',
            'email' => 'email|unique:users,email,' . $adminUser->id,
            'password' => 'nullable|string|min:6',
            'role' => 'in:admin,super_admin',
            'department' => 'string',
            'status' => 'in:active,inactive',
            'photo' => 'nullable|string',
        ]);

        if (isset($validated['password']) && !empty($validated['password'])) {
            $validated['password'] = Hash::make($validated['password']);
        } else {
            unset($validated['password']);
        }

        $adminUser->update($validated);
        return response()->json(['success' => true, 'data' => $adminUser]);
    }

    public function destroy(User $adminUser)
    {
        $adminUser->delete();
        return response()->json(['success' => true, 'message' => 'Admin user deleted']);
    }
}