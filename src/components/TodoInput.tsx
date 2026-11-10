"use client";

import { useState, type FormEvent } from "react";
import Button from "./Button";

interface TodoInputProps {
  onAdd: (name: string) => Promise<void>;
}

/**
 * 할 일 입력창 + 추가하기 버튼.
 * form submit으로 처리하므로 버튼 클릭과 Enter 입력이 같은 경로로 동작한다.
 */
export default function TodoInput({ onAdd }: TodoInputProps) {
  const [value, setValue] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const hasText = value.trim().length > 0;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!hasText || submitting) return;
    setSubmitting(true);
    try {
      await onAdd(value.trim());
      setValue("");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-[9.1px] tablet:gap-[18.1px] tablet:pr-[3.5px] desktop:gap-5 desktop:pr-1">
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="할 일을 입력해주세요"
        aria-label="할 일 입력"
        className="h-[52px] min-w-0 flex-1 rounded-[24px] border-2 border-slate-900 bg-slate-100 px-6 text-base leading-[18px] text-slate-900 shadow-[1.12px_3.5px_0_0_var(--color-slate-900)] outline-none placeholder:text-slate-500 tablet:shadow-[2.07px_3.5px_0_0_var(--color-slate-900)] desktop:shadow-hard"
      />
      <Button
        type="submit"
        variant="add"
        active={hasText}
        disabled={submitting}
        compactOnMobile
        aria-label="추가하기"
        icon={
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M1 7H13M7 13V1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        }
      >
        추가하기
      </Button>
    </form>
  );
}
