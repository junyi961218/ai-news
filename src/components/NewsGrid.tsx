'use client'

import { useReadNews } from '@/hooks/useReadNews'
import NewsCard from './NewsCard'
import type { News } from '@/lib/supabase'

interface NewsGridProps {
  news: News[]
  columns?: 2 | 3
}

export default function NewsGrid({ news, columns = 3 }: NewsGridProps) {
  const { markAsRead, isRead } = useReadNews()

  const gridCols =
    columns === 2
      ? 'md:grid-cols-2'
      : 'md:grid-cols-2 lg:grid-cols-3'

  return (
    <div className={`grid ${gridCols} gap-5`}>
      {news.map((item, index) => (
        <NewsCard
          key={item.id}
          news={item}
          index={index}
          isRead={isRead(item.id)}
          onRead={() => markAsRead(item.id)}
        />
      ))}
    </div>
  )
}
