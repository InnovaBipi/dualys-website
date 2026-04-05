import { fields, singleton } from '@keystatic/core';
import { metaFields } from './shared';

export function makeLegalSingleton(
  locale: string,
  pageKey: string,
  label: string
) {
  return singleton({
    label,
    path: `content/pages/legal-${pageKey}/${locale}`,
    format: 'yaml',
    schema: {
      meta: metaFields(),
      title: fields.text({ label: 'Page Title', validation: { isRequired: true } }),
      lastUpdated: fields.text({ label: 'Last Updated Text' }),
      sections: fields.array(
        fields.object({
          key: fields.text({ label: 'Section Key' }),
          title: fields.text({ label: 'Section Title' }),
          content: fields.text({ label: 'Section Content', multiline: true }),
        }),
        {
          label: 'Sections',
          itemLabel: (props) => props.fields.title.value || 'Section',
        }
      ),
    },
  });
}
