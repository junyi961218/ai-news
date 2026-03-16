import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'

export const metadata: Metadata = {
  title: 'AI News - 最新AI资讯聚合',
  description: '聚合OpenAI、Google、Anthropic等大模型厂商最新动态，以及36kr、机器之心等媒体报道，还有X平台AI大佬观点',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body className="min-h-screen bg-light">
        <Header />
        <main>{children}</main>
        <footer className="py-8 text-center text-sm text-gray-500 border-t">
          <p>AI News - 每天为您聚合最新的AI资讯</p>
        </footer>
      </body>
    </html>
  )
}
