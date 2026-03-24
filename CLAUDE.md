# Dualys Website Project

**Slogan**: "Building Dual Capabilities for the Industry"

Catalan AIE — consultora estratégica especializada en facilitar la entrada de empresas industriales, tecnológicas y de software en la cadena de suministro del sector defensa. Puente entre la innovación civil y los mercados duales europeos.

## Brand (CRITICAL)

**YOU MUST use these exact colors. Never use navy or gold.**

| Element | Value | Usage |
|---------|-------|-------|
| Primary | `#000000` (black) | 40% - Backgrounds, text |
| Accent | `#4F61E7` (blue) | 20% - CTAs, links, highlights |
| White | `#FFFFFF` | 40% - Contrast, clean |

**Typography**: Outfit (headings) + Inter (body)

See: `.claude/skills/brand-guidelines/SKILL.md` for complete brand guide.

## Tech Stack

| Aspect | Value |
|--------|-------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS + shadcn/ui |
| i18n | next-intl (4 languages: ca, es, en, fr) |
| Target | Lighthouse 95+, WCAG 2.2 AA |

## Key Rules

Read before making changes:
- `001-project-identity.md` - Brand and messaging
- `002-technical-standards.md` - Code standards
- `003-seo-checklist.md` - SEO requirements
- `004-content-structure.md` - Sitemap and content
- `005-brand-assets.md` - Logo and asset files
- `007-brand-validation.md` - Color validation rules

Located in `.claude/rules/`

## Brand Validation

**Automated checks prevent brand violations:**

| Component | Purpose |
|-----------|---------|
| `brand-color-validator.js` | Flags off-brand Tailwind colors (PostToolUse hook) |
| `brand-guidelines` skill | Reference for approved colors |

**Banned colors** (will be flagged):
- `purple-*`, `violet-*`, `indigo-*`
- `pink-*`, `rose-*`, `fuchsia-*`
- `cyan-*`, `sky-*`, `teal-*`, `lime-*`, `orange-*`

**Use instead**: `primary-*`, `accent-*`, `neutral-*`, or semantic (`success`, `destructive`)

## Commands

### Development Pipeline
- `/develop` - Auto-desarrollo: coge la tarea prioritaria, la ejecuta con validación completa
- `/develop TASK-XXX` - Ejecuta tarea específica
- `/pre-deploy` - Validación pre-deploy (build + SEO + brand + i18n + a11y)
- `/suggest-task` - Recomienda siguiente tarea
- `/update-task` - Actualiza estado de tarea

### SEO
- `/seo-validate-meta` - Meta tags
- `/seo-validate-hreflang` - Language alternates
- `/seo-validate-structured` - JSON-LD schemas
- `/seo-validate-quality` - E-E-A-T scoring

### Other
- `/validate-journeys` - Navigation flows
- `/audit` - Configuration audit

## Development Workflow

1. `/develop` — picks and executes the next task automatically
2. Hook validates brand colors on every file write
3. Run `/pre-deploy` before commit
4. Test all 4 languages for content changes
5. Verify accessibility with UI changes

## Value Propositions (from briefing, use literally)

1. *"Construir capacidades duales para la industria."*
2. *"Convertimos la capacidad industrial y tecnológica de tu empresa en negocio real dentro del sector defensa."*
3. *"Somos el puente estratégico que faltaba entre la industria y los mercados duales europeos."*

## 5 Key Messages

1. **El momento es ahora** — Europa ha comprometido +800.000 M€ en defensa hasta 2030
2. **España y Catalunya están preparadas** — Falta articulación, no potencial
3. **Añadimos valor real** — No hacemos informes, aceleramos entradas al mercado
4. **Tu tecnología civil ya es ventaja** — Transferencia civil → defensa
5. **Reducimos el riesgo** — Normativa AQAP/PECAL, certificaciones, export controls

## CTAs (from briefing, use exactly)

- **Primary**: "Solicita tu diagnóstico →"
- **Secondary**: "Habla con nosotros →" / "Conoce nuestra metodología →"

## Tone

Professional, strategic (not militaristic), European perspective, innovation-focused. Emphasize bridge-building and enablement, not deterrence or combat. DUALYS is a consultancy, not a technology company.

## Contact (real data from briefing)

- **Email**: info@dualys.eu
- **Address**: Camí Can Ametller 36 Planta Baixa, 08195 Sant Cugat del Vallès (Barcelona)

## Resources

- Logo: `docs/dualys_logo_300x300.png`
- Positioning: `docs/Reflexions_Posicionament_Dualys_22gen2026.pdf`
- Brand Guidelines: `docs/branding/Guideline Marca Dualys 2026.pdf`
- Briefing Web: `C:\Users\user\Downloads\DUALYS_Copy_Web_Completo_ES_final.pdf`
