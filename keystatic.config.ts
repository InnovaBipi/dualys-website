import { config, collection, fields } from '@keystatic/core';
import { makeHomepageSingleton } from './src/lib/keystatic/schemas/homepage';
import { makeServiciosSingleton } from './src/lib/keystatic/schemas/servicios';
import { makeMetodologiaSingleton } from './src/lib/keystatic/schemas/metodologia';
import { makeNosotrosSingleton } from './src/lib/keystatic/schemas/nosotros';
import { makeContactSingleton } from './src/lib/keystatic/schemas/contact';
import {
  makeSectoresSingleton,
  makeSectoresVerticalsSingleton,
} from './src/lib/keystatic/schemas/sectores';
import { makeLegalSingleton } from './src/lib/keystatic/schemas/legal';
import { makeLandingSingleton } from './src/lib/keystatic/schemas/landings';

// ─── Factory for locale-specific recursos collections ────────
function makeRecursosCollection(locale: string, label: string) {
  return collection({
    label,
    slugField: 'title',
    path: `content/recursos/${locale}/*/`,
    format: { contentField: 'content' },
    schema: {
      title: fields.slug({
        name: { label: 'Title', validation: { isRequired: true } },
      }),
      summary: fields.text({
        label: 'Summary',
        multiline: true,
        validation: { isRequired: true },
      }),
      publishedAt: fields.date({ label: 'Published Date' }),
      category: fields.select({
        label: 'Category',
        options: [
          { value: 'market', label: 'Market Analysis' },
          { value: 'guides', label: 'Guides & Tutorials' },
          { value: 'cases', label: 'Transition Cases' },
          { value: 'opinion', label: 'Opinion & Trends' },
        ],
        defaultValue: 'market',
      }),
      coverImage: fields.image({
        label: 'Cover Image',
        directory: 'public/images/recursos',
        publicPath: '/images/recursos',
      }),
      featured: fields.checkbox({
        label: 'Featured',
        defaultValue: false,
      }),
      author: fields.text({
        label: 'Author',
        defaultValue: 'Dualys',
      }),
      draft: fields.checkbox({
        label: 'Draft',
        defaultValue: true,
      }),
      content: fields.markdoc({ label: 'Content' }),
    },
  });
}

