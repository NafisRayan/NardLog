import { Suspense } from 'react';
import { getArticles } from '@/lib/utils/data-access';
import { ArticleCard } from '@/components/articles/ArticleCard';

export const revalidate = 60; // Revalidate every minute

async function ArticleList() {
  const articles = await getArticles();
  const publishedArticles = articles.filter(article => !article.isDraft);

  if (publishedArticles.length === 0) {
    return (
      <div className="text-center py-10">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">No articles yet</h2>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Be the first to write an article!
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {publishedArticles.map(article => (
        <ArticleCard key={article.id} article={article} />
      ))}
    </div>
  );
}

function ArticleListSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden animate-pulse"
        >
          <div className="h-48 bg-gray-200 dark:bg-gray-700" />
          <div className="p-6 space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700" />
              <div className="flex-1">
                <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded" />
                <div className="h-3 w-16 bg-gray-200 dark:bg-gray-700 rounded mt-2" />
              </div>
            </div>
            <div className="h-6 w-3/4 bg-gray-200 dark:bg-gray-700 rounded" />
            <div className="h-16 bg-gray-200 dark:bg-gray-700 rounded" />
            <div className="flex justify-between">
              <div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded" />
              <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Latest Articles
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Discover the latest articles from our community
        </p>
      </header>

      <Suspense fallback={<ArticleListSkeleton />}>
        <ArticleList />
      </Suspense>
    </div>
  );
}
