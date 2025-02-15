"use client";

import React from 'react';
import { Navbar } from './Navbar';
import { ThemeProvider } from '@/lib/context/ThemeContext';
import { AuthProvider } from '@/lib/context/AuthContext';

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <ThemeProvider>
        <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
          <Navbar />
          <main className="pt-16 min-h-screen">
            <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              {children}
            </div>
          </main>
          <footer className="bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
            <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="text-center text-gray-600 dark:text-gray-400">
                <p>© {new Date().getFullYear()} Medium Clone. All rights reserved.</p>
              </div>
            </div>
          </footer>
        </div>
      </ThemeProvider>
    </AuthProvider>
  );
}
