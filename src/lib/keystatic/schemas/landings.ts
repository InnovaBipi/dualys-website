import { fields, singleton } from '@keystatic/core';
import { metaFields } from './shared';

export function makeLandingSingleton(
  locale: string,
  landingKey: string,
  label: string
) {
  return singleton({
    label,
    path: `content/pages/landing-${landingKey}/${locale}`,
    format: 'yaml',
    schema: {
      meta: metaFields(),
      title: fields.text({ label: 'Title', validation: { isRequired: true } }),
      subtitle: fields.text({ label: 'Subtitle', multiline: true }),
      valueProps: fields.array(
        fields.object({
          text: fields.text({ label: 'Value Proposition' }),
        }),
        {
          label: 'Value Propositions',
          itemLabel: (props) => props.fields.text.value || 'Prop',
        }
      ),
      cta: fields.text({ label: 'CTA Text' }),
    },
  });
}
