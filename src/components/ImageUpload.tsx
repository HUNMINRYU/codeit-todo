"use client";

import { useRef, type ChangeEvent } from "react";
import { validateImage } from "@/lib/validateImage";

interface ImageUploadProps {
  /** 미리보기에 쓸 이미지 주소(업로드된 URL 또는 로컬 미리보기 URL) */
  src: string | null;
  onSelect: (file: File) => void;
}

/**
 * 이미지 첨부 영역(최대 1개).
 * 이미지가 없으면 점선 박스 + 추가 버튼, 있으면 이미지 위에 수정 버튼을 보여준다.
 * 파일 선택 시 이름(영어)·용량(5MB) 검사를 통과해야 부모에 전달된다.
 */
export default function ImageUpload({ src, onSelect }: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = ""; // 같은 파일을 다시 골라도 change 이벤트가 나도록 초기화
    if (!file) return;
    const error = validateImage(file);
    if (error) {
      alert(error);
      return;
    }
    onSelect(file);
  };

  return (
    <div
      className={`relative h-[311px] w-full overflow-hidden rounded-[24px] desktop:w-[384px] desktop:shrink-0 ${
        src ? "" : "border-2 border-dashed border-slate-300 bg-slate-50"
      }`}
    >
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt="첨부 이미지" className="h-full w-full object-cover" />
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src="/images/ic-img.svg"
          alt=""
          width={54}
          height={54}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        />
      )}
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        aria-label={src ? "이미지 변경" : "이미지 추가"}
        className={`absolute flex h-16 w-16 items-center justify-center rounded-full ${
          src ? "right-4 bottom-4 border-2 border-slate-900 bg-[rgba(15,23,42,0.5)]" : "right-[14px] bottom-[14px] bg-slate-200"
        }`}
      >
        {src ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src="/images/ic-edit.svg" alt="" width={13} height={18} />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img src="/images/ic-plus-gray.svg" alt="" width={21} height={21} />
        )}
      </button>
      <input ref={inputRef} type="file" accept="image/*" hidden onChange={handleChange} />
    </div>
  );
}
