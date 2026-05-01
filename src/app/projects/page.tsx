import { client }          from '@/sanity/lib/client'
import { PORTFOLIO_QUERY } from '@/sanity/lib/queries'
import ProjectsContent     from './ProjectsContent'

export const revalidate = 60

export type SanityProject = {
  _id: string
  title: string
  slug: { current: string }
  imageUrl: string | null
  category: string
  tags: string[]
  year: string
  featured: boolean
  order: number
}

export default async function ProjectsPage() {
  const projects: SanityProject[] = await client.fetch(PORTFOLIO_QUERY)
  return <ProjectsContent projects={projects} />
}
