import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { KeystoneSection } from '@/components/content/KeystoneSection';

const content = {
  title: 'Dualys for Primes and contractors',
  missionLabel: 'Mission',
  mission: 'We support Procurement and Supply Chain teams.',
  text: 'Our approach is powered by KEYSTONE, Dualys’ proprietary Business Intelligence platform.',
};

describe('KeystoneSection', () => {
  it('renders the title as an h2', () => {
    render(<KeystoneSection content={content} />);
    expect(
      screen.getByRole('heading', { level: 2, name: content.title })
    ).toBeInTheDocument();
  });

  it('renders the mission label and the mission text', () => {
    render(<KeystoneSection content={content} />);
    expect(screen.getByText('Mission')).toBeInTheDocument();
    expect(screen.getByText(content.mission)).toBeInTheDocument();
  });

  it('wraps KEYSTONE in <strong> inside the text, without injecting HTML', () => {
    const { container } = render(<KeystoneSection content={content} />);
    const strong = container.querySelectorAll('strong');
    expect(strong).toHaveLength(1);
    expect(strong[0]).toHaveTextContent('KEYSTONE');
    const paragraph = strong[0].closest('p');
    expect(paragraph?.textContent).toBe(content.text);
  });

  it('escapes markup coming from content', () => {
    const { container } = render(
      <KeystoneSection content={{ ...content, text: 'KEYSTONE <b>x</b>' }} />
    );
    expect(container.querySelector('b')).toBeNull();
    expect(screen.getByText(/<b>x<\/b>/)).toBeInTheDocument();
  });

  it('labels the section with its heading', () => {
    render(<KeystoneSection content={content} />);
    expect(screen.getByRole('region', { name: content.title })).toBeInTheDocument();
  });

  it('omits the mission block when there is no mission', () => {
    render(<KeystoneSection content={{ ...content, mission: '' }} />);
    expect(screen.queryByText('Mission')).not.toBeInTheDocument();
  });

  it.each([
    ['undefined content', undefined],
    ['empty strings', { title: '', missionLabel: '', mission: '', text: '' }],
    ['missing title', { ...content, title: '  ' }],
    ['missing text', { ...content, text: '' }],
  ])('renders nothing with %s', (_label, value) => {
    const { container } = render(<KeystoneSection content={value} />);
    expect(container).toBeEmptyDOMElement();
  });

  it('highlights KEYSTONE whatever its case, normalised to the brand spelling', () => {
    const { container } = render(
      <KeystoneSection content={{ ...content, text: 'Powered by Keystone and keystone.' }} />
    );
    const strong = container.querySelectorAll('strong');
    expect(strong).toHaveLength(2);
    strong.forEach((el) => expect(el).toHaveTextContent(/^KEYSTONE$/));
  });

  it('keeps "Tier 1-2-3" on a single line in the title', () => {
    const { container } = render(
      <KeystoneSection
        content={{ ...content, title: 'Dualys for SME / Large corporations Tier 1-2-3' }}
      />
    );
    const nowrap = container.querySelector('h2 .whitespace-nowrap');
    expect(nowrap).toHaveTextContent('Tier 1-2-3');
    expect(container.querySelector('h2')?.textContent).toBe(
      'Dualys for SME\u00A0/ Large corporations Tier 1-2-3'
    );
  });
});
