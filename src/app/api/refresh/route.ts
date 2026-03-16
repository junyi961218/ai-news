import { NextResponse } from 'next/server'
import Parser from 'rss-parser'
import { supabase } from '@/lib/supabase'
import { RSS_SOURCES } from '@/lib/rss'

const parser = new Parser()

async function fetchAndSaveNews() {
  const results = {
    savedCount: 0,
    failed: 0,
    errors: [] as string[],
  }

  for (const source of RSS_SOURCES) {
    try {
      const feed = await parser.parseURL(source.url)
      
      for (const item of feed.items.slice(0, 20)) {
        if (!item.link) continue
        
        const title = item.title || ''
        const description = item.contentSnippet || ''
        
        // 对于Twitter类型，只保留原创推文（不含RT）
        if (source.type === 'twitter') {
          if (title.startsWith('RT ') || description.startsWith('RT ')) {
            continue
          }
        }

        const { error } = await supabase.from('news').upsert(
          {
            title: item.title || '无标题',
            description: item.contentSnippet?.substring(0, 500) || null,
            content: item.content || null,
            url: item.link,
            source: source.name,
            source_type: source.type,
            author: item.creator || item.author || null,
            published_at: item.pubDate ? new Date(item.pubDate) : new Date(),
            category: source.category,
            image_url: null,
          },
          { onConflict: 'url' }
        )

        if (error) {
          results.failed++
          results.errors.push(`${source.name}: ${error.message}`)
        } else {
          results.savedCount++
        }
      }
    } catch (err) {
      results.failed++
      results.errors.push(`${source.name}: ${(err as Error).message}`)
    }
  }

  return results
}

export async function POST() {
  try {
    const results = await fetchAndSaveNews()
    return NextResponse.json({
      success: true,
      data: results,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    )
  }
}

export async function GET() {
  return POST()
}
