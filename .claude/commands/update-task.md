---
description: Update [DUALYS] task status in Asana Sprint Board
allowed-tools: mcp__asana__asana_search_tasks, mcp__asana__asana_get_task, mcp__asana__asana_update_task, mcp__asana__asana_create_task_story, mcp__asana__asana_add_task_to_section, mcp__asana__asana_get_project_sections
argument-hint: "N|nombre [to_do|in_process|to_review|done]"
---

# update-task

Update a [DUALYS] task's Sprint Stage in Asana.

## Usage

- `/update-task 1 in_process` - Start working on [DUALYS] 1
- `/update-task 1 to_review` - Mark [DUALYS] 1 ready for review
- `/update-task 1 done` - Mark [DUALYS] 1 as complete
- `/update-task Homepage to_do` - Return a task to "To do" by name
- `/update-task 1 in_progress` - Alias for in_process (backwards compat)
- `/update-task 1 backlog` - Alias for to_do (backwards compat)

## Asana Constants

| Constant | GID |
|----------|-----|
| WORKSPACE | `1205833383496870` |
| PROJECT (Sprint Board) | `1209462838057597` |
| CF_SPRINT_STAGE | `1209484061783081` |
| SPRINT_TODO | `1209484061783084` |
| SPRINT_IN_PROCESS | `1209484061783085` |
| SPRINT_TO_REVIEW | `1209507757193796` |
| SPRINT_DONE | `1209484061783086` |
| SECTION_TODO | `1209462838057600` |
| SECTION_IN_PROGRESS | `1209462838057603` |
| SECTION_TO_REVIEW | `1209507401743440` |
| SECTION_DONE | `1209462838057604` |

## Instructions

### Step 1: Parse Arguments

Parse `$ARGUMENTS` into two parts:

1. **Task identifier** (first part, required):
   - **Short number** (1-2 digits): Search for `[DUALYS] N` in the project
   - **Text fragment**: Search for `[DUALYS]` tasks matching that text
   - **Long GID** (13+ digits): Fetch directly with `asana_get_task`

2. **New status** (second part, required):
   - `to_do` → Sprint Stage "To do"
   - `in_process` → Sprint Stage "In process"
   - `to_review` → Sprint Stage "To Review"
   - `done` → Sprint Stage "Done" + mark completed
   - Aliases: `backlog` → `to_do`, `in_progress` → `in_process`

If either part is missing, show usage and exit.

### Step 2: Resolve Task

**If short number**: Use `mcp__asana__asana_search_tasks` with:
- `workspace`: `1205833383496870`
- `projects_any`: `1209462838057597`
- `text`: `[DUALYS] N` (where N is the number)
- `completed`: `false`
- `is_subtask`: `false`
- `opt_fields`: `name,completed,custom_fields,dependencies`

Pick the first match. If no match, error: "Task [DUALYS] N not found in Sprint Board."

**If text fragment**: Same search but with `text`: `[DUALYS] fragment`. If multiple matches, list them and ask user to specify.

**If GID**: Use `mcp__asana__asana_get_task` directly with `opt_fields`: `name,completed,custom_fields,dependencies`.

### Step 3: Validate Transition

1. Read current Sprint Stage from `custom_fields` (GID `1209484061783081`) → `enum_value.name`
2. **Same status**: If current equals target, inform "Task is already [status]" and exit
3. **Reopening**: If current is "Done" and target is not, warn: "Reopening completed task. Proceed?"
4. **Marking done**: If target is `done`, check `dependencies`. For each dependency, fetch with `asana_get_task` and verify `completed: true`. If any incomplete, warn: "Dependencies not complete: [names]. Proceed anyway?"

### Step 4: Update in Asana

**Status mapping** (Sprint Stage custom field + section):

| Status | Sprint Stage enum GID | Section GID | Also set |
|--------|----------------------|-------------|----------|
| `to_do` | `1209484061783084` | `1209462838057600` | `completed: false` |
| `in_process` | `1209484061783085` | `1209462838057603` | - |
| `to_review` | `1209507757193796` | `1209507401743440` | - |
| `done` | `1209484061783086` | `1209462838057604` | `completed: true` |

Execute in order:

1. **Update Sprint Stage** custom field:
   ```
   mcp__asana__asana_update_task:
     task_id: [GID]
     custom_fields: { "1209484061783081": "[ENUM_OPTION_GID]" }
   ```

2. **If done, also mark completed**:
   ```
   mcp__asana__asana_update_task:
     task_id: [GID]
     completed: true
   ```

3. **Move to correct section**:
   ```
   mcp__asana__asana_add_task_to_section:
     task_id: [GID]
     section_id: "[SECTION_GID]"
   ```

4. **Add comment**:
   ```
   mcp__asana__asana_create_task_story:
     task_id: [GID]
     text: "Sprint Stage changed: [old] -> [new] (via Claude Code /update-task)"
   ```

### Step 5: Show Confirmation

```markdown
## Task Updated (Asana)

| Field | Before | After |
|-------|--------|-------|
| Sprint Stage | [old] | [new] |
| Section | [old section] | [new section] |

Task: [DUALYS] N - [title]
Asana GID: [gid]

### Next Steps
[If done:] Task marked complete. Use `/suggest-task` to see what's next.
[If in_process:] Task is now your focus. Run `/develop N` to start working.
[If to_do:] Task returned to To Do.
[If to_review:] Task awaiting review by the team.
```

## Error Handling

| Situation | Message |
|-----------|---------|
| Task not found | `[ERROR] Task "[identifier]" not found in Asana Sprint Board.` |
| Missing status argument | `[ERROR] Missing status. Usage: /update-task N [to_do\|in_process\|to_review\|done]` |
| Invalid status | `[ERROR] Invalid status "[status]". Valid: to_do, in_process, to_review, done` |
| Multiple matches | `[INFO] Multiple tasks match "[text]". Please specify:` + list |
| Asana API error | `[ERROR] Could not update task in Asana. Check MCP server configuration.` |

## CRITICAL RULES

- **ALWAYS validate task exists** before attempting update
- **ALWAYS confirm** when reopening a completed task
- **ALWAYS check dependencies** when marking done
- **ALWAYS update both** Sprint Stage custom field AND section
- **ALWAYS show before/after** for transparency
- **ALWAYS add a comment** documenting the change
