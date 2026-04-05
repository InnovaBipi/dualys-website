import { fields, singleton } from '@keystatic/core';
import { metaFields } from './shared';

export function makeSectoresSingleton(locale: string, label: string) {
  return singleton({
    label,
    path: `content/pages/sectores/${locale}`,
    format: 'yaml',
    schema: {
      meta: metaFields(),
      title: fields.text({ label: 'Page Title', validation: { isRequired: true } }),
      subtitle: fields.text({ label: 'Subtitle', multiline: true }),
      intro: fields.text({ label: 'Introduction', multiline: true }),
      originSection: fields.object(
        {
          title: fields.text({ label: 'Title' }),
          subtitle: fields.text({ label: 'Subtitle' }),
        },
        { label: 'Origin Section (De dónde vienes)' }
      ),
      cta: fields.text({ label: 'CTA Text' }),
    },
  });
}

function verticalField() {
  return fields.object({
    title: fields.text({ label: 'Title', validation: { isRequired: true } }),
    description: fields.text({ label: 'Description', multiline: true }),
    meta: metaFields(),
    subcategories: fields.array(
      fields.object({
        key: fields.text({ label: 'Key' }),
        title: fields.text({ label: 'Subcategory Title' }),
        description: fields.text({ label: 'Subcategory Description' }),
      }),
      {
        label: 'Subcategories',
        itemLabel: (props) => props.fields.title.value || 'Subcategory',
      }
    ),
  });
}

export function makeSectoresVerticalsSingleton(locale: string, label: string) {
  return singleton({
    label,
    path: `content/pages/sectores-verticals/${locale}`,
    format: 'yaml',
    schema: {
      terrestrial: verticalField(),
      naval: verticalField(),
      aeronautics: verticalField(),
      aerospace: verticalField(),
      c4isr: verticalField(),
      cyber: verticalField(),
      uav: verticalField(),
      armament: verticalField(),
      simulation: verticalField(),
      auxiliary: verticalField(),
    },
  });
}
