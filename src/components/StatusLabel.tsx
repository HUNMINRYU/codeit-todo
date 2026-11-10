/** 목록 섹션 제목으로 쓰는 TO DO / DONE 라벨 이미지 */
export default function StatusLabel({ done }: { done: boolean }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={done ? "/images/label-done.svg" : "/images/label-todo.svg"}
      alt={done ? "DONE" : "TO DO"}
      className="h-9"
    />
  );
}
