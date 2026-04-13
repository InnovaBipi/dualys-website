---
id: TASK-200
title: "Actualizar paleta de colores (tailwind + CSS vars)"
status: done
priority: P0
type: infrastructure
phase: 10
estimate: M
depends_on: []
figma_ref: "DUALYS > colors section (node 7038:53082)"
files:
  - tailwind.config.ts
  - src/app/globals.css
---

## Descripcion

Update the color palette in tailwind.config.ts to match Figma design tokens. The accent blue scale changes slightly (8 of 10 shades updated). The neutral scale changes SIGNIFICANTLY from pure grays to blue-tinted neutrals.

## Figma specs

Accent (brand) scale:
- brand01=#EEF0FD
- brand02=#D8DBFB
- brand03=#B5BBFA
- brand04=#8F97F4
- brand05=#6B77EE
- brand06=#4F61E7 (same)
- brand07=#3D4FD6
- brand08=#2D3EC0
- brand09=#1E2EA8
- brand10=#111E8C

Neutral scale:
- neutral01=#FFFFFF
- neutral02=#F7F8FA
- neutral03=#ECEEF3
- neutral04=#D5D9E4
- neutral05=#B0B6C8
- neutral06=#7E86A0
- neutral07=#555D78
- neutral08=#3A4157
- neutral09=#252B3E
- neutral10=#161928
- neutral11=#080B15
- neutral12=#010203

## Criterios de aceptacion

- [ ] All color tokens updated in tailwind.config.ts
- [ ] CSS vars updated in globals.css
- [ ] No visual regression in pages without layout changes
- [ ] Accent scale uses new Figma values (8 of 10 shades changed)
- [ ] Neutral scale uses new blue-tinted values (all shades changed from pure gray)
