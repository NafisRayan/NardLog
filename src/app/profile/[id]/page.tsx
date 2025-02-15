"use client";

import { useParams } from 'next/navigation';
import { useAuth } from '@/lib/context/AuthContext';
import { getUserById, getArticlesByUserId } from '@/lib/utils/data-access';
import { ArticleCard } from '@/components/articles/ArticleCard';

export default async function ProfilePage() {
  const { id } = useParams();
  const { user } = useAuth();

  if (!user || user.id !== id) {
    return <div>Unauthorized</div>;
  }

  const userData = await getUserById(id);
  const articles = await getArticlesByUserId(id);

  if (!userData) {
    return <div>User not found</div>;
  }

  return (
    <div className="animate-fade-in">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center space-x-4">
          {userData.image ? (
            <img
              src={userData.image}
              alt={userData.name}
              className="w-16 h-16 rounded-full"
            />
          ) : (
            <div className="w-16 h-16 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-400 text-2xl font-medium">
              {userData.name[0].toUpperCase()}
            </div>
          )}
          <div>
            <h1 className="text-2xl font-bold">{userData.name}</h1>
            <p className="text-gray-600 dark:text-gray-400">{userData.bio}</p>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-semibold">Articles</h2>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
