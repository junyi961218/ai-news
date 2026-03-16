import Link from 'next/link'
import { formatDistanceToNow, isToday } from 'date-fns'
import { zhCN } from 'date-fns/locale'
import type { News } from '@/lib/supabase'

interface NewsCardProps {
  news: News
  featured?: boolean
  index?: number
  isRead?: boolean
  onRead?: () => void
}

function getTagClass(sourceType: string) {
  switch (sourceType) {
    case 'official':
      return 'tag-official'
    case 'media':
      return 'tag-media'
    case 'twitter':
      return 'tag-twitter'
    default:
      return 'tag-default'
  }
}

function getSourceIcon(sourceType: string) {
  switch (sourceType) {
    case 'official':
      return '🏢'
    case 'media':
      return '📰'
    case 'twitter':
      return '𝕏'
    default:
      return '📄'
  }
}

export default function NewsCard({
  news,
  featured = false,
  index = 0,
  isRead = false,
  onRead,
}: NewsCardProps) {
  const publishDate = new Date(news.published_at)
  const timeAgo = formatDistanceToNow(publishDate, {
    addSuffix: true,
    locale: zhCN,
  })
  const isNewToday = isToday(publishDate)
  const isTwitter = news.source_type === 'twitter'

  const animationDelay = `${Math.min(index * 80, 400)}ms`

  if (featured) {
    return (
      <Link
        href={news.url}
        target="_blank"
        rel="noopener noreferrer"
        className="group block animate-fade-in-up"
        onClick={onRead}
      >
        <div
          className={`featured-card transition-all duration-500 ease-out ${
            isRead ? 'opacity-55' : ''
          }`}
        >
          <div className="relative z-10">
            {/* Top accent line */}
            <div
              className={`h-[2px] ${
                isRead
                  ? 'bg-muted-foreground/30'
                  : 'bg-hero-gradient'
              }`}
            />

            <div className="flex flex-col lg:flex-row">
              {/* Image */}
              {news.image_url && (
                <div className="lg:w-1/2 aspect-video lg:aspect-auto overflow-hidden relative">
                  <img
                    src={news.image_url}
                    alt={news.title}
                    className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out ${
                      isRead ? 'grayscale-[40%]' : ''
                    }`}
                  />
                  {isRead && (
                    <div className="absolute inset-0 bg-background/30" />
                  )}
                </div>
              )}

              {/* Content */}
              <div
                className={`flex-1 p-6 lg:p-8 flex flex-col justify-center ${
                  !news.image_url ? 'lg:p-12' : ''
                }`}
              >
                <div className="flex items-center gap-3 mb-4">
                  {isRead ? (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-muted-foreground/10 text-muted-foreground border border-muted-foreground/20">
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      已读
                    </span>
                  ) : (
                    isNewToday && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-primary/20 text-primary border border-primary/30">
                        <span className="relative flex h-1.5 w-1.5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary" />
                        </span>
                        今日最新
                      </span>
                    )
                  )}
                  <span className={`tag ${getTagClass(news.source_type)}`}>
                    {getSourceIcon(news.source_type)} {news.source}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {timeAgo}
                  </span>
                </div>

                <h2
                  className={`text-2xl lg:text-3xl font-bold transition-colors duration-300 mb-3 tracking-tight leading-tight ${
                    isRead
                      ? 'text-muted-foreground line-through decoration-muted-foreground/30 decoration-1'
                      : 'text-foreground group-hover:text-primary'
                  }`}
                >
                  {news.title}
                </h2>

                {news.description && (
                  <p
                    className={`leading-relaxed ${
                      isRead
                        ? 'text-muted-foreground/60'
                        : 'text-muted-foreground'
                    } ${isTwitter ? '' : 'line-clamp-3'}`}
                  >
                    {news.description}
                  </p>
                )}

                <div className="mt-6 flex items-center gap-2 text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span>{isRead ? '再次阅读' : '阅读全文'}</span>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="transform group-hover:translate-x-1 transition-transform duration-300"
                  >
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
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
      className="group block opacity-0 animate-fade-in-up"
      style={{ animationDelay, animationFillMode: 'forwards' }}
      onClick={onRead}
    >
      <div
        className={`news-card h-full flex flex-col transition-all duration-300 ${
          isTwitter ? 'border-purple-500/20' : ''
        } ${isRead ? 'opacity-55' : ''}`}
      >
        {/* Image */}
        {news.image_url && (
          <div className="aspect-video overflow-hidden relative">
            <img
              src={news.image_url}
              alt={news.title}
              className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out ${
                isRead ? 'grayscale-[40%]' : ''
              }`}
            />
            {isRead && (
              <div className="absolute inset-0 bg-background/30" />
            )}
          </div>
        )}

        {/* Content */}
        <div className="p-5 flex flex-col flex-1">
          {/* Meta row */}
          <div className="flex items-center gap-2 mb-3">
            <span className={`tag ${getTagClass(news.source_type)}`}>
              {getSourceIcon(news.source_type)} {news.source}
            </span>
            {isRead ? (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-muted-foreground/10 text-muted-foreground border border-muted-foreground/20">
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                已读
              </span>
            ) : (
              isNewToday && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-primary/15 text-primary border border-primary/25">
                  <span className="w-1 h-1 rounded-full bg-primary animate-pulse" />
                  NEW
                </span>
              )
            )}
            <span className="text-xs text-muted-foreground ml-auto">
              {timeAgo}
            </span>
          </div>

          {/* Title */}
          <h3
            className={`font-semibold transition-colors duration-300 line-clamp-2 leading-snug mb-2 ${
              isRead
                ? 'text-muted-foreground line-through decoration-muted-foreground/30 decoration-1'
                : 'text-card-foreground group-hover:text-primary'
            }`}
          >
            {news.title}
          </h3>

          {/* Description */}
          {news.description && (
            <p
              className={`text-sm leading-relaxed flex-1 ${
                isRead
                  ? 'text-muted-foreground/50'
                  : 'text-muted-foreground'
              } ${isTwitter ? '' : 'line-clamp-2'}`}
            >
              {news.description}
            </p>
          )}

          {/* Bottom row */}
          <div className="mt-4 pt-3 border-t border-border/50 flex items-center justify-between">
            <span className="text-xs text-muted-foreground">
              {news.category}
            </span>
            <span className="flex items-center gap-1 text-xs font-medium text-muted-foreground group-hover:text-primary transition-colors duration-300">
              {isRead ? '再读' : '阅读'}
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transform group-hover:translate-x-0.5 transition-transform duration-300"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}
