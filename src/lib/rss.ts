interface RSSSource {
  name: string
  url: string
  type: 'official' | 'media' | 'twitter'
  category: string
}

export const RSS_SOURCES: RSSSource[] = [
  // 官方博客
  { name: 'OpenAI', url: 'https://openai.com/blog/rss.xml', type: 'official', category: '大模型' },
  { name: 'Google AI', url: 'https://blog.google/technology/ai/rss', type: 'official', category: '大模型' },
  
  // 中文媒体
  { name: '36kr', url: 'https://www.36kr.com/information/AI/feed', type: 'media', category: '行业动态' },
  { name: '量子位', url: 'https://www.qbitai.com/feed', type: 'media', category: '行业动态' },
  
  // 英文媒体
  { name: 'TechCrunch', url: 'https://techcrunch.com/category/artificial-intelligence/feed', type: 'media', category: '行业动态' },
  { name: 'Wired', url: 'https://www.wired.com/feed/tag/ai/latest/rss', type: 'media', category: '行业动态' },
  { name: 'The Verge', url: 'https://www.theverge.com/rss/ai/index.xml', type: 'media', category: '行业动态' },
  { name: 'MIT News', url: 'https://news.mit.edu/rss/topic/artificial-intelligence2', type: 'media', category: '行业动态' },
  
  // X 大佬 (通过 nitter.net)
  { name: 'Sam Altman', url: 'https://nitter.net/sama/rss', type: 'twitter', category: 'X观点' },
  { name: 'Yann LeCun', url: 'https://nitter.net/ylecun/rss', type: 'twitter', category: 'X观点' },
  { name: 'Demis Hassabis', url: 'https://nitter.net/demis_hassabis/rss', type: 'twitter', category: 'X观点' },
  { name: 'Andrej Karpathy', url: 'https://nitter.net/karpathy/rss', type: 'twitter', category: 'X观点' },
  { name: 'Andrew Ng', url: 'https://nitter.net/andrewYNg/rss', type: 'twitter', category: 'X观点' },
  { name: 'Jim Fan', url: 'https://nitter.net/JimFan_/rss', type: 'twitter', category: 'X观点' },
  { name: 'Lex Fridman', url: 'https://nitter.net/lexfridman/rss', type: 'twitter', category: 'X观点' },
  { name: 'Jeff Dean', url: 'https://nitter.net/JeffDean/rss', type: 'twitter', category: 'X观点' },
  { name: 'Dario Amodei', url: 'https://nitter.net/darioamodei/rss', type: 'twitter', category: 'X观点' },
]

export interface ParsedItem {
  title: string
  description: string | null
  content: string | null
  url: string
  author: string | null
  publishedAt: Date
  imageUrl: string | null
}
