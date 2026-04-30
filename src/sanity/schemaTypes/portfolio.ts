import { defineField, defineType } from 'sanity'

export const portfolioType = defineType({
  name: 'portfolio',
  title: 'Portfolio',
  type: 'document',
  fields: [
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
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Photography', value: 'Photography' },
          { title: 'Social Media', value: 'Social Media' },
          { title: 'Branding', value: 'Branding' },
          { title: 'Film', value: 'Film' },
          { title: 'Editorial', value: 'Editorial' },
          { title: 'Campaign', value: 'Campaign' },
        ],
      },
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      description: 'Controls display order on the homepage (lower = first)',
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
    select: {
      title: 'title',
      media: 'image',
      subtitle: 'tags',
    },
    prepare({ title, media, subtitle }) {
      return {
        title,
        media,
        subtitle: Array.isArray(subtitle) ? subtitle.join(', ') : subtitle,
      }
    },
  },
})
