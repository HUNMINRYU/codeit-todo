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
      <input
        value={name}
        onChange={(e) => onNameChange(e.target.value)}
        aria-label="할 일 이름"
        size={Math.max(name.length, 1) + 2}
        className="max-w-[80%] bg-transparent text-xl font-bold text-slate-900 underline outline-none"
      />
    </div>
  );
}
