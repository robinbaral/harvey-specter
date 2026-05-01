export const PORTFOLIO_QUERY = `
  *[_type == "portfolio"] | order(order asc, _createdAt asc) {
    _id,
    title,
    slug,
    "imageUrl": coalesce(image.asset->url, externalImageUrl),
    category,
    tags,
    year,
    featured,
    order
  }
`

export const SERVICES_QUERY = `
  *[_type == "service"] | order(order asc, _createdAt asc) {
    _id,
    num,
    title,
    slug,
    description,
    deliverables,
    "imageUrl": coalesce(image.asset->url, externalImageUrl),
    imagePosition,
    duration,
    order
  }
`

export const ARTICLES_QUERY = `
  *[_type == "article"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    featured,
    category,
    publishedAt,
    "imageUrl": coalesce(image.asset->url, externalImageUrl),
    excerpt
  }
`
