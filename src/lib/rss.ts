interface RSSSource {
  name: string
  url: string
  type: 'official' | 'media' | 'twitter'
  category: string
}

export const RSS_SOURCES: RSSSource[] = [
  // 官方博客
  { name: 'OpenAI', url: 'https://openai.com/blog/rss.xml', type: 'official', category: '大模型' },
  { name: 'Anthropic', url: 'https://www.anthropic.com/rss', type: 'official', category: '大模型' },
  { name: 'Google DeepMind', url: 'https://blog.google/technology/ai/rss', type: 'official', category: '大模型' },
  { name: 'Meta AI', url: 'https://ai.meta.com/feed/feed.xml', type: 'official', category: '大模型' },
  { name: 'Gemini', url: 'https://blog.google/technology/ai/gemini/rss', type: 'official', category: '大模型' },
  
  // 中文媒体
  { name: '36kr', url: 'https://www.36kr.com/information/AI/feed', type: 'media', category: '行业动态' },
  { name: '机器之心', url: 'https://www.jiqizhixin.com/feed', type: 'media', category: '行业动态' },
  { name: '量子位', url: 'https://www.qbitai.com/feed', type: 'media', category: '行业动态' },
  
  // 英文媒体
  { name: 'TechCrunch', url: 'https://techcrunch.com/category/artificial-intelligence/feed', type: 'media', category: '行业动态' },
  { name: 'Wired', url: 'https://www.wired.com/feed/tag/ai/latest/rss', type: 'media', category: '行业动态' },
  
  // X 大佬 (通过 RSSHub)
  { name: 'Sam Altman', url: 'https://rsshub.app/twitter/user/sama', type: 'twitter', category: 'X观点' },
  { name: 'Yann LeCun', url: 'https://rsshub.app/twitter/user/ylecun', type: 'twitter', category: 'X观点' },
  { name: 'Demis Hassabis', url: 'https://rsshub.app/twitter/user/demis_hassabis', type: 'twitter', category: 'X观点' },
  { name: 'Andrej Karpathy', url: 'https://rsshub.app/twitter/user/karpathy', type: 'twitter', category: 'X观点' },
  { name: 'Andrew Ng', url: 'https://rsshub.app/twitter/user/andrewYNg', type: 'twitter', category: 'X观点' },
  { name: 'Jim Fan', url: 'https://rsshub.app/twitter/user/JimFan_', type: 'twitter', category: 'X观点' },
  { name: 'Lex Fridman', url: 'https://rsshub.app/twitter/user/lexfridman', type: 'twitter', category: 'X观点' },
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
