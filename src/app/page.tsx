import { supabase, News } from '@/lib/supabase'
import NewsCard from '@/components/NewsCard'

async function getNews(category?: string) {
  let query = supabase
    .from('news')
    .select('*')
    .order('publishedAt', { ascending: false })
    .limit(50)

  if (category) {
    query = query.eq('category', category)
  }

  const { data, error } = await query

  if (error) {
    console.error('Error fetching news:', error)
    return []
  }

  return data || []
}

export default async function Home({
  searchParams,
}: {
  searchParams: { category?: string }
}) {
  const category = searchParams.category
  const allNews = await getNews(category)

  const featuredNews = allNews[0]
  const remainingNews = allNews.slice(1)

  const groupedByCategory = remainingNews.reduce((acc, news) => {
    if (!acc[news.category]) {
      acc[news.category] = []
    }
    acc[news.category].push(news)
    return acc
  }, {} as Record<string, News[]>)

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {featuredNews && (
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-gray-500 mb-4 flex items-center gap-2">
            <span className="w-2 h-2 bg-accent rounded-full animate-pulse"></span>
            头版头条
          </h2>
          <NewsCard news={featuredNews} featured />
        </section>
      )}

      {!category && (
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 magazine-title">最新资讯</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {remainingNews.slice(0, 6).map((news) => (
              <NewsCard key={news.id} news={news} />
            ))}
          </div>
        </section>
      )}

      {category ? (
        <section>
          <h2 className="text-2xl font-bold mb-6 magazine-title">{category}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allNews.map((news) => (
              <NewsCard key={news.id} news={news} />
            ))}
          </div>
        </section>
      ) : (
        Object.entries(groupedByCategory).map(([catName, news]) => (
          <section key={catName} className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold magazine-title">{catName}</h2>
              <a
                href={`/?category=${encodeURIComponent(catName)}`}
                className="text-accent hover:underline text-sm font-medium"
              >
                查看全部 →
              </a>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {news.slice(0, 6).map((item) => (
                <NewsCard key={item.id} news={item} />
              ))}
            </div>
          </section>
        ))
      )}

      {allNews.length === 0 && (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">📰</div>
          <h3 className="text-xl font-semibold text-gray-600 mb-2">暂无资讯</h3>
          <p className="text-gray-500">
            正在抓取最新AI资讯，请稍后再来...
          </p>
        </div>
      )}
    </div>
  )
}
