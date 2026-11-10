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
        <ul className={`mt-4 flex flex-col ${done ? "gap-3.5 desktop:mt-3.5" : "gap-4"}`}>
          {todos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} onToggle={onToggle} />
          ))}
        </ul>
      ) : (
        <div className="flex flex-col items-center">
          {/* 일러스트 위치·크기와 문구 간격은 시안 측정값(모바일/태블릿/데스크탑)을 그대로 따른다 */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`/images/empty-${key}-small.svg`}
            alt=""
            width={done ? 99 : 109}
            height={done ? 83 : 82}
            className={done ? "mt-4 tablet:hidden" : "mt-[18px] tablet:hidden"}
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`/images/empty-${key}-large.svg`}
            alt=""
            width={done ? 198 : 219}
            height={done ? 166 : 164}
            className={
              done
                ? "hidden tablet:mt-[56px] tablet:block desktop:mt-[95px]"
                : "hidden tablet:mt-[35px] tablet:block desktop:mt-[99px]"
            }
          />
          <p
            className={`text-center text-base leading-[18px] font-bold text-slate-400 ${
              done ? "mt-[35px] tablet:mt-16 desktop:mt-[65px]" : "mt-[35px] tablet:mt-[63px]"
            }`}
          >
            {EMPTY_TEXT[key][0]}
            <br />
            {EMPTY_TEXT[key][1]}
          </p>
        </div>
      )}
    </section>
  );
}
