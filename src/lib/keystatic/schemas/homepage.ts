import { fields, singleton } from '@keystatic/core';
import { metaFields, ctaFields } from './shared';

export function makeHomepageSingleton(locale: string, label: string) {
  return singleton({
    label,
    path: `content/pages/homepage/${locale}`,
    format: 'yaml',
    schema: {
      meta: metaFields(),
      hero: fields.object(
        {
          title: fields.text({ label: 'Title', multiline: true, validation: { isRequired: true } }),
          subtitle: fields.text({ label: 'Subtitle', multiline: true }),
          cta: fields.text({ label: 'Primary CTA' }),
          ctaSecondary: fields.text({ label: 'Secondary CTA' }),
          contextNote: fields.text({ label: 'Context Note (badge)' }),
        },
        { label: 'Hero Section' }
      ),
      context: fields.object(
        {
          title: fields.text({ label: 'Section Title' }),
          paragraph1: fields.text({ label: 'Paragraph 1', multiline: true }),
          paragraph2: fields.text({ label: 'Paragraph 2', multiline: true }),
          paragraph3: fields.text({ label: 'Paragraph 3', multiline: true }),
          stats: fields.array(
            fields.object({
              value: fields.text({ label: 'Value (e.g. 800.000 M€)' }),
              label: fields.text({ label: 'Label' }),
            }),
            {
              label: 'Statistics',
              itemLabel: (props) => props.fields.label.value || 'Stat',
            }
          ),
        },
        { label: 'Context Section (Por qué ahora)' }
      ),
      audience: fields.object(
        {
          title: fields.text({ label: 'Section Title' }),
          cards: fields.array(
            fields.object({
              key: fields.text({ label: 'Key (industrial/tech/empreses)' }),
              title: fields.text({ label: 'Card Title' }),
              description: fields.text({ label: 'Description', multiline: true }),
              cta: fields.text({ label: 'CTA Text' }),
            }),
            {
              label: 'Audience Cards',
              itemLabel: (props) => props.fields.title.value || 'Card',
            }
          ),
        },
        { label: 'Audience Section' }
      ),
      messages: fields.object(
        {
          title: fields.text({ label: 'Section Title' }),
          items: fields.array(
            fields.object({
              title: fields.text({ label: 'Message Title' }),
              text: fields.text({ label: 'Message Text', multiline: true }),
            }),
            {
              label: 'Key Messages',
              itemLabel: (props) => props.fields.title.value || 'Message',
            }
          ),
        },
        { label: 'Key Messages Section' }
      ),
      verticals: fields.object(
        {
          title: fields.text({ label: 'Section Title' }),
          subtitle: fields.text({ label: 'Subtitle' }),
          cta: fields.text({ label: 'CTA Text' }),
          items: fields.array(
            fields.object({
              key: fields.text({ label: 'Key (terrestrial/naval/...)' }),
              title: fields.text({ label: 'Vertical Title' }),
              description: fields.text({ label: 'Short Description' }),
            }),
            {
              label: 'Vertical Cards',
              itemLabel: (props) => props.fields.title.value || 'Vertical',
            }
          ),
        },
        { label: 'Verticals Section' }
      ),
      team: fields.object(
        {
          title: fields.text({ label: 'Section Title' }),
          text: fields.text({ label: 'Team Description', multiline: true }),
          cta: fields.text({ label: 'CTA Text' }),
        },
        { label: 'Team Trust Section' }
      ),
      cta: ctaFields('Final CTA Section'),
    },
  });
}
