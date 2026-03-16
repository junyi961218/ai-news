import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'

export const metadata: Metadata = {
  title: 'AI News — 最新AI资讯聚合',
  description:
    '聚合 OpenAI、Google、Anthropic 等大模型厂商最新动态，以及36kr、机器之心等媒体报道，还有X平台AI大佬观点',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN" className="dark">
      <body className="min-h-screen bg-background text-foreground overflow-x-hidden">
        {/* Background canvas pattern */}
        <div className="fixed inset-0 dot-pattern opacity-30 pointer-events-none" />

        <div className="relative z-10">
          <Header />
          <main>{children}</main>

          {/* Footer */}
          <footer className="relative border-t border-border/50 mt-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-md bg-gradient-to-br from-primary to-accent-pink flex items-center justify-center">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-white"
                    >
                      <path d="M12 2L2 7l10 5 10-5-10-5z" />
                      <path d="M2 17l10 5 10-5" />
                      <path d="M2 12l10 5 10-5" />
                    </svg>
                  </div>
                  <span className="text-sm font-semibold gradient-text">
                    AI News
                  </span>
                </div>

                <p className="text-xs text-muted-foreground text-center">
                  每天为您聚合最新的 AI 资讯 · 数据来源自各大 AI 厂商及权威媒体
                </p>

                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-foreground transition-colors"
                  >
                    GitHub
                  </a>
                  <span className="w-px h-3 bg-border" />
                  <span>© 2026</span>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}
