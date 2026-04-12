# Figma Gap Analysis: DUALYS Redesign

**Figma**: BIPI UX/UI > UI KIT > DUALYS section (node 7045:51186)
**Date**: 2026-04-12
**Source**: Figma API + visual inspection

---

## 1. Color Palette Changes

### Brand/Accent Blue (10 steps)

| Token | Figma | Current (accent-*) | Change? |
|-------|-------|---------------------|---------|
| brand01 | `#EEF0FD` | accent-50: `#eef0fd` | Same |
| brand02 | `#D8DBFB` | accent-100: `#d5d9f9` | Update |
| brand03 | `#B5BBFA` | accent-200: `#b3baf4` | Update |
| brand04 | `#8F97F4` | accent-300: `#8a96ed` | Update |
| brand05 | `#6B77EE` | accent-400: `#6c7ae9` | Update |
| brand06 | `#4F61E7` | accent-500: `#4F61E7` | Same |
| brand07 | `#3D4FD6` | accent-600: `#3d4fd4` | Update |
| brand08 | `#2D3EC0` | accent-700: `#2b3dc1` | Update |
| brand09 | `#1E2EA8` | accent-800: `#1f2d9e` | Update |
| brand10 | `#111E8C` | accent-900: `#151f7a` | Update |

### Neutral Scale (12 steps - SIGNIFICANT CHANGE)

Figma uses **blue-tinted neutrals** vs current **pure grays**.

| Token | Figma | Current (neutral-*) | Change? |
|-------|-------|----------------------|---------|
| neutral01 | `#FFFFFF` | white | Same |
| neutral02 | `#F7F8FA` | neutral-50: `#fafafa` | Update |
| neutral03 | `#ECEEF3` | neutral-100: `#f5f5f5` | Update |
| neutral04 | `#D5D9E4` | neutral-200: `#e5e5e5` | Update |
| neutral05 | `#B0B6C8` | neutral-300: `#d4d4d4` | Update |
| neutral06 | `#7E86A0` | neutral-400: `#a3a3a3` | Update |
| neutral07 | `#555D78` | neutral-500: `#737373` | Update |
| neutral08 | `#3A4157` | neutral-600: `#525252` | Update |
| neutral09 | `#252B3E` | neutral-700: `#404040` | Update |
| neutral10 | `#161928` | neutral-800: `#262626` | Update |
| neutral11 | `#080B15` | neutral-900: `#171717` | Update |
| neutral12 | `#010203` | neutral-950: `#0a0a0a` | Update |

**Impact**: The neutral scale has a subtle blue undertone. This affects ALL text, borders, backgrounds across the entire site.

---

## 2. Button Component

Figma defines **160 button variants**:

| Property | Values |
|----------|--------|
| Type | primary, secondary, tertiary, ghost |
| Status | default, hover, pressed, disabled |
| Size | sm (h:33, font:14px), md (h:39, font:16px) |
| Icon | yes, no |
| Mode | light, dark |

**Current**: 7 CVA variants (default, destructive, outline, secondary, ghost, link, accent)

### Key specs:
- Font: **Inter 500** (medium weight)
- Border radius: **8px** (rounded-lg)
- Padding: sm=12px, md=16px horizontal
- Primary: bg `#4F61E7`, text `#FFFFFF`
- Secondary: border `#4F61E7`, text `#4F61E7`, no fill
- Tertiary: no border, text `#4F61E7`
- Ghost: text `#555D78` (neutral07)

**Action**: Rewrite button.tsx with new variant system (type/size/mode).

---

## 3. Page-by-Page Comparison

### Homepage (inici)

| Section | Current | Figma | Delta |
|---------|---------|-------|-------|
| Hero | Text-only, animated badge, pattern bg | **Background image** (aerial industrial), overlay text | Major redesign |
| Stats | Part of ContextSection, 3 stats | Standalone row: 800.000M, 44.000M, 2%PIB | Layout change |
| Audience | 3 cards with icons | "A qui ens dirigim" - 3 cards with **images** | Image cards |
| Messages | 5 messages, alternating layout | "Per que DUALYS" - 5 **numbered items** (1-5), left-aligned | Simplified layout |
| Verticals | 10 icon cards + descriptions | "Verticals de defensa" - 10 **image cards** in grid | Image-based |
| Team Trust | Centered quote | NOT in Figma | May be removed |
| CTA | Dark bg, 2 buttons | Dark bg, "Construint capacitats duals..." + 1 button | Simplified |
| Footer | 3-column | New layout with 4 columns + description | Updated |

