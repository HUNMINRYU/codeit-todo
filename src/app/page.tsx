"use client";

import { useEffect, useState } from "react";
import TodoInput from "@/components/TodoInput";
import TodoSection from "@/components/TodoSection";
import { createTodo, getTodos, updateTodo } from "@/lib/api";
import type { TodoSummary } from "@/types/todo";

/** 할 일 목록 페이지(/): 조회, 추가, 완료 토글 */
export default function HomePage() {
  const [todos, setTodos] = useState<TodoSummary[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch((e: Error) => alert(e.message))
      .finally(() => setLoading(false));
  }, []);

  /** 새 할 일을 만들고 목록 맨 앞에 넣는다 */
  const handleAdd = async (name: string) => {
    try {
      const created = await createTodo(name);
      setTodos((prev) => [{ id: created.id, name: created.name, isCompleted: created.isCompleted }, ...prev]);
    } catch (e) {
      alert((e as Error).message);
    }
  };

  /** 완료 상태를 먼저 화면에 반영하고, 서버 요청이 실패하면 되돌린다 */
  const handleToggle = async (todo: TodoSummary) => {
    const next = !todo.isCompleted;
    setTodos((prev) => prev.map((t) => (t.id === todo.id ? { ...t, isCompleted: next } : t)));
    try {
      await updateTodo(todo.id, { isCompleted: next });
    } catch (e) {
      setTodos((prev) => prev.map((t) => (t.id === todo.id ? { ...t, isCompleted: !next } : t)));
      alert((e as Error).message);
    }
  };

  const inProgress = todos.filter((t) => !t.isCompleted);
  const done = todos.filter((t) => t.isCompleted);

  return (
    <main className="mx-auto max-w-[1200px] px-4 pt-4 pb-12 tablet:px-6 tablet:pt-6 desktop:px-0">
      <TodoInput onAdd={handleAdd} />
      {loading ? (
        <p className="mt-10 text-center text-slate-400">불러오는 중...</p>
      ) : (
        <div className="mt-6 flex flex-col gap-12 tablet:mt-10 desktop:flex-row desktop:gap-6">
          <TodoSection done={false} todos={inProgress} onToggle={handleToggle} />
          <TodoSection done todos={done} onToggle={handleToggle} />
        </div>
      )}
    </main>
  );
}
