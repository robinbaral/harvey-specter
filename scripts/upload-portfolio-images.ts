import { getCliClient } from 'sanity/cli'

const client = getCliClient({ apiVersion: '2026-04-30' })

const items = [
  {
    _id: 'portfolio-surfers-paradise',
    imageUrl: 'https://www.figma.com/api/mcp/asset/e373f8fb-f3ff-4de2-a3b5-a9dfee66c7a9',
    filename: 'surfers-paradise.jpg',
  },
  {
    _id: 'portfolio-cyberpunk-caffe',
    imageUrl: 'https://www.figma.com/api/mcp/asset/17401e18-08c2-458f-be91-91c0169570d4',
    filename: 'cyberpunk-caffe.jpg',
  },
  {
    _id: 'portfolio-agency-976',
    imageUrl: 'https://www.figma.com/api/mcp/asset/55e5c3af-8aa6-4434-825b-12fe9bc65cc6',
    filename: 'agency-976.jpg',
  },
  {
    _id: 'portfolio-minimal-playground',
    imageUrl: 'https://www.figma.com/api/mcp/asset/9c45316d-d95b-457e-a737-e9fc134083d5',
    filename: 'minimal-playground.jpg',
  },
]

async function uploadImages() {
  for (const item of items) {
    console.log(`Fetching ${item.filename}...`)
    const res = await fetch(item.imageUrl)
    if (!res.ok) throw new Error(`Failed to fetch ${item.imageUrl}: ${res.status}`)
    const buffer = Buffer.from(await res.arrayBuffer())

    console.log(`Uploading ${item.filename} to Sanity...`)
    const asset = await client.assets.upload('image', buffer, {
      filename: item.filename,
      contentType: res.headers.get('content-type') || 'image/jpeg',
    })

    console.log(`Patching document ${item._id}...`)
    await client.patch(item._id).set({
      image: {
        _type: 'image',
        asset: { _type: 'reference', _ref: asset._id },
      },
    }).commit()

    console.log(`Done: ${item.filename}`)
  }
  console.log('All images uploaded.')
}

uploadImages().catch(console.error)
