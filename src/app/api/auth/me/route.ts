import { NextRequest, NextResponse } from 'next/server';
import { getUserFromToken } from '@/lib/utils/auth';
import { SafeUser } from '@/types';

export async function GET(request: NextRequest) {
  try {
    // Get token from Authorization header
    const authHeader = request.headers.get('authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json(
        { message: 'Missing or invalid authorization header' },
        { status: 401 }
      );
    }

    const token = authHeader.substring(7); // Remove "Bearer " prefix
    
    // Get user from token
    const user = await getUserFromToken(token);
    
    if (!user) {
      return NextResponse.json(
        { message: 'Invalid token' },
        { status: 401 }
      );
    }

    // Return user data without password
    const { password: _, ...safeUser } = user;
    return NextResponse.json(safeUser as SafeUser, { status: 200 });

  } catch (error) {
    console.error('Get current user error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
