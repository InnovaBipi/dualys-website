import { config, collection, fields } from '@keystatic/core';

// ─── Factory for locale-specific recursos collections ────────
function makeRecursosCollection(locale: string, label: string) {
  return collection({
    label,
    slugField: 'title',
    path: `content/recursos/${locale}/*/`,
    format: { contentField: 'content' },
    schema: {
      title: fields.slug({
        name: { label: 'Title', validation: { isRequired: true } },
      }),
      summary: fields.text({
        label: 'Summary',
        multiline: true,
        validation: { isRequired: true },
      }),
      publishedAt: fields.date({ label: 'Published Date' }),
      category: fields.select({
        label: 'Category',
        options: [
          { value: 'market', label: 'Market Analysis' },
          { value: 'guides', label: 'Guides & Tutorials' },
          { value: 'cases', label: 'Transition Cases' },
          { value: 'opinion', label: 'Opinion & Trends' },
        ],
        defaultValue: 'market',
      }),
      coverImage: fields.image({
        label: 'Cover Image',
        directory: 'public/images/recursos',
        publicPath: '/images/recursos',
      }),
      featured: fields.checkbox({
        label: 'Featured',
        defaultValue: false,
      }),
      author: fields.text({
        label: 'Author',
        defaultValue: 'Dualys',
      }),
      draft: fields.checkbox({
        label: 'Draft',
        defaultValue: true,
      }),
      content: fields.markdoc({ label: 'Content' }),
    },
  });
}

// ─── Config ──────────────────────────────────────────────────
export default config({
  storage:
    process.env.NODE_ENV === 'development'
      ? { kind: 'local' }
      : {
          kind: 'github',
          repo: { owner: 'InnovaBipi', name: 'dualys-website' },
        },
  ui: {
    brand: { name: 'Dualys CMS' },
    navigation: {
      'Recursos (CA)': ['recursos_ca'],
      'Recursos (ES)': ['recursos_es'],
      'Recursos (EN)': ['recursos_en'],
      'Recursos (FR)': ['recursos_fr'],
    },
  },
  collections: {
    recursos_ca: makeRecursosCollection('ca', 'Recursos (Català)'),
    recursos_es: makeRecursosCollection('es', 'Recursos (Español)'),
    recursos_en: makeRecursosCollection('en', 'Resources (English)'),
    recursos_fr: makeRecursosCollection('fr', 'Ressources (Français)'),
  },
});
