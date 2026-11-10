import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "default" | "add" | "edit" | "delete";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** 시안의 버튼 종류: add(추가), edit(수정 완료), delete(삭제) */
  variant?: Variant;
  /** 활성 상태(입력값이 있거나 변경 사항이 있을 때) 강조색으로 바뀐다 */
  active?: boolean;
  icon?: ReactNode;
  /** 모바일에서 아이콘만 보이는 작은 정사각형 버튼으로 줄일지 여부 */
  compactOnMobile?: boolean;
}

/** 시안의 공용 버튼: 2px 테두리 + 하드 섀도를 가진 알약 모양 */
export default function Button({
  variant = "default",
  active = false,
  icon,
  compactOnMobile = false,
  className = "",
  children,
  ...rest
}: ButtonProps) {
  const color = {
    default: "bg-slate-200 text-slate-900",
    add: active ? "bg-violet-600 text-white" : "bg-slate-200 text-slate-900",
    edit: active ? "bg-lime-300 text-slate-900" : "bg-slate-200 text-slate-900",
    delete: "bg-rose-500 text-white",
  }[variant];

  // 시안 추가 버튼 본체: 모바일 54.78px, 태블릿 158.5px, 데스크톱 164px.
  // 일반 버튼은 좁은 화면에서 줄어들 수 있게 한다.
  const size = compactOnMobile
    ? "h-[52px] w-[54.78px] shrink-0 shadow-[1.22px_4px_0_0_var(--color-slate-900)] tablet:w-[158.5px] tablet:gap-1.5 tablet:shadow-hard desktop:w-[164px]"
    : "h-[52px] w-[164px] min-w-0 shrink";

  const isDetailAction = variant === "edit" || variant === "delete";

  return (
    <button
      className={`flex items-center justify-center rounded-[24px] border-2 border-slate-900 text-base leading-[18px] font-bold ${compactOnMobile ? "" : "shadow-hard"} transition-colors disabled:cursor-not-allowed ${color} ${size} ${className}`}
      {...rest}
    >
      <span className={`flex items-center ${isDetailAction ? "translate-x-[2.5px] gap-1" : compactOnMobile ? "-translate-x-[2.5px] gap-1.5 tablet:translate-x-0" : "gap-1.5"}`}>
        {isDetailAction ? <span className="flex size-4 items-center justify-center">{icon}</span> : icon}
        <span className={compactOnMobile ? "hidden tablet:inline" : ""}>{children}</span>
      </span>
    </button>
  );
}
