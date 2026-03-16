import { supabase, News } from '@/lib/supabase'
import NewsGrid from '@/components/NewsGrid'
import FeaturedCard from '@/components/FeaturedCard'

async function getNews(category?: string): Promise<News[]> {
  let query = supabase
    .from('news')
    .select('*')
    .order('published_at', { ascending: false })
    .limit(100)

  if (category) {
    query = query.eq('category', category)
  }

  const { data, error } = await query

  if (error) {
    console.error('Error fetching news:', error)
    return []
  }

  return (data as any as News[]) || []
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

  const groupedByCategory = remainingNews.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = []
    }
    acc[item.category].push(item)
    return acc
  }, {} as Record<string, News[]>)

  const totalCount = allNews.length

  return (
    <div className="relative min-h-screen">
      {/* Ambient background effects */}
      <div className="ambient-glow bg-primary top-0 -left-40" />
      <div className="ambient-glow bg-accent-pink top-1/3 -right-40" />
      <div className="ambient-glow bg-accent-cyan bottom-0 left-1/3" />

      {/* Hero Section */}
      <section className="relative pt-12 pb-6 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
            <div>
              {category ? (
                <>
                  <div className="flex items-center gap-3 mb-2">
                    <a
                      href="/"
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      ← 返回首页
                    </a>
                  </div>
                  <h1 className="text-3xl sm:text-4xl font-bold tracking-tight gradient-text">
                    {category}
                  </h1>
                </>
              ) : (
                <>
                  <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-2">
                    今日{' '}
                    <span className="gradient-text">AI 资讯</span>
                  </h1>
                  <p className="text-muted-foreground text-base">
                    聚合 OpenAI、Google、Anthropic 等前沿动态，实时追踪行业脉搏
                  </p>
                </>
              )}
            </div>
            {totalCount > 0 && (
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg glass text-sm text-muted-foreground shrink-0">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 22h14a2 2 0 0 0 2-2V7.5L14.5 2H6a2 2 0 0 0-2 2v4" />
                  <polyline points="14 2 14 8 20 8" />
                  <path d="m3 15 2 2 4-4" />
                </svg>
                共 {totalCount} 条资讯
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Featured */}
      {featuredNews && !category && (
        <section className="relative px-4 sm:px-6 mb-12">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px flex-1 bg-gradient-to-r from-primary/50 to-transparent" />
              <h2 className="text-sm font-semibold text-primary uppercase tracking-widest flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
                </span>
                头条推荐
              </h2>
              <div className="h-px flex-1 bg-gradient-to-l from-primary/50 to-transparent" />
            </div>
            <FeaturedCard news={featuredNews} />
          </div>
        </section>
      )}

      {/* Category-filtered view */}
      {category ? (
        <section className="relative px-4 sm:px-6 pb-20">
          <div className="max-w-7xl mx-auto">
            <NewsGrid news={allNews} />
          </div>
        </section>
      ) : (
        <>
          {/* Latest section */}
          {remainingNews.length > 0 && (
            <section className="relative px-4 sm:px-6 mb-16">
              <div className="max-w-7xl mx-auto">
                <h2 className="section-heading text-foreground mb-6 flex items-center gap-3">
                  <span className="text-lg">⚡</span>
                  最新资讯
                </h2>
                <NewsGrid news={remainingNews.slice(0, 6)} />
              </div>
            </section>
          )}

          {/* Grouped by category */}
          {Object.entries(groupedByCategory).map(
            ([catName, news]) => (
              <section key={catName} className="relative px-4 sm:px-6 mb-16">
                <div className="max-w-7xl mx-auto">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="section-heading text-foreground flex items-center gap-3">
                      <span className="w-1 h-6 rounded-full bg-hero-gradient" />
                      {catName}
                    </h2>
                    <a
                      href={`/?category=${encodeURIComponent(catName)}`}
                      className="group flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-primary transition-colors duration-200"
                    >
                      查看全部
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="transform group-hover:translate-x-0.5 transition-transform duration-200"
                      >
                        <path d="m9 18 6-6-6-6" />
                      </svg>
                    </a>
                  </div>
                  <NewsGrid news={news.slice(0, 6)} />
                </div>
              </section>
            )
          )}
        </>
      )}

      {/* Empty state */}
      {allNews.length === 0 && (
        <div className="flex flex-col items-center justify-center py-32 px-4 animate-fade-in">
          <div className="relative mb-6">
            <div className="w-20 h-20 rounded-2xl bg-secondary flex items-center justify-center text-4xl animate-float">
              📰
            </div>
            <div className="absolute -inset-2 rounded-2xl bg-primary/10 blur-xl" />
          </div>
          <h3 className="text-xl font-semibold text-foreground mb-2">
            暂无资讯
          </h3>
          <p className="text-muted-foreground text-center max-w-sm">
            正在抓取最新 AI 资讯，请稍后再来...
          </p>
        </div>
      )}
    </div>
  )
}
