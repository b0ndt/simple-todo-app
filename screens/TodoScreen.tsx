import React, { useState, useEffect } from "react";
import { Button, Card } from "../design-system/components/ui";

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

const STORAGE_KEY = "todos";

function loadTodos(): Todo[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveTodos(todos: Todo[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

export default function TodoScreen() {
  const [todos, setTodos] = useState<Todo[]>(loadTodos);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    saveTodos(todos);
  }, [todos]);

  const handleAdd = () => {
    const trimmed = inputValue.trim();
    if (!trimmed) return;
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      text: trimmed,
      completed: false,
    };
    setTodos((prev) => [newTodo, ...prev]);
    setInputValue("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleAdd();
  };

  const toggleComplete = (id: string) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const deleteTodo = (id: string) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  const remaining = todos.filter((t) => !t.completed).length;
  const completed = todos.filter((t) => t.completed).length;

  return (
    <div className="min-h-screen bg-background font-sans">
      <div className="app-container">
        {/* Header */}
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-extrabold text-text-primary tracking-tight">
            Todo
          </h1>
          <p className="mt-2 text-base text-text-muted">
            Stay focused. Get things done.
          </p>
        </header>

        {/* Add Todo Input Row */}
        <div className="flex gap-3 mb-6">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="What needs to be done?"
            className="flex-1 h-10 px-3 text-base bg-surface text-text-primary
                       border border-border rounded-md
                       placeholder:text-text-muted
                       focus:outline-none focus:border-border-focus focus:ring-2 focus:ring-border-focus/30
                       transition-all-fast"
          />
          <Button variant="primary" size="md" onClick={handleAdd}>
            Add
          </Button>
        </div>

        {/* Todo List */}
        <div className="flex flex-col gap-3">
          {todos.length === 0 && (
            <div className="py-16 text-center">
              <p className="text-lg text-text-muted">No todos yet</p>
              <p className="mt-1 text-sm text-text-muted">
                Add one above to get started
              </p>
            </div>
          )}

          {todos.map((todo) => (
            <Card
              key={todo.id}
              variant={todo.completed ? "completed" : "default"}
            >
              <div className="flex items-center gap-3">
                {/* Checkbox */}
                <button
                  onClick={() => toggleComplete(todo.id)}
                  className={`flex-shrink-0 w-5 h-5 rounded-sm border-2 flex items-center justify-center
                             transition-all-fast
                             ${
                               todo.completed
                                 ? "bg-success border-success text-white"
                                 : "border-border hover:border-primary bg-surface"
                             }`}
                  aria-label={
                    todo.completed
                      ? `Mark "${todo.text}" as incomplete`
                      : `Mark "${todo.text}" as complete`
                  }
                >
                  {todo.completed && (
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M2.5 6L5 8.5L9.5 3.5"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </button>

                {/* Todo Text */}
                <span
                  className={`flex-1 text-base leading-relaxed ${
                    todo.completed
                      ? "text-strikethrough text-text-muted"
                      : "text-text-primary"
                  }`}
                >
                  {todo.text}
                </span>

                {/* Delete Button */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => deleteTodo(todo.id)}
                  aria-label={`Delete "${todo.text}"`}
                  className="text-text-muted hover:text-danger hover:bg-danger-light"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2 4H14M5.333 4V2.667C5.333 2.313 5.474 1.973 5.724 1.724C5.974 1.474 6.313 1.333 6.667 1.333H9.333C9.687 1.333 10.026 1.474 10.276 1.724C10.526 1.973 10.667 2.313 10.667 2.667V4M12.667 4V13.333C12.667 13.687 12.526 14.026 12.276 14.276C12.026 14.526 11.687 14.667 11.333 14.667H4.667C4.313 14.667 3.974 14.526 3.724 14.276C3.474 14.026 3.333 13.687 3.333 13.333V4H12.667Z"
                      stroke="currentColor"
                      strokeWidth="1.33"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Footer Stats */}
        {todos.length > 0 && (
          <div className="mt-6 flex justify-center gap-4 text-sm text-text-secondary">
            <span>
              {remaining} item{remaining !== 1 ? "s" : ""} left
            </span>
            <span className="text-border">·</span>
            <span>
              {completed} done
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
