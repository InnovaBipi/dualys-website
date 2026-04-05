import { fields, singleton } from '@keystatic/core';
import { metaFields } from './shared';

export function makeServiciosSingleton(locale: string, label: string) {
  return singleton({
    label,
    path: `content/pages/servicios/${locale}`,
    format: 'yaml',
    schema: {
      meta: metaFields(),
      title: fields.text({ label: 'Page Title', validation: { isRequired: true } }),
      subtitle: fields.text({ label: 'Subtitle', multiline: true }),
      program: fields.object(
        {
          name: fields.text({ label: 'Program Name' }),
          fullName: fields.text({ label: 'Full Name' }),
          description: fields.text({ label: 'Description', multiline: true }),
        },
        { label: 'Program FFD' }
      ),
      cta: fields.text({ label: 'CTA Text' }),
    },
  });
}
