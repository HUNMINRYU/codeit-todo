/** 목록 조회 API가 돌려주는 요약 항목 */
export interface TodoSummary {
  id: number;
  name: string;
  isCompleted: boolean;
}

/** 상세 조회·생성·수정 API가 돌려주는 전체 항목 */
export interface TodoDetail extends TodoSummary {
  tenantId: string;
  memo: string | null;
  imageUrl: string | null;
}

/** PATCH /items/{itemId} 요청 본문 (모든 필드 선택) */
export interface TodoUpdate {
  name?: string;
  memo?: string;
  imageUrl?: string;
  isCompleted?: boolean;
}
