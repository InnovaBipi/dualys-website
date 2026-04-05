/**
 * Migration script: Extract page content from i18n JSON files
 * and write YAML files for Keystatic singletons.
 *
 * Run: node scripts/migrate-json-to-keystatic.mjs
 */
import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';
import YAML from 'yaml';

const LOCALES = ['ca', 'es', 'en', 'fr'];
const MESSAGES_DIR = join(process.cwd(), 'src/messages');
const CONTENT_DIR = join(process.cwd(), 'content/pages');

function readMessages(locale) {
  const raw = readFileSync(join(MESSAGES_DIR, `${locale}.json`), 'utf-8');
  return JSON.parse(raw);
}

function writeYaml(page, locale, data) {
  const dir = join(CONTENT_DIR, page);
  mkdirSync(dir, { recursive: true });
  const filePath = join(dir, `${locale}.yaml`);
  writeFileSync(filePath, YAML.stringify(data, { lineWidth: 0 }), 'utf-8');
  console.log(`  ✓ ${filePath}`);
}

// ─── Extractors per page ─────────────────────────────────────

function extractHomepage(msg) {
  const h = msg.homepage || {};
  const vertKeys = ['terrestrial', 'naval', 'aeronautics', 'aerospace', 'c4isr', 'cyber', 'uav', 'armament', 'simulation', 'auxiliary'];

  return {
    meta: msg.metadata || { title: '', description: '' },
    hero: {
      title: msg.hero?.title || '',
      subtitle: msg.hero?.subtitle || '',
      cta: msg.hero?.cta || '',
      ctaSecondary: msg.hero?.ctaSecondary || '',
      contextNote: msg.hero?.contextNote || '',
    },
    context: {
      title: h.context?.title || '',
      paragraph1: h.context?.paragraph1 || '',
      paragraph2: h.context?.paragraph2 || '',
      paragraph3: h.context?.paragraph3 || '',
      stats: [
        { value: h.context?.stat1 || '', label: h.context?.stat1Label || '' },
        { value: h.context?.stat2 || '', label: h.context?.stat2Label || '' },
        { value: h.context?.stat3 || '', label: h.context?.stat3Label || '' },
      ],
    },
    audience: {
      title: h.audience?.title || '',
      cards: ['industrial', 'tech', 'primes'].map((key) => ({
        key,
        title: h.audience?.[key]?.title || '',
        description: h.audience?.[key]?.description || '',
        cta: h.audience?.[key]?.cta || '',
      })),
    },
    messages: {
      title: h.messages?.title || '',
      items: ['message1', 'message2', 'message3', 'message4', 'message5']
        .filter((k) => h.messages?.[k])
        .map((k) => ({
          title: h.messages[k].title,
          text: h.messages[k].text,
        })),
    },
    verticals: {
      title: h.verticals?.title || '',
      subtitle: h.verticals?.subtitle || '',
      cta: h.verticals?.cta || '',
      items: vertKeys
        .filter((k) => h.verticals?.[k])
        .map((k) => ({
          key: k,
          title: h.verticals[k].title,
          description: h.verticals[k].description,
        })),
    },
    team: {
      title: h.team?.title || '',
      text: h.team?.text || '',
      cta: h.team?.cta || '',
    },
    cta: {
      title: msg.cta?.title || '',
      subtitle: msg.cta?.subtitle || '',
      button: msg.cta?.button || '',
      buttonSecondary: msg.cta?.buttonSecondary || '',
    },
  };
}

function extractServicios(msg) {
  const s = msg.servicios || {};
  return {
    meta: s.meta || { title: '', description: '' },
    title: s.title || '',
    subtitle: s.subtitle || '',
    program: {
      name: s.program?.name || '',
      fullName: s.program?.fullName || '',
      description: s.program?.description || '',
    },
    cta: s.cta || '',
  };
}

function extractMetodologia(msg) {
  const m = msg.metodologia || {};
  return {
    meta: m.meta || { title: '', description: '' },
    title: m.title || '',
    subtitle: m.subtitle || '',
    description: m.description || '',
    phases: ['phase1', 'phase2', 'phase3']
      .filter((k) => m.phases?.[k])
      .map((k) => ({
        title: m.phases[k].title,
        description: m.phases[k].description,
      })),
    nda: m.nda || '',
    cta: m.cta || '',
  };
}

