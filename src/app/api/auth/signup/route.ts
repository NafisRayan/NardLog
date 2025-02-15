import { NextRequest, NextResponse } from 'next/server';
import { createUser } from '@/lib/utils/data-access';
import { hashPassword } from '@/lib/utils/auth';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password, name } = body;

    // Basic validation
    if (!email || !password || !name) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { message: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create new user
    const user = await createUser({
      email,
      name,
      password: hashedPassword,
    });

    if (!user) {
      return NextResponse.json(
        { message: 'Error creating user' },
        { status: 500 }
      );
    }

    // Return success response without sending the password
    const { password: _, ...userWithoutPassword } = user;
    return NextResponse.json(userWithoutPassword, { status: 201 });

  } catch (error) {
    console.error('Sign up error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
