import { fields, singleton } from '@keystatic/core';
import { metaFields } from './shared';

export function makeContactSingleton(locale: string, label: string) {
  return singleton({
    label,
    path: `content/pages/contact/${locale}`,
    format: 'yaml',
    schema: {
      meta: metaFields(),
      title: fields.text({ label: 'Page Title', validation: { isRequired: true } }),
      subtitle: fields.text({ label: 'Subtitle', multiline: true }),
      info: fields.object(
        {
          title: fields.text({ label: 'Info Section Title' }),
          addressTitle: fields.text({ label: 'Address Label' }),
          addressLine1: fields.text({ label: 'Address Line 1' }),
          addressLine2: fields.text({ label: 'Address Line 2' }),
          emailTitle: fields.text({ label: 'Email Label' }),
          emailValue: fields.text({ label: 'Email Address' }),
        },
        { label: 'Contact Info' }
      ),
    },
  });
}