function extractNosotros(msg) {
  const n = msg.nosotros || {};
  return {
    meta: n.meta || { title: '', description: '' },
    title: n.title || '',
    subtitle: n.subtitle || '',
    narrative: {
      paragraph1: n.narrative?.paragraph1 || '',
      paragraph2: n.narrative?.paragraph2 || '',
      vision: n.narrative?.vision || '',
    },
    founders: {
      title: n.founders?.title || '',
      profiles: ['profile1', 'profile2', 'profile3', 'profile4']
        .filter((k) => n.founders?.[k])
        .map((k) => ({
          title: n.founders[k].title,
          text: n.founders[k].text,
        })),
    },
    vision: {
      title: n.vision?.title || '',
      phases: ['phase1', 'phase2', 'phase3']
        .filter((k) => n.vision?.[k])
        .map((k) => ({
          title: n.vision[k].title,
          text: n.vision[k].text,
        })),
    },
    cta: n.cta || '',
  };
}

function extractContact(msg) {
  const c = msg.contact || {};
  return {
    meta: { title: c.title || '', description: c.subtitle || '' },
    title: c.title || '',
    subtitle: c.subtitle || '',
    info: {
      title: c.info?.title || '',
      addressTitle: c.info?.address?.title || '',
      addressLine1: c.info?.address?.line1 || '',
      addressLine2: c.info?.address?.line2 || '',
      emailTitle: c.info?.email?.title || '',
      emailValue: c.info?.email?.value || '',
    },
  };
}

function extractSectores(msg) {
  const s = msg.sectores || {};
  return {
    meta: s.meta || { title: '', description: '' },
    title: s.title || '',
    subtitle: s.subtitle || '',
    intro: s.intro || '',
    originSection: {
      title: s.originSection?.title || '',
      subtitle: s.originSection?.subtitle || '',
    },
    cta: s.cta || '',
  };
}

function extractSectoresVerticals(msg) {
  const v = msg.sectores?.verticals || {};
  const vertKeys = ['terrestrial', 'naval', 'aeronautics', 'aerospace', 'c4isr', 'cyber', 'uav', 'armament', 'simulation', 'auxiliary'];
  const result = {};

  for (const key of vertKeys) {
    const vert = v[key];
    if (!vert) {
      result[key] = { title: '', description: '', meta: { title: '', description: '' }, subcategories: [] };
      continue;
    }
    result[key] = {
      title: vert.title || '',
      description: vert.description || '',
      meta: vert.meta || { title: '', description: '' },
      subcategories: Object.entries(vert.subcategories || {}).map(([k, sub]) => ({
        key: k,
        title: sub.title || '',
        description: sub.description || '',
      })),
    };
  }
  return result;
}

function extractLegal(msg, pageKey) {
  const p = msg.pages?.[pageKey] || {};
  return {
    meta: p.meta || { title: '', description: '' },
    title: p.title || '',
    lastUpdated: p.lastUpdated || '',
    sections: Object.entries(p.sections || {}).map(([k, s]) => ({
      key: k,
      title: s.title || '',
      content: s.content || '',
    })),
  };
}

function extractLanding(msg, landingKey) {
  const l = msg.landings?.[landingKey] || {};
  const valueProps = l.valueProps
    ? Object.values(l.valueProps).map((text) => ({ text }))
    : [];
  return {
    meta: l.meta || { title: '', description: '' },
    title: l.title || '',
    subtitle: l.subtitle || '',
    valueProps,
    cta: l.cta || '',
  };
}

// ─── Main ────────────────────────────────────────────────────

console.log('Migrating i18n JSON → Keystatic YAML...\n');

for (const locale of LOCALES) {
  console.log(`\n── ${locale.toUpperCase()} ──`);
  const msg = readMessages(locale);

  writeYaml('homepage', locale, extractHomepage(msg));
  writeYaml('servicios', locale, extractServicios(msg));
  writeYaml('metodologia', locale, extractMetodologia(msg));
  writeYaml('nosotros', locale, extractNosotros(msg));
  writeYaml('contact', locale, extractContact(msg));
  writeYaml('sectores', locale, extractSectores(msg));
  writeYaml('sectores-verticals', locale, extractSectoresVerticals(msg));
  writeYaml('legal-privacy', locale, extractLegal(msg, 'privacy'));
  writeYaml('legal-terms', locale, extractLegal(msg, 'terms'));
  writeYaml('legal-cookies', locale, extractLegal(msg, 'cookies'));
  writeYaml('landing-pre-evaluacion', locale, extractLanding(msg, 'preEvaluacion'));
  writeYaml('landing-industriales', locale, extractLanding(msg, 'industriales'));
  writeYaml('landing-tecnologia', locale, extractLanding(msg, 'tecnologia'));
  writeYaml('landing-primes', locale, extractLanding(msg, 'primes'));
}

console.log('\n✅ Migration complete! 60 YAML files generated.');
console.log('   Run `npm run dev:cms` and visit /keystatic to verify.');
