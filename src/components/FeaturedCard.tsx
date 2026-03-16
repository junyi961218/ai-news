'use client'

import { useReadNews } from '@/hooks/useReadNews'
import NewsCard from './NewsCard'
import type { News } from '@/lib/supabase'

interface FeaturedCardProps {
  news: News
}

export default function FeaturedCard({ news }: FeaturedCardProps) {
  const { markAsRead, isRead } = useReadNews()

  return (
    <NewsCard
      news={news}
      featured
      isRead={isRead(news.id)}
      onRead={() => markAsRead(news.id)}
    />
  )
}
