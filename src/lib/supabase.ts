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
  source_type: string
  author: string | null
  published_at: string
  category: string
  image_url: string | null
  created_at: string
}
