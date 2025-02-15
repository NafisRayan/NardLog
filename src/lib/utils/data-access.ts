import { promises as fs } from 'fs';
import path from 'path';
import { User, Article, Comment, Bookmark, Tag } from '@/types';

const DATA_DIR = path.join(process.cwd(), 'src/lib/data');

// Generic function to read JSON file
async function readJsonFile<T>(filename: string): Promise<T[]> {
  try {
    const filePath = path.join(DATA_DIR, filename);
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data) as T[];
  } catch (error) {
    console.error(`Error reading ${filename}:`, error);
    return [];
  }
}

// Generic function to write JSON file
async function writeJsonFile<T>(filename: string, data: T[]): Promise<boolean> {
  try {
    const filePath = path.join(DATA_DIR, filename);
    await fs.writeFile(filePath, JSON.stringify(data, null, 2));
    return true;
  } catch (error) {
    console.error(`Error writing ${filename}:`, error);
    return false;
  }
}

// Helper function to generate unique slug
async function generateUniqueSlug(baseSlug: string): Promise<string> {
  const articles = await getArticles();
  let slug = baseSlug;
  let counter = 1;

  while (articles.some(article => article.slug === slug)) {
    slug = `${baseSlug}-${counter}`;
    counter++;
  }

  return slug;
}

// User operations
export async function getUsers(): Promise<User[]> {
  return readJsonFile<User>('users.json');
}

export async function getUserById(id: string): Promise<User | undefined> {
  const users = await getUsers();
  return users.find(user => user.id === id);
}

export async function createUser(user: Omit<User, 'id' | 'createdAt'>): Promise<User | undefined> {
  const users = await getUsers();
  const newUser: User = {
    ...user,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    followers: [],
    following: []
  };

  const success = await writeJsonFile('users.json', [...users, newUser]);
  return success ? newUser : undefined;
}

// Article operations
export async function getArticles(): Promise<Article[]> {
  return readJsonFile<Article>('articles.json');
}

export async function getArticleBySlug(slug: string): Promise<Article | undefined> {
  const articles = await getArticles();
  return articles.find(article => article.slug === slug);
}

export async function createArticle(article: Omit<Article, 'id' | 'createdAt' | 'updatedAt' | 'comments' | 'claps'>): Promise<Article | undefined> {
  const articles = await getArticles();
  const uniqueSlug = await generateUniqueSlug(article.slug);
  
  const newArticle: Article = {
    ...article,
    slug: uniqueSlug,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    comments: [],
    claps: 0
  };

  const success = await writeJsonFile('articles.json', [...articles, newArticle]);
  return success ? newArticle : undefined;
}

export async function getArticlesByUserId(userId: string): Promise<Article[]> {
  const articles = await getArticles();
  return articles.filter(article => article.authorId === userId);
}

export async function updateArticle(article: Article): Promise<Article | undefined> {
  const articles = await getArticles();
  const index = articles.findIndex(a => a.id === article.id);
  if (index === -1) {
    return undefined;
  }

  // Keep the same slug if it hasn't changed
  if (article.slug !== articles[index].slug) {
    article.slug = await generateUniqueSlug(article.slug);
  }

  articles[index] = {
    ...article,
    updatedAt: new Date().toISOString()
  };
  
  const success = await writeJsonFile('articles.json', articles);
  return success ? articles[index] : undefined;
}

// Comment operations
export async function getComments(): Promise<Comment[]> {
  return readJsonFile<Comment>('comments.json');
}

export async function createComment(comment: Omit<Comment, 'id' | 'createdAt' | 'updatedAt'>): Promise<Comment | undefined> {
  const comments = await getComments();
  const newComment: Comment = {
    ...comment,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  const success = await writeJsonFile('comments.json', [...comments, newComment]);
  return success ? newComment : undefined;
}

// Bookmark operations
export async function getBookmarks(): Promise<Bookmark[]> {
  return readJsonFile<Bookmark>('bookmarks.json');
}

export async function createBookmark(bookmark: Omit<Bookmark, 'createdAt'>): Promise<Bookmark | undefined> {
  const bookmarks = await getBookmarks();
  const newBookmark: Bookmark = {
    ...bookmark,
    createdAt: new Date().toISOString()
  };

  const success = await writeJsonFile('bookmarks.json', [...bookmarks, newBookmark]);
  return success ? newBookmark : undefined;
}

// Backup functionality
export async function createBackup(): Promise<boolean> {
  try {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupDir = path.join(DATA_DIR, 'backups', timestamp);

    await fs.mkdir(backupDir, { recursive: true });

    const files = ['users.json', 'articles.json', 'comments.json', 'bookmarks.json'];

    await Promise.all(
      files.map(async (file) => {
        const data = await fs.readFile(path.join(DATA_DIR, file), 'utf-8');
        await fs.writeFile(path.join(backupDir, file), data);
      })
    );

    return true;
  } catch (error) {
    console.error('Error creating backup:', error);
    return false;
  }
}

// Search functionality
export async function searchArticles(query: string): Promise<Article[]> {
  const articles = await getArticles();
  const searchTerms = query.toLowerCase().split(' ');

  return articles.filter(article => {
    const searchText = `${article.title} ${article.content} ${article.excerpt}`.toLowerCase();
    return searchTerms.every(term => searchText.includes(term));
  });
}
