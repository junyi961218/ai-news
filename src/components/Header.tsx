import Link from 'next/link'

const categories = [
  { name: '首页', slug: '' },
  { name: '大模型', slug: '大模型' },
  { name: '行业动态', slug: '行业动态' },
  { name: 'X观点', slug: 'X观点' },
]

export default function Header() {
  return (
    <header className="bg-primary text-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">🤖</span>
            <span className="text-xl font-bold magazine-title">AI News</span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-6">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={cat.slug ? `/?category=${encodeURIComponent(cat.slug)}` : '/'}
                className="text-sm font-medium hover:text-accent transition-colors"
              >
                {cat.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm hover:text-accent transition-colors"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}
