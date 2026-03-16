import Link from 'next/link'
import { formatDistanceToNow } from 'date-fns'
import { zhCN } from 'date-fns/locale'
import type { News } from '@/lib/supabase'

interface NewsCardProps {
  news: News
  featured?: boolean
}

function getCategoryClass(sourceType: string) {
  switch (sourceType) {
    case 'official':
      return 'category-official'
    case 'media':
      return 'category-media'
    case 'twitter':
      return 'category-twitter'
    default:
      return 'bg-gray-100 text-gray-700'
  }
}

export default function NewsCard({ news, featured = false }: NewsCardProps) {
  const timeAgo = formatDistanceToNow(new Date(news.publishedAt), {
    addSuffix: true,
    locale: zhCN,
  })

  if (featured) {
    return (
      <Link
        href={news.url}
        target="_blank"
        rel="noopener noreferrer"
        className="group block"
      >
        <div className="relative overflow-hidden rounded-2xl bg-white shadow-lg card-hover">
          {news.imageUrl && (
            <div className="aspect-video overflow-hidden">
              <img
                src={news.imageUrl}
                alt={news.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          )}
          <div className="p-6">
            <div className="flex items-center gap-3 mb-3">
              <span className={`category-tag ${getCategoryClass(news.sourceType)}`}>
                {news.source}
              </span>
              <span className="text-sm text-gray-500">{timeAgo}</span>
            </div>
            <h2 className="text-2xl font-bold text-dark group-hover:text-accent transition-colors mb-2 magazine-title">
              {news.title}
            </h2>
            {news.description && (
              <p className="text-gray-600 line-clamp-2">{news.description}</p>
            )}
          </div>
        </div>
      </Link>
    )
  }

  return (
    <Link
      href={news.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block"
    >
      <div className="bg-white rounded-xl shadow-sm overflow-hidden card-hover h-full">
        {news.imageUrl && (
          <div className="aspect-video overflow-hidden">
            <img
              src={news.imageUrl}
              alt={news.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}
        <div className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className={`category-tag ${getCategoryClass(news.sourceType)}`}>
              {news.source}
            </span>
            <span className="text-xs text-gray-400">{timeAgo}</span>
          </div>
          <h3 className="font-semibold text-dark group-hover:text-accent transition-colors line-clamp-2">
            {news.title}
          </h3>
          {news.description && (
            <p className="text-sm text-gray-500 mt-2 line-clamp-2">
              {news.description}
            </p>
          )}
        </div>
      </div>
    </Link>
  )
}
