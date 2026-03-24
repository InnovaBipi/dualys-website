# Content Placeholders Rule

## Purpose

This rule documents which content on the Dualys website is placeholder (awaiting real data) versus real content derived from official brand documents.

## Real Content (From Official Sources)

The following content is derived from official Dualys brand documents and should NOT be changed without review:

### Key Messages
**Source**: `DUALYS_Copy_Web_Completo_ES_final.pdf` (Briefing v2.0, March 2026)

- Slogan: "Building Dual Capabilities for the Industry"
- Value prop 1: "Construir capacidades duales para la industria."
- Value prop 2: "Convertimos la capacidad industrial y tecnológica de tu empresa en negocio real dentro del sector defensa."
- Value prop 3: "Somos el puente estratégico que faltaba entre la industria y los mercados duales europeos."

### Defense Verticals
**Source**: Briefing v2.0, Section 6

9 verticals defined (terrestres, naval, aeronáutica, aeroespacial, C4ISR, ciberdefensa, UAV/robótica, simulación, auxiliar). See 001-project-identity.md for full list.

### Company Narrative & Founder Profiles
**Source**: Briefing v2.0, Section 8.6

- Company origin story (real, from briefing)
- 4 founder profiles (anonymous descriptions, real roles)
- Vision timeline: 3 phases (2025-2030)

### Contact Information
**Source**: Briefing v2.0, Section 8.8

- Email: info@dualys.eu (real)
- Address: Camí Can Ametller 36 Planta Baixa, 08195 Sant Cugat del Vallès (real)

### Brand Colors and Typography
**Source**: `docs/branding/Guideline Marca Dualys 2026.pdf`

- Primary: #000000 (black)
- Accent: #4F61E7 (blue)
- Typography: TOSH A + Inter

### Company Information
**Source**: Corporate documents

- Company name: Dualys
- Legal form: AIE (Agrupació d'Interès Econòmic)
- Origin: Catalonia, Spain
- Context: European strategic autonomy

## Placeholder Content (Awaiting Real Data)

The following content is placeholder and will be replaced by CMS data:

### Team Members (`/about/team`)
**Status**: PLACEHOLDER
**Data Source**: Contentful CMS (when configured)

Current state:
- Generic role descriptions without specific names
- No photos
- No LinkedIn profiles

When CMS is configured:
- Real team member names
- Professional photos
- Role descriptions
- Contact information

### Partners (`/about/partners`)
**Status**: PLACEHOLDER
**Data Source**: Contentful CMS (when configured)

Current state:
- Partner category structure defined
- No specific company names or logos
- Placeholder descriptions

When CMS is configured:
- Real partner company names
- Official partner logos
- Partnership descriptions
- Website links

### News Articles (`/news`)
**Status**: PLACEHOLDER
**Data Source**: Contentful CMS (when configured)

Current state:
- Empty state or example articles
- Generic content

When CMS is configured:
- Real news articles with dates
- Category assignments
- Featured images
- Author attribution

## Placeholder Handling Guidelines

### Do NOT
- Invent fictional team member names
- Create fake company logos
- Write news articles about events that didn't happen
- Add metrics or statistics without sources

### DO
- Use role-based descriptions ("Chief Technology Officer")
- Use category placeholders ("Industrial Partner")
- Use "Coming Soon" or empty states
- Add clear visual indicators that content is placeholder

## CMS Integration Status

| Content Type | Status | CMS Model | Priority |
|--------------|--------|-----------|----------|
| Team Members | Awaiting CMS | `teamMember` | High |
| Partners | Awaiting CMS | `partner` | High |
| News Articles | Awaiting CMS | `newsArticle` | Medium |
| Case Studies | Not started | `caseStudy` | Low |

## Verification Checklist

Before publishing:

- [ ] All placeholder content is clearly marked in code/design
- [ ] No fictional names, companies, or data are present
- [ ] Empty states are graceful and professional
- [ ] CMS integration is tested with preview tokens
- [ ] Real content review completed by stakeholder

## Code Markers

When implementing placeholder content, use these markers:

```tsx
// TODO: Replace with CMS data
// PLACEHOLDER: Awaiting real team member data
// CMS: teamMember content type
```

These markers help identify placeholder sections during code review and CMS integration.
