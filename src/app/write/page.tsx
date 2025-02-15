"use client";

import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '@/lib/context/AuthContext';
import { getArticleBySlug, createArticle, updateArticle } from '@/lib/utils/data-access';
import { ArticleForm } from '@/components/articles/ArticleForm';
import { FormData, Article } from '@/types';
import { useEffect, useState } from 'react';

export default function WritePage() {
  const router = useRouter();
  const { user } = useAuth();
  const { slug } = useParams();
  const [article, setArticle] = useState<Article | undefined>(undefined);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticle = async () => {
      if (slug) {
        try {
          const slugString = Array.isArray(slug) ? slug[0] : slug;
          const fetchedArticle = await getArticleBySlug(slugString);
          if (fetchedArticle) {
            // Verify article ownership
            if (fetchedArticle.authorId !== user?.id) {
              setError("You don't have permission to edit this article");
              return;
            }
            setArticle(fetchedArticle);
            setIsEditing(true);
          } else {
            setError("Article not found");
          }
        } catch (err) {
          setError("Failed to load article");
          console.error(err);
        }
      }
      setIsLoading(false);
    };

    if (user) {
      fetchArticle();
    }
  }, [slug, user]);

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="bg-red-50 dark:bg-red-900/50 text-red-700 dark:text-red-200 p-4 rounded-md">
          Please sign in to continue
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600" />
          <p className="text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="bg-red-50 dark:bg-red-900/50 text-red-700 dark:text-red-200 p-4 rounded-md">
          {error}
        </div>
      </div>
    );
  }

  const handleSubmit = async (formData: FormData) => {
    try {
      setError(null);
      const data = {
        ...formData,
        authorId: user.id,
      };

      if (isEditing && article) {
        const updated = await updateArticle({
          ...article,
          ...data,
        });
        if (!updated) {
          throw new Error("Failed to update article");
        }
      } else {
        const created = await createArticle({
          ...data,
          slug: formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
        });
        if (!created) {
          throw new Error("Failed to create article");
        }
      }
      router.push('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      console.error(err);
    }
  };

  return (
    <div className="animate-fade-in px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">
          {isEditing ? 'Edit Article' : 'Create New Article'}
        </h1>
        {error && (
          <div className="mb-4 p-4 bg-red-50 dark:bg-red-900/50 text-red-700 dark:text-red-200 rounded-md">
            {error}
          </div>
        )}
        <ArticleForm article={article} onSubmit={handleSubmit} />
      </div>
    </div>
  );
}
