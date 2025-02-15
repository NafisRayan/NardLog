export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) {
    return text;
  }
  return text.slice(0, maxLength) + '...';
}

export function formatReadingTime(content: string): string {
  const wordsPerMinute = 200;
  const wordCount = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  return `${minutes} min read`;
}

export function formatUsername(name: string): string {
  return name.toLowerCase().replace(/\s+/g, '');
}

export function formatSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export function formatClaps(count: number): string {
  if (count < 1000) {
    return count.toString();
  }
  if (count < 1000000) {
    return `${(count / 1000).toFixed(1)}K`;
  }
  return `${(count / 1000000).toFixed(1)}M`;
}

export function formatTimeAgo(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  let interval = Math.floor(seconds / 31536000);
  if (interval >= 1) {
    return `${interval} year${interval === 1 ? '' : 's'} ago`;
  }
  
  interval = Math.floor(seconds / 2592000);
  if (interval >= 1) {
    return `${interval} month${interval === 1 ? '' : 's'} ago`;
  }
  
  interval = Math.floor(seconds / 86400);
  if (interval >= 1) {
    return `${interval} day${interval === 1 ? '' : 's'} ago`;
  }
  
  interval = Math.floor(seconds / 3600);
  if (interval >= 1) {
    return `${interval} hour${interval === 1 ? '' : 's'} ago`;
  }
  
  interval = Math.floor(seconds / 60);
  if (interval >= 1) {
    return `${interval} minute${interval === 1 ? '' : 's'} ago`;
  }
  
  return 'just now';
}
