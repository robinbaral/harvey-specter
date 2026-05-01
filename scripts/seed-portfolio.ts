import { getCliClient } from 'sanity/cli'

const client = getCliClient({ apiVersion: '2026-04-30' })

const items = [
  { _id: 'portfolio-surfers-paradise', title: 'Surfers Paradise', tags: ['Social Media', 'Photography'], order: 1 },
  { _id: 'portfolio-cyberpunk-caffe', title: 'Cyberpunk Caffe', tags: ['Social Media', 'Photography'], order: 2 },
  { _id: 'portfolio-agency-976', title: 'Agency 976', tags: ['Branding', 'Campaign'], order: 3 },
  { _id: 'portfolio-minimal-playground', title: 'Minimal Playground', tags: ['Editorial', 'Photography'], order: 4 },
]

async function seed() {
  for (const item of items) {
    await client.createOrReplace({
      _type: 'portfolio',
      _id: item._id,
      title: item.title,
      slug: { _type: 'slug', current: item._id.replace('portfolio-', '') },
      tags: item.tags,
      order: item.order,
    })
    console.log(`Created: ${item.title}`)
  }
  console.log('Done.')
}

seed().catch(console.error)
