<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class SuperAdminSeeder extends Seeder
{
    public function run()
    {
        User::updateOrCreate(
            ['email' => 'superadmin@simora.com'],
            [
                'name' => 'Super Admin',
                'password' => Hash::make('password'),
                'role' => 'super_admin',
                'department' => 'IT',
                'position' => 'Super Administrator',
                'phone' => '081234567890',
                'status' => 'active',
                'avatar' => '/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAoACgDASIAAhEBAxEB/8QAGwAAAgMBAQEAAAAAAAAAAAAABAUCAwYBAAf/xAAsEAACAQMDAwMEAQUAAAAAAAABAgMABBEFEiExQVEGEyJhcYGRoRQjMrHB8P/EABYBAQEBAAAAAAAAAAAAAAAAAAIDAP/EABsRAAICAwEAAAAAAAAAAAAAAAABAhEDEiEx/9oADAMBAAIRAxEAPwDn9FFFABRRRQAUUUUAFFFFABRRRQAUUUUAf//Z'
            ]
        );

        User::updateOrCreate(
            ['email' => 'admin@simora.com'],
            [
                'name' => 'Admin User',
                'password' => Hash::make('password'),
                'role' => 'admin',
                'department' => 'HRD',
                'position' => 'HRD Manager',
                'phone' => '081234567891',
                'status' => 'active',
            ]
        );
    }
}