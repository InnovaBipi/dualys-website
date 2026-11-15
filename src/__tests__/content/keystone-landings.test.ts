import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import YAML from 'yaml';
import { locales } from '@/lib/i18n/config';

type Keystone = { title: string; missionLabel: string; mission: string; text: string };

const PAGES_DIR = path.resolve(__dirname, '../../../content/pages');

function readLanding(landing: string, locale: string): { keystone?: Keystone } {
  const file = path.join(PAGES_DIR, `landing-${landing}`, `${locale}.yaml`);
  return YAML.parse(fs.readFileSync(file, 'utf8'));
}

const LANDINGS = ['industriales', 'tecnologia', 'primes'] as const;
const FIELDS = ['title', 'missionLabel', 'mission', 'text'] as const;

describe('KEYSTONE content on the audience landings', () => {
  it('covers the four site locales', () => {
    expect([...locales].sort()).toEqual(['ca', 'en', 'es', 'fr']);
  });

  for (const landing of LANDINGS) {
    for (const locale of locales) {
      it(`landing-${landing}/${locale} has a complete keystone block`, () => {
        const { keystone } = readLanding(landing, locale);
        expect(keystone).toBeDefined();
        for (const field of FIELDS) {
          expect(typeof keystone![field]).toBe('string');
          expect(keystone![field].trim().length).toBeGreaterThan(0);
        }
        expect(keystone!.text).toContain('KEYSTONE');
      });
    }
  }

  for (const locale of locales) {
    it(`industriales and tecnologia share the SME / Large text (${locale})`, () => {
      expect(readLanding('industriales', locale).keystone).toEqual(
        readLanding('tecnologia', locale).keystone
      );
    });

    it(`primes has its own text (${locale})`, () => {
      expect(readLanding('primes', locale).keystone?.title).not.toBe(
        readLanding('industriales', locale).keystone?.title
      );
    });
  }

  it('keeps the client EN copy literal', () => {
    const sme = readLanding('industriales', 'en').keystone!;
    expect(sme.title).toBe('Dualys for SME / Large corporations Tier 1-2-3');
    expect(sme.mission).toContain('Aerospace, Security and Defence (ASD) market');
    expect(sme.text).toContain('Dualys’ proprietary Business Intelligence platform');
    const primes = readLanding('primes', 'en').keystone!;
    expect(primes.title).toBe('Dualys for Primes and contractors');
    expect(primes.text).toContain('Catalonia’s defence-ready and dual-use industrial ecosystem');
  });

  it.each([
    ['ca', 'mercat aeroespacial, de seguretat i defensa (ASD)'],
    ['es', 'mercado aeroespacial, de seguridad y defensa (ASD)'],
    ['fr', "marché de l'aérospatiale, de la sécurité et de la défense (ASD)"],
  ])('expands ASD on first mention (%s)', (locale, expansion) => {
    expect(readLanding('industriales', locale).keystone!.mission).toContain(expansion);
  });

  for (const locale of locales) {
    it(`pre-evaluacion/${locale} has no keystone block`, () => {
      expect(readLanding('pre-evaluacion', locale).keystone).toBeUndefined();
    });
  }
});
