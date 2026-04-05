import { fields, singleton } from '@keystatic/core';
import { metaFields } from './shared';

export function makeNosotrosSingleton(locale: string, label: string) {
  return singleton({
    label,
    path: `content/pages/nosotros/${locale}`,
    format: 'yaml',
    schema: {
      meta: metaFields(),
      title: fields.text({ label: 'Page Title', validation: { isRequired: true } }),
      subtitle: fields.text({ label: 'Subtitle', multiline: true }),
      narrative: fields.object(
        {
          paragraph1: fields.text({ label: 'Paragraph 1', multiline: true }),
          paragraph2: fields.text({ label: 'Paragraph 2', multiline: true }),
          vision: fields.text({ label: 'Vision Statement', multiline: true }),
        },
        { label: 'Company Narrative' }
      ),
      founders: fields.object(
        {
          title: fields.text({ label: 'Section Title' }),
          profiles: fields.array(
            fields.object({
              title: fields.text({ label: 'Profile Title' }),
              text: fields.text({ label: 'Profile Description', multiline: true }),
            }),
            {
              label: 'Founder Profiles',
              itemLabel: (props) => props.fields.title.value || 'Profile',
            }
          ),
        },
        { label: 'Founders Section' }
      ),
      vision: fields.object(
        {
          title: fields.text({ label: 'Section Title' }),
          phases: fields.array(
            fields.object({
              title: fields.text({ label: 'Phase Title (with years)' }),
              text: fields.text({ label: 'Phase Description', multiline: true }),
            }),
            {
              label: 'Vision Phases',
              itemLabel: (props) => props.fields.title.value || 'Phase',
            }
          ),
        },
        { label: 'Vision Section' }
      ),
      cta: fields.text({ label: 'CTA Text' }),
    },
  });
}
