import { Suspense } from "react";
import TodoDetail from "@/components/TodoDetail";

/** 할 일 상세 페이지(/items/{itemId}). URL 파라미터는 런타임 값이라 Suspense로 감싼다. */
export default function TodoDetailPage() {
  return (
    <Suspense fallback={<p className="mt-10 text-center text-slate-400">불러오는 중...</p>}>
      <TodoDetail />
    </Suspense>
  );
}
