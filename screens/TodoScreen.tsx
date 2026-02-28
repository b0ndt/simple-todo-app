import { useState, type KeyboardEvent } from "react";
import { AlertTriangle, Check, LoaderCircle, Trash2 } from "lucide-react";
import { Button, Card } from "../design-system/components/ui";
import { useTodos } from "../src/hooks/useTodos";

export default function TodoScreen() {
  const [inputValue, setInputValue] = useState("");
  const {
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
  } = useTodos();

  const isInputDisabled = status !== "ready" || isSaving;
  const canSubmit = inputValue.trim().length > 0 && !isInputDisabled;

  const handleAdd = async () => {
    const didAdd = await addTodo(inputValue);

    if (didAdd) {
      setInputValue("");
    }
  };

  const handleKeyDown = async (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      await handleAdd();
    }
  };

  return (
    <div className="min-h-screen bg-background font-sans">
      <div className="app-container">
        <header className="mb-8 text-center">
          <img
            src="/assets/logo.png"
            alt="Todo logo"
            className="mx-auto mb-4 h-14 w-14"
            loading="eager"
          />
          <h1 className="text-4xl font-extrabold tracking-tight text-text-primary">
            Todo
          </h1>
          <p className="mt-2 text-base text-text-muted">
            Stay focused. Get things done.
          </p>
        </header>

        <div className="mb-6">
          <img
            src="/assets/hero.png"
            alt="Todo app hero illustration"
            className="w-full rounded-lg border border-border shadow-sm"
            loading="lazy"
          />
        </div>

        <div className="mb-2 flex gap-3">
          <input
            type="text"
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
            onKeyDown={(event) => void handleKeyDown(event)}
            placeholder="What needs to be done?"
            disabled={isInputDisabled}
            className="h-11 flex-1 rounded-md border border-border bg-surface px-3 text-base text-text-primary placeholder:text-text-muted focus:border-border-focus focus:outline-none focus:ring-2 focus:ring-border-focus/30 disabled:cursor-not-allowed disabled:bg-disabled-bg disabled:text-disabled-text"
          />
          <Button
            variant="primary"
            size="md"
            onClick={() => void handleAdd()}
            disabled={!canSubmit}
          >
            {isSaving && <LoaderCircle className="h-4 w-4 animate-spin" />}
            {isSaving ? "Saving..." : "Add"}
          </Button>
        </div>

        {inputError && <p className="mb-4 text-sm text-danger">{inputError}</p>}

        {mutationError && (
          <Card className="mb-4 border-danger/40 bg-danger-light">
            <div className="flex items-start gap-2">
              <AlertTriangle className="mt-0.5 h-4 w-4 text-danger" />
              <div>
                <p className="text-sm font-medium text-danger">
                  Could not save your latest change.
                </p>
                <p className="text-sm text-text-secondary">{mutationError.message}</p>
              </div>
            </div>
          </Card>
        )}

        {status === "loading" && (
          <div className="flex flex-col gap-3">
            {[0, 1, 2].map((placeholder) => (
              <Card key={placeholder} className="animate-pulse">
                <div className="h-6 w-2/3 rounded-md bg-disabled-bg" />
              </Card>
            ))}
          </div>
        )}

        {status === "error" && loadError && (
          <Card className="border-danger/40 bg-danger-light">
            <div className="flex items-start gap-3">
              <AlertTriangle className="mt-0.5 h-5 w-5 text-danger" />
              <div className="flex-1">
                <h2 className="text-base font-semibold text-danger">
                  Unable to load todos
                </h2>
                <p className="mt-1 text-sm text-text-secondary">{loadError.message}</p>
                <div className="mt-4 flex flex-wrap gap-3">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => void loadTodos()}
                    disabled={isSaving}
                  >
                    Retry
                  </Button>
                  {loadError.code === "CORRUPT" && (
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => void resetCorruptData()}
                      disabled={isSaving}
                    >
                      Reset local data
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </Card>
        )}

        {status === "ready" && (
          <>
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
                <Card key={todo.id} variant={todo.completed ? "completed" : "default"}>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => void toggleTodo(todo.id)}
                      disabled={isInputDisabled}
                      className={`flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-sm border-2 transition-all-fast ${
                        todo.completed
                          ? "border-success bg-success text-surface"
                          : "border-border bg-surface hover:border-primary"
                      } disabled:cursor-not-allowed disabled:border-disabled-text`}
                      aria-label={
                        todo.completed
                          ? `Mark "${todo.text}" as incomplete`
                          : `Mark "${todo.text}" as complete`
                      }
                    >
                      {todo.completed && <Check className="h-3 w-3" strokeWidth={3} />}
                    </button>

                    <span
                      className={`flex-1 text-base leading-relaxed ${
                        todo.completed
                          ? "text-strikethrough text-text-muted"
                          : "text-text-primary"
                      }`}
                    >
                      {todo.text}
                    </span>

                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => void deleteTodo(todo.id)}
                      aria-label={`Delete "${todo.text}"`}
                      className="text-text-muted hover:bg-danger-light hover:text-danger"
                      disabled={isInputDisabled}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>

            {todos.length > 0 && (
              <div className="mt-6 flex justify-center gap-4 text-sm text-text-secondary">
                <span>
                  {summary.remaining} item{summary.remaining !== 1 ? "s" : ""} left
                </span>
                <span className="text-border">·</span>
                <span>{summary.completed} done</span>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
