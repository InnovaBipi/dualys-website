---
description: "Auto-desarrollo: coge la tarea [DUALYS] más prioritaria de Asana (o la indicada), la planea y ejecuta con validación completa de SEO, brand, a11y e i18n."
allowed-tools: "Read, Write, Edit, Bash, Grep, Glob, Agent, WebSearch, WebFetch, Skill, mcp__asana__asana_search_tasks, mcp__asana__asana_get_task, mcp__asana__asana_update_task, mcp__asana__asana_create_task_story, mcp__asana__asana_add_task_to_section, mcp__asana__asana_get_tasks_for_project"
argument-hint: "[N | nombre]"
effort: high
---

# /develop — Auto-desarrollo de tareas [DUALYS] desde Asana

Sin argumentos: coge la tarea [DUALYS] más prioritaria con dependencias satisfechas.
Con argumento: ejecuta esa tarea específica (ej: `/develop 1`, `/develop Homepage`).

## Asana Constants

| Constant | GID |
|----------|-----|
| WORKSPACE | `1205833383496870` |
| PROJECT (Sprint Board) | `1209462838057597` |
| CF_SPRINT_STAGE | `1209484061783081` |
| CF_PRIORITY | `1206745226672023` |
| CF_HORAS | `1209700607881769` |
| SPRINT_TODO | `1209484061783084` |
| SPRINT_IN_PROCESS | `1209484061783085` |
| SPRINT_TO_REVIEW | `1209507757193796` |
| SPRINT_DONE | `1209484061783086` |
| SECTION_IN_PROGRESS | `1209462838057603` |
| SECTION_TO_REVIEW | `1209507401743440` |

---

## PASO 1: SELECCIONAR TAREA

### Si hay `$ARGUMENTS`

Resolver la tarea en Asana:

1. **Si es un número corto** (1-2 dígitos): Buscar con `mcp__asana__asana_search_tasks`:
   - `workspace`: `1205833383496870`
   - `projects_any`: `1209462838057597`
   - `text`: `[DUALYS] $ARGUMENTS`
   - `completed`: `false`, `is_subtask`: `false`
   - `opt_fields`: `name,notes,completed,due_on,custom_fields,dependencies`
   - Coger el primer resultado que contenga `[DUALYS] $ARGUMENTS` en el nombre

2. **Si es texto** (ej: `Homepage`): Misma búsqueda con `text`: `[DUALYS] $ARGUMENTS`

3. **Si es un GID largo** (13+ dígitos): Fetch directo con `mcp__asana__asana_get_task`

### Si NO hay argumentos (modo automático)

Buscar en Asana la tarea óptima:

1. Usar `mcp__asana__asana_search_tasks` con `text: "[DUALYS]"`, `projects_any: "1209462838057597"`, `completed: false`, `is_subtask: false`, `opt_fields: "name,notes,completed,due_on,custom_fields,dependencies"`
2. Filtrar: solo tareas con Sprint Stage (CF `1209484061783081`) = "To do" (enum `1209484061783084`)
3. Excluir tareas con dependencias no completadas (para cada dep, verificar `completed: true`)
4. Ordenar por: Priority (High > Medium > Low), luego Horas (menor primero), luego due_on (anterior primero)
5. Seleccionar la primera

Si no hay tareas elegibles → informar y parar.

### Verificaciones
- Si Sprint Stage es "Done" → error: "Tarea ya completada en Asana"
- Si tiene dependencias incompletas → listar qué falta y sugerir ejecutarlas primero
- Actualizar Sprint Stage a "In process": `mcp__asana__asana_update_task` con `custom_fields: { "1209484061783081": "1209484061783085" }`
- Mover a sección "In progress": `mcp__asana__asana_add_task_to_section` con `section_id: "1209462838057603"`

### Inferir tipo de tarea

Leer el campo `notes` de la tarea. Buscar `Type:` en la descripción:
- Si tiene `Type: infrastructure|feature|content|page|refactor|testing` → usar ese tipo
- Si no, inferir del nombre:
  - "Header", "Footer", "Layout", "globals" → `infrastructure`
  - "Redisseny", "Homepage", "pàgina" → `feature`
  - "Pàgines", "sectors", "verticals" → `page`
  - "contingut", "traduccions", "copy" → `content`
- Default: `feature`

### Mostrar resumen breve
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 [DUALYS] N | Priority: High
 Título de la tarea
 Horas: 4h | Due: 25 abr | Tipo: infrastructure
 Asana GID: 1214180429861248
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

1. **Actualizar Sprint Stage a "To Review"** en Asana:
   ```
   mcp__asana__asana_update_task:
     task_id: [GID de la tarea]
     custom_fields: { "1209484061783081": "1209507757193796" }
   ```

2. **Mover a sección "To review"**:
   ```
   mcp__asana__asana_add_task_to_section:
     task_id: [GID]
     section_id: "1209507401743440"
   ```

3. **Añadir comentario en Asana**:
   ```
   mcp__asana__asana_create_task_story:
     task_id: [GID]
     text: "Completed by Claude Code.\nFiles: [N created, M modified]\nTranslations: [keys added]\nValidation: [results summary]"
   ```

4. Mostrar resumen compacto:
```
[DUALYS] N completada → To Review
   Archivos: [N creados, M modificados]
   Traducciones: [keys añadidas]
   Validación: [resultados]
   Asana: Sprint Stage actualizado a "To Review"

   Siguiente tarea recomendada: [DUALYS] M — [título]
```

5. **Preguntar**: "¿Continúo con [DUALYS] M o paramos?"
   - Si continuar → volver al PASO 1 con esa tarea
   - Si parar → fin

---

## Reglas de oro

1. **El copy del briefing es SAGRADO** — implementar literalmente en ES, nunca "mejorar"
2. **El hook de brand bloquea automáticamente** — si usas un color prohibido, el Write fallará con exit 2
3. **Traducciones siempre 4 idiomas** — ES (briefing), CA (traducción), EN (traducción), FR (traducción)
4. **No over-engineer** — implementar exactamente lo que pide la tarea, nada más
5. **Si hay duda sobre el copy** → preguntar al usuario, no inventar
