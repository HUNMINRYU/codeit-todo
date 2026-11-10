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
    <form onSubmit={handleSubmit} className="flex gap-2 tablet:gap-4">
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="할 일을 입력해주세요"
        aria-label="할 일 입력"
        className="h-14 min-w-0 flex-1 rounded-[24px] border-2 border-slate-900 bg-slate-100 px-6 text-base text-slate-900 shadow-hard outline-none placeholder:text-slate-500"
      />
      <Button
        type="submit"
        variant="add"
        active={hasText}
        disabled={submitting}
        compactOnMobile
        aria-label="추가하기"
        icon={
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src="/images/ic-plus-white.svg"
            alt=""
            className={`h-4 w-4 ${hasText ? "" : "invert"}`}
          />
        }
      >
        추가하기
      </Button>
    </form>
  );
}
