import Link from "next/link";
import type { TodoSummary } from "@/types/todo";
import CheckBox from "./CheckBox";

interface TodoItemProps {
  todo: TodoSummary;
  onToggle: (todo: TodoSummary) => void;
}

/** 목록의 할 일 한 줄: 왼쪽 체크 버튼으로 완료 토글, 이름을 누르면 상세 페이지로 이동 */
export default function TodoItem({ todo, onToggle }: TodoItemProps) {
  return (
    <li
      className={`flex h-[50px] items-center gap-4 rounded-[27px] border-2 border-slate-900 px-[10px] ${
        todo.isCompleted ? "bg-violet-100" : "bg-white"
      }`}
    >
      <CheckBox checked={todo.isCompleted} onToggle={() => onToggle(todo)} />
      <Link
        href={`/items/${todo.id}`}
        className={`flex-1 truncate text-base leading-[18px] text-slate-800 ${todo.isCompleted ? "line-through" : ""}`}
      >
        {todo.name}
      </Link>
    </li>
  );
}
