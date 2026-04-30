import { type SchemaTypeDefinition } from 'sanity'
import { portfolioType } from './portfolio'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [portfolioType],
}
