import type { TodoSummary } from "@/types/todo";
import StatusLabel from "./StatusLabel";
import TodoItem from "./TodoItem";

interface TodoSectionProps {
  done: boolean;
  todos: TodoSummary[];
  onToggle: (todo: TodoSummary) => void;
}

/** 빈 상태 문구 (시안 그대로 두 줄) */
const EMPTY_TEXT = {
  todo: ["할 일이 없어요.", "TODO를 새롭게 추가해주세요!"],
  done: ["아직 다 한 일이 없어요.", "해야 할 일을 체크해보세요!"],
};

/** TO DO 또는 DONE 섹션. 항목이 없으면 빈 상태 일러스트를 보여준다. */
export default function TodoSection({ done, todos, onToggle }: TodoSectionProps) {
  const key = done ? "done" : "todo";

  return (
    <section className="flex-1">
      <StatusLabel done={done} />
      {todos.length > 0 ? (
        <ul className="mt-4 flex flex-col gap-4">
          {todos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} onToggle={onToggle} />
          ))}
        </ul>
      ) : (
        <div className="flex flex-col items-center py-6 tablet:py-16">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`/images/empty-${key}-small.svg`} alt="" className="h-[120px] tablet:hidden" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`/images/empty-${key}-large.svg`} alt="" className="hidden h-[240px] tablet:block" />
          <p className="mt-6 text-center text-base font-bold text-slate-400">
            {EMPTY_TEXT[key][0]}
            <br />
            {EMPTY_TEXT[key][1]}
          </p>
        </div>
      )}
    </section>
  );
}
