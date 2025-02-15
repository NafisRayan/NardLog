import Link from 'next/link';
import Image from 'next/image';
import { Article } from '@/types';
import { formatDate, formatClaps } from '@/lib/utils/format';
import { getUserById } from '@/lib/utils/data-access';

interface ArticleCardProps {
  article: Article;
}

export async function ArticleCard({ article }: ArticleCardProps) {
  const author = await getUserById(article.authorId);
  
  if (!author) {
    return null;
  }

  return (
    <article className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-all hover:shadow-lg">
      {article.featuredImage && (
        <div className="relative w-full h-48">
          <Image
            src={article.featuredImage}
            alt={article.title}
            fill
            className="object-cover"
          />
        </div>
      )}
      
      <div className="p-6">
        <header className="mb-4">
          <div className="flex items-center space-x-2 mb-2">
            <div className="relative w-8 h-8 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700">
              {author.avatar ? (
                <Image
                  src={author.avatar}
                  alt={author.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-500 dark:text-gray-400 text-sm font-medium">
                  {author.name.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
            <div>
              <Link 
                href={`/profile/${author.id}`}
                className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              >
                {author.name}
              </Link>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {formatDate(article.createdAt)}
              </p>
            </div>
          </div>
          
          <Link href={`/article/${article.slug}`}>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white hover:text-green-600 dark:hover:text-green-400">
              {article.title}
            </h2>
          </Link>
        </header>

        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
          {article.excerpt}
        </p>

        <footer className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              className="flex items-center text-gray-500 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400"
              title="Clap for this article"
            >
              👏 <span className="ml-1">{formatClaps(article.claps)}</span>
            </button>
            <span className="flex items-center text-gray-500 dark:text-gray-400">
              💬 {article.comments.length}
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            {article.tags.slice(0, 3).map(tag => (
              <Link
                key={tag}
                href={`/tag/${tag}`}
                className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600"
              >
                {tag}
              </Link>
            ))}
            {article.tags.length > 3 && (
              <span className="text-xs text-gray-500 dark:text-gray-400">
                +{article.tags.length - 3}
              </span>
            )}
          </div>
        </footer>

        {article.isDraft && (
          <div className="mt-4 py-1 px-2 bg-yellow-100 dark:bg-yellow-900/50 text-yellow-800 dark:text-yellow-200 text-xs rounded inline-block">
            Draft
          </div>
        )}
      </div>
    </article>
  );
}
