import { fields } from '@keystatic/core';

/** Reusable meta fields for SEO */
export function metaFields() {
  return fields.object(
    {
      title: fields.text({ label: 'Meta Title', validation: { isRequired: true } }),
      description: fields.text({
        label: 'Meta Description',
        multiline: true,
        validation: { isRequired: true },
      }),
    },
    { label: 'SEO Metadata' }
  );
}

/** Reusable CTA section fields */
export function ctaFields(label = 'CTA Section') {
  return fields.object(
    {
      title: fields.text({ label: 'Title', validation: { isRequired: true } }),
      subtitle: fields.text({ label: 'Subtitle', multiline: true }),
      button: fields.text({ label: 'Primary Button' }),
      buttonSecondary: fields.text({ label: 'Secondary Button' }),
    },
    { label }
  );
}
