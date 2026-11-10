interface MemoProps {
  value: string;
  onChange: (value: string) => void;
}

/** 노란 줄노트 모양의 메모 입력 영역 */
export default function Memo({ value, onChange }: MemoProps) {
  return (
    <div
      className="flex h-[311px] w-full flex-col rounded-[24px] bg-memo px-4 pt-6 pb-4"
      style={{
        // 32px 간격의 가로줄로 줄노트 배경을 만든다
        backgroundImage:
          "repeating-linear-gradient(to bottom, transparent 0, transparent 31px, var(--color-memo-line) 31px, var(--color-memo-line) 32px)",
      }}
    >
      <p className="text-center text-base font-extrabold text-amber-800">Memo</p>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label="메모"
        placeholder="메모를 입력해주세요"
        className="mt-4 flex-1 resize-none bg-transparent text-center text-base leading-8 text-slate-800 outline-none placeholder:text-slate-400"
      />
    </div>
  );
}
