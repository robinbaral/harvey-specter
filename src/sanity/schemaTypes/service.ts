import { defineField, defineType } from 'sanity'

export const serviceType = defineType({
  name: 'service',
  title: 'Service',
  type: 'document',
  fields: [
    defineField({
      name: 'num',
      title: 'Number',
      type: 'string',
      description: 'Display number, e.g. [ 1 ], [ 2 ]…',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title' },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'deliverables',
      title: 'Deliverables',
      type: 'array',
      of: [{ type: 'string' }],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'image',
      title: 'Image (upload)',
      type: 'image',
      options: { hotspot: true },
      description: 'Upload a high-res image. Overrides the URL field below.',
    }),
    defineField({
      name: 'externalImageUrl',
      title: 'Image URL (external fallback)',
      type: 'url',
      description: 'Used when no image is uploaded above.',
    }),
    defineField({
      name: 'imagePosition',
      title: 'Image position',
      type: 'string',
      options: {
        list: [
          { title: 'Center', value: 'object-center' },
          { title: 'Bottom', value: 'object-bottom' },
          { title: 'Top',    value: 'object-top' },
        ],
      },
      initialValue: 'object-center',
    }),
    defineField({
      name: 'duration',
      title: 'Typical Duration',
      type: 'string',
      description: 'e.g. "2 – 3 weeks" or "Ongoing retainer"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      description: 'Display order — lower numbers appear first',
    }),
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  preview: {
    select: { title: 'title', media: 'image', subtitle: 'num' },
    prepare({ title, media, subtitle }) {
      return { title: `${subtitle} — ${title}`, media }
    },
  },
})
