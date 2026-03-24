---
description: "Auto-desarrollo: coge la tarea más prioritaria del backlog (o la indicada), la planea y ejecuta con validación completa de SEO, brand, a11y e i18n."
allowed-tools: "Read, Write, Edit, Bash, Grep, Glob, Agent, WebSearch, WebFetch, Skill"
argument-hint: "[TASK-XXX]"
effort: high
---

# /develop — Auto-desarrollo de tareas del briefing

Sin argumentos: coge la tarea más prioritaria con dependencias satisfechas.
Con argumento: ejecuta esa tarea específica (ej: `/develop TASK-120`).

---

## PASO 1: SELECCIONAR TAREA

### Si hay `$ARGUMENTS`
Leer `.claude/backlog/tasks/$ARGUMENTS.md`

### Si NO hay argumentos (modo automático)
Buscar en `.claude/backlog/tasks/` la tarea óptima:

1. Leer TODOS los archivos de tareas y extraer el frontmatter YAML (status, priority, phase, depends_on)
2. Filtrar: solo `status: backlog`
3. Excluir tareas cuyas dependencias NO estén en `status: done`
4. Ordenar por: `priority` (P0 > P1 > P2 > P3), luego `phase` (menor primero), luego `estimate` (menor primero)
5. Seleccionar la primera

Si no hay tareas elegibles → informar y parar.

### Verificaciones
- Si `status` no es `backlog` ni `in_progress` → error
- Si alguna dependencia no está `done` → listar qué falta y sugerir ejecutarlas primero
- Actualizar `status: in_progress` en el archivo de tarea

### Mostrar resumen breve
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 TASK-XXX | Fase N | Prioridad PX
 Título de la tarea
 Estimate: XL | Tipo: feature
 Archivos: [lista]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

Continuar directamente (no pedir confirmación innecesaria).

---

## PASO 2: PLANEAR

Según el `type` de la tarea, preparar el enfoque:

### type: infrastructure
- Leer los archivos afectados
- Identificar qué cambiar basándose en la descripción y los criterios de aceptación

### type: content
- Leer el copy del briefing desde el campo "Notas del briefing" de la tarea
- Leer `src/messages/es.json` para entender la estructura actual de keys

### type: feature (sección/componente)
- Leer el componente de referencia más similar como patrón:
  - Secciones homepage → `src/components/sections/HeroSection.tsx`
  - Páginas completas → `src/app/[locale]/contact/page.tsx`
  - Layout → `src/components/layout/Header.tsx`
- Leer `.claude/BRAND_VOICE_GUIDE.md`
- Leer traducciones actuales relevantes

### type: page (página nueva)
- Igual que feature + crear ruta en `src/app/[locale]/`
- Preparar: metadata, JSON-LD schema, breadcrumbs

### type: refactor
- Leer archivos a eliminar/modificar
- Identificar imports dependientes

### type: testing
- Leer tests existentes en `e2e/` y `src/__tests__/`
- Identificar qué necesita actualización

---

## PASO 3: EJECUTAR

### Para tareas de contenido (traducciones)
1. **ES**: Implementar copy EXACTO del briefing (no reescribir)
2. **CA**: Traducir al catalán estándar central (IEC). Adaptar: I+D+i→R+D+i, subvenciones→subvencions
3. **EN**: Traducir profesionalmente. Tono B2B. "defense sector", "dual-use"
4. **FR**: Traducir profesionalmente. "secteur de la défense", vouvoiement
5. Verificar sync: las 4 JSON deben tener misma estructura de keys

