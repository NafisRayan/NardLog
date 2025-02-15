import { NextRequest, NextResponse } from 'next/server';
import { getUsers } from '@/lib/utils/data-access';
import { verifyPassword, generateToken } from '@/lib/utils/auth';
import { User, SafeUser } from '@/types';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // Basic validation
    if (!email || !password) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Get all users and find the matching email
    const users = await getUsers();
    const user = users.find(u => u.email === email);

    if (!user) {
      return NextResponse.json(
        { message: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Verify password
    const isValidPassword = await verifyPassword(password, user.password);
    if (!isValidPassword) {
      return NextResponse.json(
        { message: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Generate JWT token
    const token = generateToken(user.id);

    // Create safe user object (without password)
    const { password: _, ...safeUser } = user;

    // Return user data and token
    return NextResponse.json(
      {
        user: safeUser,
        token,
      },
      { 
        status: 200,
        headers: {
          'Set-Cookie': `token=${token}; Path=/; HttpOnly; SameSite=Strict; Max-Age=604800`, // 7 days
        },
      }
    );

  } catch (error) {
    console.error('Sign in error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
