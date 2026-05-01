import { client }         from '@/sanity/lib/client'
import { SERVICES_QUERY } from '@/sanity/lib/queries'
import ServicesContent    from './ServicesContent'

export const revalidate = 60

export type SanityService = {
  _id: string
  num: string
  title: string
  slug: { current: string }
  description: string
  deliverables: string[]
  imageUrl: string | null
  imagePosition: string | null
  duration: string
  order: number
}

export default async function ServicesPage() {
  const services: SanityService[] = await client.fetch(SERVICES_QUERY)
  return <ServicesContent services={services} />
}
