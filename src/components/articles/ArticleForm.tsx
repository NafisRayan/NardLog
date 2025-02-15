"use client";

import { FormEvent, useState } from 'react';
import { Article, FormData } from '@/types';

interface ArticleFormProps {
  article?: Article;
  onSubmit: (data: FormData) => Promise<void>;
}

export function ArticleForm({ article, onSubmit }: ArticleFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    title: article?.title || '',
    content: article?.content || '',
    excerpt: article?.excerpt || '',
    tags: article?.tags || [],
    featuredImage: article?.featuredImage || '',
    isDraft: article?.isDraft ?? false,
    authorId: article?.authorId || '',
    slug: article?.slug || '',
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await onSubmit(formData);
    } catch (error) {
      console.error('Failed to submit article:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTagsChange = (value: string) => {
    const tags = value.split(',').map(tag => tag.trim()).filter(Boolean);
    setFormData(prev => ({ ...prev, tags }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="title" className="block text-sm font-medium mb-2">
          Title
        </label>
        <input
          type="text"
          id="title"
          required
          value={formData.title}
          onChange={e => setFormData(prev => ({ ...prev, title: e.target.value }))}
          className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-500 dark:bg-gray-800 dark:border-gray-700"
          placeholder="Enter article title"
        />
      </div>

      <div>
        <label htmlFor="excerpt" className="block text-sm font-medium mb-2">
          Excerpt
        </label>
        <textarea
          id="excerpt"
          required
          value={formData.excerpt}
          onChange={e => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
          className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-500 dark:bg-gray-800 dark:border-gray-700"
          rows={3}
          placeholder="Enter a brief excerpt"
        />
      </div>

      <div>
        <label htmlFor="content" className="block text-sm font-medium mb-2">
          Content
        </label>
        <textarea
          id="content"
          required
          value={formData.content}
          onChange={e => setFormData(prev => ({ ...prev, content: e.target.value }))}
          className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-500 dark:bg-gray-800 dark:border-gray-700"
          rows={12}
          placeholder="Write your article content here..."
        />
      </div>

      <div>
        <label htmlFor="tags" className="block text-sm font-medium mb-2">
          Tags (comma-separated)
        </label>
        <input
          type="text"
          id="tags"
          value={formData.tags.join(', ')}
          onChange={e => handleTagsChange(e.target.value)}
          className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-500 dark:bg-gray-800 dark:border-gray-700"
          placeholder="tech, programming, web development"
        />
      </div>

      <div>
        <label htmlFor="featuredImage" className="block text-sm font-medium mb-2">
          Featured Image URL
        </label>
        <input
          type="url"
          id="featuredImage"
          value={formData.featuredImage}
          onChange={e => setFormData(prev => ({ ...prev, featuredImage: e.target.value }))}
          className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-500 dark:bg-gray-800 dark:border-gray-700"
          placeholder="https://example.com/image.jpg"
        />
      </div>

      <div className="flex items-center space-x-4">
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={formData.isDraft}
            onChange={e => setFormData(prev => ({ ...prev, isDraft: e.target.checked }))}
            className="rounded border-gray-300 text-green-600 focus:ring-green-500 dark:border-gray-600"
          />
          <span className="text-sm font-medium">Save as draft</span>
        </label>

        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Saving...' : article ? 'Update Article' : 'Publish Article'}
        </button>
      </div>
    </form>
  );
}