// ─── Config ──────────────────────────────────────────────────
export default config({
  storage:
    process.env.NODE_ENV === 'development'
      ? { kind: 'local' }
      : {
          kind: 'github',
          repo: { owner: 'InnovaBipi', name: 'dualys-website' },
        },
  ui: {
    brand: { name: 'Dualys CMS' },
    navigation: {
      // Core pages
      'Pàgines (CA)': [
        'homepage_ca', 'servicios_ca', 'metodologia_ca',
        'nosotros_ca', 'contact_ca', 'sectores_ca', 'sectores_verticals_ca',
      ],
      'Páginas (ES)': [
        'homepage_es', 'servicios_es', 'metodologia_es',
        'nosotros_es', 'contact_es', 'sectores_es', 'sectores_verticals_es',
      ],
      'Pages (EN)': [
        'homepage_en', 'servicios_en', 'metodologia_en',
        'nosotros_en', 'contact_en', 'sectores_en', 'sectores_verticals_en',
      ],
      'Pages (FR)': [
        'homepage_fr', 'servicios_fr', 'metodologia_fr',
        'nosotros_fr', 'contact_fr', 'sectores_fr', 'sectores_verticals_fr',
      ],
      // Legal
      'Legal (CA)': ['legal_privacy_ca', 'legal_terms_ca', 'legal_cookies_ca'],
      'Legal (ES)': ['legal_privacy_es', 'legal_terms_es', 'legal_cookies_es'],
      'Legal (EN)': ['legal_privacy_en', 'legal_terms_en', 'legal_cookies_en'],
      'Legal (FR)': ['legal_privacy_fr', 'legal_terms_fr', 'legal_cookies_fr'],
      // Landings
      'Landings (CA)': [
        'landing_pre_evaluacion_ca', 'landing_industriales_ca',
        'landing_tecnologia_ca', 'landing_primes_ca',
      ],
      'Landings (ES)': [
        'landing_pre_evaluacion_es', 'landing_industriales_es',
        'landing_tecnologia_es', 'landing_primes_es',
      ],
      'Landings (EN)': [
        'landing_pre_evaluacion_en', 'landing_industriales_en',
        'landing_tecnologia_en', 'landing_primes_en',
      ],
      'Landings (FR)': [
        'landing_pre_evaluacion_fr', 'landing_industriales_fr',
        'landing_tecnologia_fr', 'landing_primes_fr',
      ],
      // Blog
      'Recursos (CA)': ['recursos_ca'],
      'Recursos (ES)': ['recursos_es'],
      'Recursos (EN)': ['recursos_en'],
      'Recursos (FR)': ['recursos_fr'],
    },
  },
  singletons: {
    // ─── Homepage ──────────────────────────────────────────
    homepage_ca: makeHomepageSingleton('ca', 'Inici (CA)'),
    homepage_es: makeHomepageSingleton('es', 'Inicio (ES)'),
    homepage_en: makeHomepageSingleton('en', 'Home (EN)'),
    homepage_fr: makeHomepageSingleton('fr', 'Accueil (FR)'),

    // ─── Servicios ─────────────────────────────────────────
    servicios_ca: makeServiciosSingleton('ca', 'Serveis (CA)'),
    servicios_es: makeServiciosSingleton('es', 'Servicios (ES)'),
    servicios_en: makeServiciosSingleton('en', 'Services (EN)'),
    servicios_fr: makeServiciosSingleton('fr', 'Services (FR)'),

    // ─── Metodología ───────────────────────────────────────
    metodologia_ca: makeMetodologiaSingleton('ca', 'Metodologia (CA)'),
    metodologia_es: makeMetodologiaSingleton('es', 'Metodología (ES)'),
    metodologia_en: makeMetodologiaSingleton('en', 'Methodology (EN)'),
    metodologia_fr: makeMetodologiaSingleton('fr', 'Méthodologie (FR)'),

    // ─── Nosotros ──────────────────────────────────────────
    nosotros_ca: makeNosotrosSingleton('ca', 'Nosaltres (CA)'),
    nosotros_es: makeNosotrosSingleton('es', 'Nosotros (ES)'),
    nosotros_en: makeNosotrosSingleton('en', 'About Us (EN)'),
    nosotros_fr: makeNosotrosSingleton('fr', 'À propos (FR)'),

    // ─── Contact ───────────────────────────────────────────
    contact_ca: makeContactSingleton('ca', 'Contacte (CA)'),
    contact_es: makeContactSingleton('es', 'Contacto (ES)'),
    contact_en: makeContactSingleton('en', 'Contact (EN)'),
    contact_fr: makeContactSingleton('fr', 'Contact (FR)'),

    // ─── Sectores (overview) ───────────────────────────────
    sectores_ca: makeSectoresSingleton('ca', 'Sectors (CA)'),
    sectores_es: makeSectoresSingleton('es', 'Sectores (ES)'),
    sectores_en: makeSectoresSingleton('en', 'Sectors (EN)'),
    sectores_fr: makeSectoresSingleton('fr', 'Secteurs (FR)'),

    // ─── Sectores Verticals (all 10 verticals) ─────────────
    sectores_verticals_ca: makeSectoresVerticalsSingleton('ca', 'Verticals (CA)'),
    sectores_verticals_es: makeSectoresVerticalsSingleton('es', 'Verticales (ES)'),
    sectores_verticals_en: makeSectoresVerticalsSingleton('en', 'Verticals (EN)'),
    sectores_verticals_fr: makeSectoresVerticalsSingleton('fr', 'Verticales (FR)'),

    // ─── Legal ─────────────────────────────────────────────
    legal_privacy_ca: makeLegalSingleton('ca', 'privacy', 'Privacitat (CA)'),
    legal_privacy_es: makeLegalSingleton('es', 'privacy', 'Privacidad (ES)'),
    legal_privacy_en: makeLegalSingleton('en', 'privacy', 'Privacy (EN)'),
    legal_privacy_fr: makeLegalSingleton('fr', 'privacy', 'Confidentialité (FR)'),

    legal_terms_ca: makeLegalSingleton('ca', 'terms', 'Avís Legal (CA)'),
    legal_terms_es: makeLegalSingleton('es', 'terms', 'Aviso Legal (ES)'),
    legal_terms_en: makeLegalSingleton('en', 'terms', 'Terms (EN)'),
    legal_terms_fr: makeLegalSingleton('fr', 'terms', 'Mentions Légales (FR)'),

    legal_cookies_ca: makeLegalSingleton('ca', 'cookies', 'Cookies (CA)'),
    legal_cookies_es: makeLegalSingleton('es', 'cookies', 'Cookies (ES)'),
    legal_cookies_en: makeLegalSingleton('en', 'cookies', 'Cookies (EN)'),
    legal_cookies_fr: makeLegalSingleton('fr', 'cookies', 'Cookies (FR)'),

    // ─── Landings ──────────────────────────────────────────
    landing_pre_evaluacion_ca: makeLandingSingleton('ca', 'pre-evaluacion', 'Pre-avaluació (CA)'),
    landing_pre_evaluacion_es: makeLandingSingleton('es', 'pre-evaluacion', 'Pre-evaluación (ES)'),
    landing_pre_evaluacion_en: makeLandingSingleton('en', 'pre-evaluacion', 'Pre-assessment (EN)'),
    landing_pre_evaluacion_fr: makeLandingSingleton('fr', 'pre-evaluacion', 'Pré-évaluation (FR)'),

    landing_industriales_ca: makeLandingSingleton('ca', 'industriales', 'Industrials (CA)'),
    landing_industriales_es: makeLandingSingleton('es', 'industriales', 'Industriales (ES)'),
    landing_industriales_en: makeLandingSingleton('en', 'industriales', 'Industrial (EN)'),
    landing_industriales_fr: makeLandingSingleton('fr', 'industriales', 'Industriels (FR)'),

    landing_tecnologia_ca: makeLandingSingleton('ca', 'tecnologia', 'Tecnologia (CA)'),
    landing_tecnologia_es: makeLandingSingleton('es', 'tecnologia', 'Tecnología (ES)'),
    landing_tecnologia_en: makeLandingSingleton('en', 'tecnologia', 'Technology (EN)'),
    landing_tecnologia_fr: makeLandingSingleton('fr', 'tecnologia', 'Technologie (FR)'),

    landing_primes_ca: makeLandingSingleton('ca', 'primes', 'Primes (CA)'),
    landing_primes_es: makeLandingSingleton('es', 'primes', 'Primes (ES)'),
    landing_primes_en: makeLandingSingleton('en', 'primes', 'Primes (EN)'),
    landing_primes_fr: makeLandingSingleton('fr', 'primes', 'Primes (FR)'),
  },
  collections: {
    recursos_ca: makeRecursosCollection('ca', 'Recursos (Català)'),
    recursos_es: makeRecursosCollection('es', 'Recursos (Español)'),
    recursos_en: makeRecursosCollection('en', 'Resources (English)'),
    recursos_fr: makeRecursosCollection('fr', 'Ressources (Français)'),
  },
});
