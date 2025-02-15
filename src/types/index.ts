export interface User {
  id: string;
  email: string;
  name: string;
  bio?: string;
  avatar?: string;
  createdAt: string;
  followers: string[];
  following: string[];
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  authorId: string;
  featuredImage?: string;
  tags: string[];
  isDraft: boolean;
  createdAt: string;
  updatedAt: string;
  comments: string[];
  claps: number;
}

export interface Comment {
  id: string;
  content: string;
  articleId: string;
  authorId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Bookmark {
  userId: string;
  articleId: string;
  createdAt: string;
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
}

export interface FormData {
  title: string;
  content: string;
  excerpt: string;
  tags: string[];
  featuredImage?: string;
  isDraft: boolean;
  authorId: string;
  slug: string;
}

export interface AuthContextType {
  user: User | null;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  loading: boolean;
}

export interface ThemeContextType {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}
