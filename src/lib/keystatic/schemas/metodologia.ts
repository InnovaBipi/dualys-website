import { fields, singleton } from '@keystatic/core';
import { metaFields } from './shared';

export function makeMetodologiaSingleton(locale: string, label: string) {
  return singleton({
    label,
    path: `content/pages/metodologia/${locale}`,
    format: 'yaml',
    schema: {
      meta: metaFields(),
      title: fields.text({ label: 'Page Title', validation: { isRequired: true } }),
      subtitle: fields.text({ label: 'Subtitle' }),
      description: fields.text({ label: 'Description', multiline: true }),
      phases: fields.array(
        fields.object({
          title: fields.text({ label: 'Phase Title' }),
          description: fields.text({ label: 'Phase Description', multiline: true }),
        }),
        {
          label: 'Phases',
          itemLabel: (props) => props.fields.title.value || 'Phase',
        }
      ),
      nda: fields.text({ label: 'NDA Note', multiline: true }),
      cta: fields.text({ label: 'CTA Text' }),
    },
  });
}
