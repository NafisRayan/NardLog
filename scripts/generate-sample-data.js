const fs = require('fs').promises;
const path = require('path');
const crypto = require('crypto');

const DATA_DIR = path.join(process.cwd(), 'src/lib/data');

const users = [
  {
    id: crypto.randomUUID(),
    email: 'john@example.com',
    name: 'John Doe',
    bio: 'Software engineer and technical writer',
    createdAt: new Date().toISOString(),
    followers: [],
    following: []
  },
  {
    id: crypto.randomUUID(),
    email: 'jane@example.com',
    name: 'Jane Smith',
    bio: 'Full-stack developer and UI/UX enthusiast',
    createdAt: new Date().toISOString(),
    followers: [],
    following: []
  }
];

const articles = [
  {
    id: crypto.randomUUID(),
    title: 'Getting Started with Next.js',
    slug: 'getting-started-with-nextjs',
    content: `Next.js is a powerful framework for building React applications. It provides features like server-side rendering, static site generation, and API routes out of the box.

In this article, we'll explore the basics of Next.js and how to create your first application.

## Installation

To create a new Next.js app, run:

\`\`\`bash
npx create-next-app@latest my-app
\`\`\`

## Key Features

1. File-system based routing
2. Server-side rendering
3. API Routes
4. Built-in CSS support

Stay tuned for more Next.js tutorials!`,
    excerpt: 'Learn how to build modern web applications with Next.js, the React framework for production.',
    authorId: users[0].id,
    featuredImage: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=400&fit=crop',
    tags: ['nextjs', 'react', 'webdev'],
    isDraft: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    comments: [],
    claps: 42
  },
  {
    id: crypto.randomUUID(),
    title: 'Understanding TypeScript with React',
    slug: 'understanding-typescript-with-react',
    content: `TypeScript adds static typing to JavaScript, making your code more robust and maintainable. When used with React, it provides excellent type safety and developer experience.

## Why TypeScript?

TypeScript helps catch errors early in development and provides better tooling support.

## Getting Started

Install TypeScript in your React project:

\`\`\`bash
npm install typescript @types/react @types/react-dom
\`\`\`

## Key Concepts

1. Interface vs Type
2. Generic Types
3. Union Types
4. Type Inference

Learn these concepts to become a TypeScript pro!`,
    excerpt: 'Discover how TypeScript can improve your React development experience with static typing and better tooling.',
    authorId: users[1].id,
    featuredImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop',
    tags: ['typescript', 'react', 'javascript'],
    isDraft: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    comments: [],
    claps: 27
  }
];

const comments = [];
const bookmarks = [];

async function generateSampleData() {
  try {
    // Ensure data directory exists
    await fs.mkdir(DATA_DIR, { recursive: true });

    // Write sample data to JSON files
    await fs.writeFile(
      path.join(DATA_DIR, 'users.json'),
      JSON.stringify(users, null, 2)
    );
    await fs.writeFile(
      path.join(DATA_DIR, 'articles.json'),
      JSON.stringify(articles, null, 2)
    );
    await fs.writeFile(
      path.join(DATA_DIR, 'comments.json'),
      JSON.stringify(comments, null, 2)
    );
    await fs.writeFile(
      path.join(DATA_DIR, 'bookmarks.json'),
      JSON.stringify(bookmarks, null, 2)
    );

    console.log('Sample data generated successfully!');
  } catch (error) {
    console.error('Error generating sample data:', error);
    process.exit(1);
  }
}

generateSampleData();
