import type { Todo } from "../../types/todo";

const STORAGE_KEY = "todos";
const FETCH_DELAY_MS = 120;
const SAVE_DELAY_MS = 80;

export type TodoStorageErrorCode = "UNAVAILABLE" | "CORRUPT";

export class TodoStorageError extends Error {
  readonly code: TodoStorageErrorCode;

  constructor(code: TodoStorageErrorCode, message: string) {
    super(message);
    this.name = "TodoStorageError";
    this.code = code;
  }
}

function isTodo(value: unknown): value is Todo {
  if (!value || typeof value !== "object") {
    return false;
  }

  const candidate = value as Partial<Todo>;

  return (
    typeof candidate.id === "string" &&
    typeof candidate.text === "string" &&
    typeof candidate.completed === "boolean"
  );
}

function getStorage(): Storage {
  if (typeof window === "undefined" || typeof window.localStorage === "undefined") {
    throw new TodoStorageError(
      "UNAVAILABLE",
      "Local storage is unavailable in this environment."
    );
  }

  return window.localStorage;
}

function wait(durationMs: number): Promise<void> {
  return new Promise((resolve) => {
    globalThis.setTimeout(resolve, durationMs);
  });
}

function parseTodos(rawTodos: string | null): Todo[] {
  if (!rawTodos) {
    return [];
  }

  let parsed: unknown;

  try {
    parsed = JSON.parse(rawTodos) as unknown;
  } catch {
    throw new TodoStorageError(
      "CORRUPT",
      "Stored todo data is not valid JSON."
    );
  }

  if (!Array.isArray(parsed) || !parsed.every(isTodo)) {
    throw new TodoStorageError(
      "CORRUPT",
      "Stored todo data does not match the expected schema."
    );
  }

  return parsed.map((todo) => ({
    id: todo.id,
    text: todo.text,
    completed: todo.completed,
  }));
}

export async function fetchTodos(): Promise<Todo[]> {
  await wait(FETCH_DELAY_MS);
  const storage = getStorage();
  return parseTodos(storage.getItem(STORAGE_KEY));
}

export async function saveTodos(todos: Todo[]): Promise<void> {
  await wait(SAVE_DELAY_MS);
  const storage = getStorage();

  try {
    storage.setItem(STORAGE_KEY, JSON.stringify(todos));
  } catch {
    throw new TodoStorageError(
      "UNAVAILABLE",
      "Unable to save todos to local storage."
    );
  }
}

export async function clearTodosStorage(): Promise<void> {
  await wait(SAVE_DELAY_MS);
  const storage = getStorage();
  storage.removeItem(STORAGE_KEY);
}
