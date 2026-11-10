interface CheckBoxProps {
  checked: boolean;
  onToggle: () => void;
}

/** 완료 여부를 토글하는 원형 체크 버튼 (시안의 checkbox off/on 아이콘) */
export default function CheckBox({ checked, onToggle }: CheckBoxProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={checked ? "진행 중으로 변경" : "완료로 변경"}
      aria-pressed={checked}
      className="shrink-0"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={checked ? "/images/checkbox-on.svg" : "/images/checkbox-off.svg"}
        alt=""
        className="h-8 w-8"
      />
    </button>
  );
}
