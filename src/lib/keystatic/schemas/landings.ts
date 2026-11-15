import { fields, singleton } from '@keystatic/core';
import { metaFields } from './shared';

export function makeLandingSingleton(
  locale: string,
  landingKey: string,
  label: string,
  opts?: { keystone?: boolean }
) {
  const keystone = fields.object(
    {
      title: fields.text({ label: 'Section title' }),
      missionLabel: fields.text({ label: 'Mission label' }),
      mission: fields.text({ label: 'Mission', multiline: true }),
      text: fields.text({
        label: 'KEYSTONE text',
        multiline: true,
        description: 'Write the platform name as KEYSTONE; it is highlighted automatically.',
      }),
    },
    {
      label: 'KEYSTONE',
      description:
        'Optional section shown after the hero. Leave the title or the text empty to hide it.',
    }
  );

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
      ...(opts?.keystone ? { keystone } : {}),
    },
  });
}
