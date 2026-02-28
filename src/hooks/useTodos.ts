import { useCallback, useEffect, useMemo, useState } from "react";
import {
  clearTodosStorage,
  fetchTodos,
  saveTodos,
  TodoStorageError,
  type TodoStorageErrorCode,
} from "../lib/todos/storage";
import type { Todo } from "../types/todo";

export type TodosLoadStatus = "loading" | "ready" | "error";
type TodosUiErrorCode = TodoStorageErrorCode | "UNKNOWN";

interface TodosUiError {
  code: TodosUiErrorCode;
  message: string;
}

function toUiError(error: unknown): TodosUiError {
  if (error instanceof TodoStorageError) {
    if (error.code === "CORRUPT") {
      return {
        code: "CORRUPT",
        message:
          "Stored todo data is corrupted. You can reset local data and continue.",
      };
    }

    return {
      code: "UNAVAILABLE",
      message:
        "Local storage is unavailable right now. Check browser storage settings and retry.",
    };
  }

  return {
    code: "UNKNOWN",
    message: "Something went wrong while processing todos. Please retry.",
  };
}

export function useTodos() {
  const [status, setStatus] = useState<TodosLoadStatus>("loading");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loadError, setLoadError] = useState<TodosUiError | null>(null);
  const [mutationError, setMutationError] = useState<TodosUiError | null>(null);
  const [inputError, setInputError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const loadTodos = useCallback(async () => {
    setStatus("loading");
    setLoadError(null);

    try {
      const loadedTodos = await fetchTodos();
      setTodos(loadedTodos);
      setStatus("ready");
    } catch (error) {
      setLoadError(toUiError(error));
      setStatus("error");
    }
  }, []);

  useEffect(() => {
    void loadTodos();
  }, [loadTodos]);

  const persistNextTodos = useCallback(
    async (nextTodos: Todo[]) => {
      const previousTodos = todos;
      setTodos(nextTodos);
      setIsSaving(true);
      setMutationError(null);

      try {
        await saveTodos(nextTodos);
        return true;
      } catch (error) {
        setTodos(previousTodos);
        setMutationError(toUiError(error));
        return false;
      } finally {
        setIsSaving(false);
      }
    },
    [todos]
  );

  const addTodo = useCallback(
    async (text: string) => {
      if (status !== "ready" || isSaving) {
        return false;
      }

      const trimmed = text.trim();

      if (!trimmed) {
        setInputError("Enter a todo before adding.");
        return false;
      }

      setInputError(null);

      const nextTodos: Todo[] = [
        {
          id: crypto.randomUUID(),
          text: trimmed,
          completed: false,
        },
        ...todos,
      ];

      return persistNextTodos(nextTodos);
    },
    [isSaving, persistNextTodos, status, todos]
  );

  const toggleTodo = useCallback(
    async (id: string) => {
      if (status !== "ready" || isSaving) {
        return false;
      }

      const nextTodos = todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      );

      return persistNextTodos(nextTodos);
    },
    [isSaving, persistNextTodos, status, todos]
  );

  const deleteTodo = useCallback(
    async (id: string) => {
      if (status !== "ready" || isSaving) {
        return false;
      }

      const nextTodos = todos.filter((todo) => todo.id !== id);
      return persistNextTodos(nextTodos);
    },
    [isSaving, persistNextTodos, status, todos]
  );

  const resetCorruptData = useCallback(async () => {
    if (!loadError || loadError.code !== "CORRUPT") {
      return;
    }

    setIsSaving(true);

    try {
      await clearTodosStorage();
      await loadTodos();
    } catch (error) {
      setLoadError(toUiError(error));
      setStatus("error");
    } finally {
      setIsSaving(false);
    }
  }, [loadError, loadTodos]);

  const summary = useMemo(() => {
    const completed = todos.filter((todo) => todo.completed).length;
    const remaining = todos.length - completed;

    return { completed, remaining };
  }, [todos]);

  return {
    status,
    todos,
    loadError,
    mutationError,
    inputError,
    isSaving,
    summary,
    loadTodos,
    resetCorruptData,
    addTodo,
    toggleTodo,
    deleteTodo,
  };
}
