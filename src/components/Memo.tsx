"use client";

import { useLayoutEffect, useRef } from "react";

interface MemoProps {
  value: string;
  onChange: (value: string) => void;
}

/** 시안 메모 영역 수치 */
const BOX_HEIGHT = 311;
const TEXT_TOP = 58; // 글이 시작할 수 있는 가장 위 (제목 아래)
const TEXT_MAX_HEIGHT = 222; // 위 58px ~ 아래 31px 사이

/**
 * 노란 줄노트 모양의 메모 입력 영역.
 * 짧은 글은 메모 영역 전체의 세로 가운데에, 긴 글은 제목 아래 영역을 채우고 안쪽에서 스크롤한다(시안 그대로).
 */
export default function Memo({ value, onChange }: MemoProps) {
  const ref = useRef<HTMLTextAreaElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.height = "auto";
    const height = Math.min(el.scrollHeight, TEXT_MAX_HEIGHT);
    el.style.height = `${height}px`;
    el.style.top = `${Math.max(TEXT_TOP, (BOX_HEIGHT - height) / 2)}px`;
  }, [value]);

  return (
    <div
      className="relative h-[311px] w-full rounded-[24px] bg-memo"
      style={{
        // 시안: 위에서 26px 지점부터 32px 간격, 2px 두께의 가로줄
        backgroundImage:
          "repeating-linear-gradient(to bottom, var(--color-memo-line) 0, var(--color-memo-line) 2px, transparent 2px, transparent 32px)",
        backgroundPosition: "0 26px",
      }}
    >
      <p className="absolute inset-x-0 top-[21px] text-center text-base font-extrabold text-amber-800">Memo</p>
      <textarea
        ref={ref}
        rows={1}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label="메모"
        placeholder="메모를 입력해주세요"
        className="memo-scroll absolute inset-x-4 resize-none overflow-y-auto bg-transparent text-center text-base leading-[18px] text-slate-800 outline-none placeholder:text-slate-400"
      />
    </div>
  );
}
