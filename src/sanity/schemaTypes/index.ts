import type { SchemaTypeDefinition } from 'sanity'
import { portfolioType } from './portfolio'
import { serviceType }   from './service'
import { articleType }   from './article'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [portfolioType, serviceType, articleType],
}
