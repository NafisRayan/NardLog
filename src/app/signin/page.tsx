"use client";

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { AuthForm } from '@/components/auth/AuthForm';
import { useAuth } from '@/lib/context/AuthContext';

export default function SignIn() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { signIn, isLoading, user } = useAuth();

  // Get the redirect path from URL params
  const from = searchParams.get('from') || '/';

  // If user is already authenticated, redirect
  useEffect(() => {
    if (user && !isLoading) {
      router.push(from);
    }
  }, [user, isLoading, router, from]);

  const handleSignIn = async (data: { email: string; password: string }) => {
    try {
      await signIn(data.email, data.password);
      router.push(from); // Redirect to the original requested page
    } catch (error) {
      throw error;
    }
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600" />
          <p className="text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  // Don't render the form if user is authenticated
  if (user) {
    return null;
  }

  return (
    <div className="animate-fade-in">
      <AuthForm mode="signin" onSubmit={handleSignIn} />
    </div>
  );
}
