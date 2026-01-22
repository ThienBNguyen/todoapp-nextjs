"use client";

import { useState, useTransition } from "react";
import { addTodo, toggleTodo, deleteTodo, clearCompleted } from "./actions";

type Todo = {
  id: string;
  title: string;
  complete: boolean;
};

export default function TodosClient({ todos }: { todos: Todo[] }) {
  const [title, setTitle] = useState("");
  const [isPending, startTransition] = useTransition();

  const remaining = todos.filter((t) => !t.complete).length;

  return (
    <main style={{ maxWidth: 640, margin: "40px auto", padding: 16 }}>
      <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 16 }}>Todos</h1>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          const t = title.trim();
          if (!t) return;

          startTransition(async () => {
            await addTodo(t);
            setTitle("");
          });
        }}
        style={{ display: "flex", gap: 8, marginBottom: 16 }}
      >
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add a todo..."
          autoComplete="off"
          style={{
            flex: 1,
            padding: "10px 12px",
            border: "1px solid #ddd",
            borderRadius: 8,
          }}
        />
        <button
          type="submit"
          disabled={isPending}
          style={{
            padding: "10px 14px",
            borderRadius: 8,
            border: "1px solid #ddd",
            cursor: "pointer",
            opacity: isPending ? 0.6 : 1,
          }}
        >
          Add
        </button>
      </form>

      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
        <div style={{ color: "#555" }}>
          Remaining: <b>{remaining}</b>
        </div>

        <button
          onClick={() => startTransition(async () => clearCompleted())}
          disabled={isPending}
          style={{
            padding: "8px 10px",
            borderRadius: 8,
            border: "1px solid #ddd",
            cursor: "pointer",
            opacity: isPending ? 0.6 : 1,
          }}
        >
          Clear completed
        </button>
      </div>

      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {todos.map((t) => (
          <li
            key={t.id}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 12,
              padding: "10px 12px",
              border: "1px solid #eee",
              borderRadius: 10,
              marginBottom: 10,
            }}
          >
            <button
              onClick={() => startTransition(async () => toggleTodo(t.id))}
              disabled={isPending}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                width: "100%",
                background: "transparent",
                border: "none",
                padding: 0,
                textAlign: "left",
                cursor: "pointer",
                opacity: isPending ? 0.7 : 1,
              }}
              title="Toggle complete"
            >
              <input type="checkbox" checked={t.complete} readOnly />
              <span
                style={{
                  fontSize: 16,
                  textDecoration: t.complete ? "line-through" : "none",
                  color: t.complete ? "#888" : "#111",
                }}
              >
                {t.title}
              </span>
            </button>

            <button
              onClick={() => startTransition(async () => deleteTodo(t.id))}
              disabled={isPending}
              style={{
                padding: "8px 10px",
                borderRadius: 8,
                border: "1px solid #ddd",
                cursor: "pointer",
                opacity: isPending ? 0.6 : 1,
              }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
}