### Para tareas de componente/feature
1. Escribir traducciones necesarias (4 idiomas, ES primero)
2. Crear/modificar componente TSX siguiendo checklist:
   - `useTranslations('namespace')` — NUNCA hardcodear strings
   - `Container` wrapper
   - Brand colors: `primary-*`, `accent-*`, `neutral-*` (el hook PostToolUse bloqueará violaciones)
   - Responsive: mobile-first (`md:`, `lg:`)
   - Accessibility: alt, aria-labels, heading hierarchy, focus
   - Links: `Link` de `@/lib/i18n/navigation`
   - CTAs: patrón Button existente con variante accent
   - Animaciones: framer-motion `motion.div` con `initial/whileInView/viewport`
3. `'use client'` solo si hay interactividad

### Para tareas de página nueva
- Crear `src/app/[locale]/[ruta]/page.tsx`
- Incluir `generateMetadata()`, `JsonLd`, `PageHeader`, `setRequestLocale(locale)`
- Registrar en sitemap si procede

### Para tareas de infraestructura
- Aplicar cambios según la descripción
- Mantener consistencia con archivos existentes

### Para tareas de refactor
- Eliminar archivos/código obsoleto
- Verificar que no quedan imports rotos (`npx tsc --noEmit`)

---

## PASO 4: VALIDAR

Ejecutar en orden (parar si hay errores bloqueantes):

### 4a. TypeScript check
```bash
npx tsc --noEmit 2>&1 | tail -20
```

### 4b. Brand check (el hook PostToolUse ya lo hace, pero verificar)
```bash
grep -rn "purple-\|violet-\|indigo-\|pink-\|rose-\|fuchsia-\|cyan-\|sky-\|teal-\|lime-\|orange-\|emerald-" src/components/ src/app/ --include="*.tsx" | head -5 || echo "OK: no brand violations"
```

### 4c. i18n sync (si se tocaron traducciones)
```bash
node -e "
const fs=require('fs');
const langs=['es','ca','en','fr'];
const msgs=langs.map(l=>JSON.parse(fs.readFileSync('src/messages/'+l+'.json','utf8')));
const getKeys=(obj,p='')=>Object.keys(obj).reduce((a,k)=>{const path=p?p+'.'+k:k;return typeof obj[k]==='object'&&obj[k]!==null?[...a,...getKeys(obj[k],path)]:[...a,path]},[]);
const esKeys=new Set(getKeys(msgs[0]));
langs.slice(1).forEach((l,i)=>{const lk=new Set(getKeys(msgs[i+1]));const m=[...esKeys].filter(k=>!lk.has(k));if(m.length)console.log('MISSING in '+l+': '+m.slice(0,3).join(', ')+(m.length>3?' +('+(m.length-3)+' more)':''));else console.log('OK: '+l)});
"
```

### 4d. SEO (si se tocaron páginas)
Solo si el tipo es `page` o `feature` que afecta una página:
- Verificar que la página tiene `generateMetadata()`
- Verificar JSON-LD schema present

### 4e. Build rápido (solo si cambios significativos)
Solo ejecutar build completo si se crearon nuevas rutas o se modificó layout:
```bash
npx next build 2>&1 | tail -10
```

---

## PASO 5: FINALIZAR

1. Actualizar el frontmatter de la tarea: `status: done`
2. Mostrar resumen compacto:
```
✅ TASK-XXX completada
   Archivos: [N creados, M modificados]
   Traducciones: [keys añadidas]
   Validación: [resultados]

   Siguiente tarea recomendada: TASK-YYY — [título]
```

3. **Preguntar**: "¿Continúo con TASK-YYY o paramos?"
   - Si continuar → volver al PASO 1 con esa tarea
   - Si parar → fin

---

## Reglas de oro

1. **El copy del briefing es SAGRADO** — implementar literalmente en ES, nunca "mejorar"
2. **El hook de brand bloquea automáticamente** — si usas un color prohibido, el Write fallará con exit 2
3. **Traducciones siempre 4 idiomas** — ES (briefing), CA (traducción), EN (traducción), FR (traducción)
4. **No over-engineer** — implementar exactamente lo que pide la tarea, nada más
5. **Si hay duda sobre el copy** → preguntar al usuario, no inventar
