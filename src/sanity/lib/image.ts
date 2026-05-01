import imageUrlBuilder from '@sanity/image-url'
import { dataset, projectId } from '../env'

const builder = imageUrlBuilder({ projectId, dataset })

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const urlFor = (source: any) => builder.image(source)
