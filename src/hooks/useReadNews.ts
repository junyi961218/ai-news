'use client'

import { useState, useEffect, useCallback } from 'react'

const STORAGE_KEY = 'ai-news-read-ids'

function getReadIds(): Set<string> {
  if (typeof window === 'undefined') return new Set()
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return new Set()
    return new Set(JSON.parse(raw))
  } catch {
    return new Set()
  }
}

function saveReadIds(ids: Set<string>) {
  try {
    // 只保留最近 500 条，避免无限膨胀
    const arr = Array.from(ids).slice(-500)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(arr))
  } catch {
    // localStorage 满了或不可用，静默失败
  }
}

export function useReadNews() {
  const [readIds, setReadIds] = useState<Set<string>>(new Set())

  // 初始化时从 localStorage 读取
  useEffect(() => {
    setReadIds(getReadIds())
  }, [])

  const markAsRead = useCallback((id: string) => {
    setReadIds((prev) => {
      const next = new Set(prev)
      next.add(id)
      saveReadIds(next)
      return next
    })
  }, [])

  const isRead = useCallback(
    (id: string) => readIds.has(id),
    [readIds]
  )

  return { readIds, markAsRead, isRead }
}
