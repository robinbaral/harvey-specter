import { client }          from '@/sanity/lib/client'
import { ARTICLES_QUERY }  from '@/sanity/lib/queries'
import NewsContent         from './NewsContent'

export const revalidate = 60

export type SanityArticle = {
  _id: string
  title: string
  slug: { current: string }
  featured: boolean
  category: string
  publishedAt: string
  imageUrl: string | null
  excerpt: string
}

export default async function NewsPage() {
  const articles: SanityArticle[] = await client.fetch(ARTICLES_QUERY)
  const featured  = articles.find((a) => a.featured) ?? articles[0] ?? null
  const secondary = articles.filter((a) => a._id !== featured?._id)
  return <NewsContent featured={featured} articles={secondary} total={articles.length} />
}
