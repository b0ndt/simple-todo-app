# Requirements — Simple Todo App (MUST)

## MUST 1 — Add a todo
- **Given** the user is viewing the todo list
  **When** the user enters non-empty text and submits
  **Then** a new todo item is added to the list showing that text.
- **Given** the user is viewing the todo list
  **When** the user submits empty or whitespace-only text
  **Then** no todo is added and the list remains unchanged.

## MUST 2 — View todos
- **Given** the user is viewing the todo list
  **When** there are zero todos
  **Then** the UI clearly indicates there are no items to display.
- **Given** the user is viewing the todo list
  **When** one or more todos exist
  **Then** all todos are visible in a clear, readable list.

## MUST 3 — Complete/uncomplete a todo
- **Given** a todo exists in the list and is incomplete
  **When** the user marks it complete
  **Then** the todo is visually indicated as completed and its completed state is stored.
- **Given** a todo exists in the list and is complete
  **When** the user unmarks it
  **Then** the todo returns to the incomplete visual state and the stored state updates accordingly.

## MUST 4 — Delete a todo
- **Given** a todo exists in the list
  **When** the user deletes it
  **Then** the todo is removed from the list and cannot be interacted with further.

## MUST 5 — Persistence (local)
- **Given** the user has one or more todos
  **When** the user refreshes or reopens the app
  **Then** the todos (text + completed state) are restored to the same state as last seen.

---

## Handoff
- **Artifacts**: `docs/requirements/01-requirements.md`
- **Open questions**:
  - Is persistence required via browser-only storage (e.g., localStorage) or via a backend API?
  - Should there be any ordering rules (newest-first vs oldest-first), or manual reordering?
- **Env vars needed**:
  - None identified (no architecture/environment docs found in this repo).
- **BLOCKER**:
  - No architecture docs or implementation are present in the repository to confirm required API keys/env vars or to implement a mock/fallback for missing keys.
