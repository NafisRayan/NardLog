import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { User } from '@/types';
import { getUserById } from './data-access';

const JWT_SECRET = process.env.JWT_SECRET || 'your-default-secret-key';
const JWT_EXPIRES_IN = '7d';

export interface AuthTokenPayload {
  userId: string;
}

export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

export function generateToken(userId: string): string {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

export function verifyToken(token: string): AuthTokenPayload {
  try {
    return jwt.verify(token, JWT_SECRET) as AuthTokenPayload;
  } catch (error) {
    throw new Error('Invalid token');
  }
}

export async function getUserFromToken(token: string): Promise<User | null> {
  try {
    const { userId } = verifyToken(token);
    return await getUserById(userId);
  } catch (error) {
    return null;
  }
}

// Middleware to verify JWT token
export async function withAuth(
  handler: (req: any, res: any, user: User) => Promise<void>
) {
  return async (req: any, res: any) => {
    try {
      const token = req.headers.authorization?.replace('Bearer ', '');
      
      if (!token) {
        return res.status(401).json({ error: 'Authentication required' });
      }

      const user = await getUserFromToken(token);
      
      if (!user) {
        return res.status(401).json({ error: 'Invalid token' });
      }

      return handler(req, res, user);
    } catch (error) {
      return res.status(401).json({ error: 'Authentication failed' });
    }
  };
}

// Social auth types
export interface SocialAuthProvider {
  name: 'google' | 'twitter';
  id: string;
  email: string;
  displayName: string;
  photoUrl?: string;
}

// Function to handle social authentication
export async function handleSocialAuth(provider: SocialAuthProvider) {
  // In a real implementation, this would:
  // 1. Check if user exists with this social id
  // 2. Create new user if they don't exist
  // 3. Generate and return JWT token
  
  const users = await getUserById(provider.id);
  
  if (users) {
    return generateToken(users.id);
  }
  
  // Create new user logic would go here
  // For now, we'll just throw an error
  throw new Error('User not found');
}
