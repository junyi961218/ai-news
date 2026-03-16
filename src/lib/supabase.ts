import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type News = {
  id: string
  title: string
  description: string | null
  content: string | null
  url: string
  source: string
  sourceType: string
  author: string | null
  publishedAt: string
  category: string
  imageUrl: string | null
  createdAt: string
}