### Metodologia

| Section | Current | Figma | Delta |
|---------|---------|-------|-------|
| Hero | PageHeader (gradient bg) | Dark bg, "Programa Fit For Defense" | Updated |
| Phases | 3 phases vertical (Diagnostic/Posicionament/Activacio) | **4 steps horizontal timeline** (Diagnosi/Adaptacio/Oportunitats/Connexio) | Major redesign |
| CTA | Standard | Same pattern | Minor |

### Nosaltres

| Section | Current | Figma | Delta |
|---------|---------|-------|-------|
| Hero | PageHeader | Dark bg, "Sobre nosaltres" | Updated |
| Mission | Company narrative | "Missio." section | Similar |
| Vision | Timeline (3 phases) | "Visio." with 3 timeline cards (2025-2030) | Similar layout |
| Team | 4 profiles in grid | "L'equip fundador" - 4 profiles, 2-column | Minor layout |
| CTA | Standard | Same pattern | Minor |

### Vertical Detail (e.g., Vehicles Terrestres)

| Section | Current | Figma | Delta |
|---------|---------|-------|-------|
| Hero | PageHeader with icon | **Background image** + title overlay | Major |
| Subcategories | Cards with icons | **Text-only cards** with left accent border | Simplified |
| Cross-links | None | **"Mes verticals"** - 3 image cards to other verticals | NEW section |
| CTA | Standard | Same pattern | Minor |

---

## 4. Typography

| Element | Current | Figma |
|---------|---------|-------|
| Body | Inter | Inter (same) |
| Headings | Outfit | Not confirmed - may stay or change |
| Button text | Inter 500 | Inter 500 (confirmed from component) |
| Body weight | 400 | 400 (same) |
| Button sizes | 14px sm / 16px md | Same |

---

## 5. Components NOT in Figma (pages without new design)

The following pages have NO Figma design. Keep current implementation:
- Servicios
- Recursos / blog
- Contact
- Landing pages (para-industriales, para-tecnologia, para-primes, pre-evaluacion)
- Legal pages (privacy, terms, cookies)

---

## 6. New Design Elements

1. **Background images** in hero sections (need source images)
2. **Blue-tinted neutral palette** throughout
3. **Image-based vertical cards** (need vertical images)
4. **Horizontal methodology timeline** (4 steps)
5. **Cross-linking verticals** ("Mes verticals" section)
6. **Footer redesign** with 4-column layout

---

## 7. Assets Needed

| Asset | Description | Status |
|-------|-------------|--------|
| Hero homepage image | Aerial view of industrial facility | Need from client |
| Hero vertical images | Military vehicles, naval, etc. (10 images) | Need from client |
| Audience card images | 3 images for target audiences | Need from client |
| Vertical grid images | 10 thumbnail images | Need from client |
| Cross-link images | 3 images for "Mes verticals" | Need from client |

**Critical**: Many hero/card images are placeholder in Figma. Need to confirm with client what images to use.

---

## 8. Priority Assessment

| Change | Impact | Effort | Priority |
|--------|--------|--------|----------|
| Neutral palette update | High (affects everything) | S | P0 |
| Accent blue scale update | Medium | S | P0 |
| Button component rewrite | High (used everywhere) | M | P0 |
| Header update | Medium | M | P1 |
| Footer redesign | Medium | M | P1 |
| Homepage hero (image) | High (first impression) | L | P0 |
| Homepage sections | High | L | P1 |
| Vertical detail pages | Medium | M | P1 |
| Metodologia timeline | Medium | M | P1 |
| Nosaltres refinement | Low | S | P2 |
| Cross-link verticals | Low | S | P2 |
