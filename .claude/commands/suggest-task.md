---
description: Suggest the next [DUALYS] task from Asana Sprint Board based on dependencies, priority, and hours
allowed-tools: mcp__asana__asana_search_tasks, mcp__asana__asana_get_task, mcp__asana__asana_get_tasks_for_project
---

# suggest-task

Analyze the Asana Sprint Board to recommend the next [DUALYS] task to work on.

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
| PRIORITY_HIGH | `1206745226675835` |
| PRIORITY_MEDIUM | `1206745226675836` |
| PRIORITY_LOW | `1206745226675837` |

## Instructions

### Step 1: Fetch [DUALYS] Tasks from Asana

Use `mcp__asana__asana_search_tasks` with:
- `workspace`: `1205833383496870`
- `projects_any`: `1209462838057597`
- `text`: `[DUALYS]`
- `completed`: `false`
- `is_subtask`: `false`
- `opt_fields`: `name,completed,due_on,custom_fields,dependencies`

### Step 2: Classify Tasks by Sprint Stage

From the results, read each task's `custom_fields` to extract:
- **Sprint Stage** (GID `1209484061783081`): read `enum_value.gid`
- **Priority** (GID `1206745226672023`): read `enum_value.name`
- **Horas** (GID `1209700607881769`): read `number_value`

Classify into groups:
- **To do**: Sprint Stage enum_value.gid = `1209484061783084`
- **In process**: Sprint Stage enum_value.gid = `1209484061783085`
- **To Review**: Sprint Stage enum_value.gid = `1209507757193796`

### Step 3: Check Dependencies for "To do" Tasks

For each "To do" task that has `dependencies` (non-empty array):
- Use `mcp__asana__asana_get_task` for each dependency GID with `opt_fields: "name,completed"`
- Task is **ready** if all dependencies have `completed: true`
- Task is **blocked** if any dependency has `completed: false`

Tasks with no dependencies are always **ready**.

### Step 4: Prioritize Ready Tasks

Sort ready tasks by:
1. **Priority**: High > Medium > Low (High first)
2. **Horas ascending**: Lower hours first (quick wins)
3. **Due date ascending**: Earlier due dates first

### Step 5: Present Recommendations

```markdown
## Next Task Recommendations (Asana Sprint Board)

### Ready to Start

| # | Task | Priority | Hours | Due | Why |
|---|------|----------|-------|-----|-----|
| 1 | [DUALYS] N - [title] | High | 4h | 25 abr | [reason: blocks N tasks / quick win / overdue] |
| 2 | ... | ... | ... | ... | ... |

### Blocked Tasks
- [DUALYS] N - [title]: Waiting on [dependency names]

### In Progress
- [DUALYS] N - [title] (Sprint Stage: In process)

### To Review
- [DUALYS] N - [title] (Sprint Stage: To Review)

### Quick Actions
- Start #1: `/develop N`
- Update status: `/update-task N in_process`
```

## Error Handling

| Situation | Message |
|-----------|---------|
| No [DUALYS] tasks found | `[INFO] No [DUALYS] tasks found in Asana Sprint Board. Create tasks in Asana first.` |
| All tasks blocked | `[INFO] All [DUALYS] tasks are blocked. Showing dependency analysis...` |
| All tasks done/in progress | `[INFO] No "To do" tasks remaining. All tasks are in progress or completed.` |
| Asana API error | `[ERROR] Could not reach Asana. Check MCP server configuration in .mcp.json` |

## CRITICAL RULES

- **NEVER modify any tasks** - this is a read-only analysis command
- **ALWAYS check dependency status** before recommending a task
- **ALWAYS show what's blocking** tasks that can't be started
- **PREFER tasks that unblock others** over isolated tasks
