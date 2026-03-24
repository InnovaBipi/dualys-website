---
description: "Validación pre-deploy completa: build + lint + SEO + brand + a11y + i18n. Ejecutar antes de cada commit significativo."
allowed-tools: "Read, Bash, Grep, Glob, Skill"
---

# /pre-deploy — Validación Pre-Deploy Completa

Orquestador que ejecuta todas las validaciones necesarias antes de un deploy. Agrega resultados en un informe único.

## Input
- Sin argumentos: valida todo el proyecto
- Con ruta: valida solo esa página (ej: `/pre-deploy servicios`)

## Paso 1: Build & Lint (bloqueante)

```bash
echo "=== BUILD CHECK ===" && npx next build 2>&1 | tail -20
```

Si falla → STOP. No continuar hasta resolver.

```bash
echo "=== LINT CHECK ===" && npx next lint 2>&1 | tail -20
```

Warnings son aceptables. Errors son bloqueantes.

## Paso 2: TypeScript (bloqueante)

```bash
echo "=== TYPECHECK ===" && npx tsc --noEmit 2>&1 | tail -20
```

Zero errors requerido.

## Paso 3: SEO Validation Suite

Ejecutar en secuencia:

1. `/seo-validate-meta` — Meta tags en todas las páginas
2. `/seo-validate-hreflang` — Alternates de idioma (4 idiomas)
3. `/seo-validate-structured` — JSON-LD schemas
4. `/seo-validate-quality` — Scoring E-E-A-T (si hay contenido nuevo)

Agregar resultados: ✅ pass / ⚠️ warning / ❌ fail

## Paso 4: Brand Compliance

Buscar violaciones de color en todos los TSX:
```bash
grep -rn "purple-\|violet-\|indigo-\|pink-\|rose-\|fuchsia-\|cyan-\|sky-\|teal-\|lime-\|orange-\|emerald-" src/components/ src/app/ --include="*.tsx" || echo "✅ No brand violations found"
```

Verificar hex hardcodeados no permitidos:
```bash
grep -rn "#[0-9a-fA-F]\{6\}" src/components/ src/app/ --include="*.tsx" | grep -v "#000000\|#FFFFFF\|#ffffff\|#4F61E7\|#4f61e7" || echo "✅ No unauthorized hex colors"
```

## Paso 5: i18n Sync Check

Verificar que las 4 traducciones tienen estructura consistente:
```bash
node -e "
const fs = require('fs');
const langs = ['es', 'ca', 'en', 'fr'];
const msgs = langs.map(l => JSON.parse(fs.readFileSync('src/messages/' + l + '.json', 'utf8')));
const getKeys = (obj, prefix='') => Object.keys(obj).reduce((acc, k) => {
  const path = prefix ? prefix + '.' + k : k;
  if (typeof obj[k] === 'object' && obj[k] !== null) return [...acc, ...getKeys(obj[k], path)];
  return [...acc, path];
}, []);
const esKeys = new Set(getKeys(msgs[0]));
langs.slice(1).forEach((l, i) => {
  const lKeys = new Set(getKeys(msgs[i+1]));
  const missing = [...esKeys].filter(k => !lKeys.has(k));
  const extra = [...lKeys].filter(k => !esKeys.has(k));
  if (missing.length) console.log('❌ ' + l + ' missing ' + missing.length + ' keys:', missing.slice(0,5).join(', ') + (missing.length > 5 ? '...' : ''));
  else if (extra.length) console.log('⚠️ ' + l + ' has ' + extra.length + ' extra keys');
  else console.log('✅ ' + l + ' in sync with es');
});
"
```

## Paso 6: Accessibility Quick Check

Verificar problemas comunes:
```bash
echo "=== A11Y CHECKS ==="
echo "Images without alt:" && grep -rn "<img " src/ --include="*.tsx" | grep -v "alt=" | head -5 || echo "✅ All images have alt"
echo "Divs with onClick:" && grep -rn "div.*onClick\|div.*onKeyDown" src/ --include="*.tsx" | head -5 || echo "✅ No clickable divs"
echo "Missing aria-labels:" && grep -rn "role=\"button\"\|role=\"link\"" src/ --include="*.tsx" | grep -v "aria-label" | head -5 || echo "✅ All roles have aria-labels"
```

## Paso 7: Backlog Status

Mostrar estado del backlog:
```bash
echo "=== BACKLOG STATUS ==="
echo "Done:" && grep -l "status: done" .claude/backlog/tasks/*.md 2>/dev/null | wc -l
echo "In Progress:" && grep -l "status: in_progress" .claude/backlog/tasks/*.md 2>/dev/null | wc -l
echo "Backlog:" && grep -l "status: backlog" .claude/backlog/tasks/*.md 2>/dev/null | wc -l
```

## Informe Final

Presentar resumen consolidado:

```
╔══════════════════════════════════════╗
║       PRE-DEPLOY REPORT             ║
╠══════════════════════════════════════╣
║ Build:        ✅/❌                  ║
║ Lint:         ✅/❌                  ║
║ TypeScript:   ✅/❌                  ║
║ SEO Meta:     ✅/⚠️/❌              ║
║ SEO Hreflang: ✅/⚠️/❌              ║
║ SEO Schema:   ✅/⚠️/❌              ║
║ Brand Colors: ✅/❌                  ║
║ i18n Sync:    ✅/⚠️/❌              ║
║ Accessibility: ✅/⚠️               ║
╠══════════════════════════════════════╣
║ Verdict: READY / NOT READY          ║
╚══════════════════════════════════════╝
```

Si todo es ✅ → "Ready to deploy. Run `git add` + `git commit`."
Si hay ❌ → "Blocking issues found. Fix before deploying."
Si solo ⚠️ → "Warnings present. Deploy at your discretion."
