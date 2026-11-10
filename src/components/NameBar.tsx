import CheckBox from "./CheckBox";

interface NameBarProps {
  name: string;
  isCompleted: boolean;
  onNameChange: (name: string) => void;
  onToggle: () => void;
}

/** 상세 페이지 상단: 완료 체크 + 밑줄 친 이름 입력란. 완료 상태면 보라색 배경 */
export default function NameBar({ name, isCompleted, onNameChange, onToggle }: NameBarProps) {
  return (
    <div
      className={`flex h-16 items-center justify-center gap-4 rounded-[24px] border-2 border-slate-900 px-4 ${
        isCompleted ? "bg-violet-200" : "bg-white"
      }`}
    >
      <CheckBox checked={isCompleted} onToggle={onToggle} />
      {/* 입력란 폭을 글자 길이에 맞추기 위해, 같은 글자를 숨긴 span과 같은 칸에 겹쳐 둔다 */}
      <span className="inline-grid max-w-[80%] text-xl font-bold text-slate-900 underline">
        <span className="invisible col-start-1 row-start-1 overflow-hidden whitespace-pre">{name || " "}</span>
        <input
          value={name}
          onChange={(e) => onNameChange(e.target.value)}
          aria-label="할 일 이름"
          size={1}
          className="col-start-1 row-start-1 w-full min-w-0 bg-transparent underline outline-none"
        />
      </span>
    </div>
  );
}
