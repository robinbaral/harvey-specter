import type { StructureResolver } from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.documentTypeListItem('portfolio').title('Portfolio'),
      S.documentTypeListItem('service').title('Services'),
      S.documentTypeListItem('article').title('News & Articles'),
    ])
