import type { TodoDetail, TodoSummary, TodoUpdate } from "@/types/todo";

/** 과제용 API 서버. tenantId로 데이터 공간이 나뉜다. */
const TENANT_ID = process.env.NEXT_PUBLIC_TENANT_ID ?? "hunminryu";
const BASE_URL = `https://assignment-todolist-api.vercel.app/api/${TENANT_ID}`;

/** 공통 요청 함수: 실패 응답이면 서버 메시지를 담아 에러를 던진다. */
async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, init);
  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new Error(body?.message ?? `요청 실패 (${res.status})`);
  }
  return res.json() as Promise<T>;
}

const json = (body: unknown): RequestInit => ({
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
});

/** 할 일 목록 조회 */
export const getTodos = () => request<TodoSummary[]>("/items?page=1&pageSize=100");

/** 할 일 상세 조회 */
export const getTodo = (id: number) => request<TodoDetail>(`/items/${id}`);

/** 할 일 생성 */
export const createTodo = (name: string) =>
  request<TodoDetail>("/items", { method: "POST", ...json({ name }) });

/** 할 일 수정 (이름·메모·이미지·완료 여부) */
export const updateTodo = (id: number, data: TodoUpdate) =>
  request<TodoDetail>(`/items/${id}`, { method: "PATCH", ...json(data) });

/** 할 일 삭제 */
export const deleteTodo = (id: number) =>
  request<{ message: string }>(`/items/${id}`, { method: "DELETE" });

/** 이미지 업로드 → 저장된 이미지 URL 반환 */
export const uploadImage = (file: File) => {
  const form = new FormData();
  form.append("image", file);
  return request<{ url: string }>("/images/upload", { method: "POST", body: form });
};
