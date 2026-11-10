# do it; — Todo List

할 일 목록을 관리하는 To Do 서비스입니다. 코드잇 단기심화 지원자 과제로 만들었습니다.

- 배포 주소: (배포 후 기입)
- 디자인: Figma 시안 기준 모바일(375) · 태블릿(744) · 데스크탑(1200 이상) 반응형

## 기술 스택

- Next.js 16 (App Router), React 19, TypeScript
- Tailwind CSS v4 (`@theme`로 시안 컬러 시스템 정의)
- API: `https://assignment-todolist-api.vercel.app/api/{tenantId}`

## 주요 기능

### 할 일 목록 페이지 (`/`)
- 로고를 누르면 `/`로 이동하며 페이지가 새로고침됩니다.
- 진행 중(TO DO)과 완료(DONE) 할 일을 나눠서 보여줍니다. 데스크탑은 두 열, 태블릿·모바일은 위아래로 배치됩니다.
- 입력창에 할 일을 쓰고 **추가하기** 버튼을 누르거나 Enter를 치면 새 할 일이 생깁니다.
- 항목 왼쪽 체크 버튼으로 완료 ↔ 진행 중을 바꿉니다. 화면에 먼저 반영하고, 서버 요청이 실패하면 원래대로 되돌립니다.
- 할 일이 없으면 시안의 빈 상태 일러스트와 안내 문구를 보여줍니다.

### 할 일 상세 페이지 (`/items/{itemId}`)
- 이름, 완료 상태, 메모를 수정할 수 있습니다.
- 이미지를 1개 첨부할 수 있습니다. 파일 이름은 영어(영문·숫자·기본 기호)만, 크기는 5MB 이하만 허용합니다.
- **수정 완료**를 누르면 (새 이미지가 있으면 먼저 업로드한 뒤) 변경 사항을 저장하고 목록으로 돌아갑니다. 변경 사항이 있을 때 버튼이 연두색으로 바뀝니다.
- **삭제하기**를 누르면 확인 후 삭제하고 목록으로 돌아갑니다.

## 실행 방법

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start   # 프로덕션 빌드
```

API의 tenantId는 `NEXT_PUBLIC_TENANT_ID` 환경 변수로 바꿀 수 있습니다. 지정하지 않으면 `hunminryu`를 씁니다.

```bash
NEXT_PUBLIC_TENANT_ID=my-id npm run dev
```

## 폴더 구조

```
src/
├─ app/
│  ├─ layout.tsx              # 공통 레이아웃(GNB, NanumSquare 폰트)
│  ├─ globals.css             # 컬러 시스템·브레이크포인트·하드 섀도 토큰
│  ├─ page.tsx                # 할 일 목록 페이지
│  └─ items/[itemId]/page.tsx # 할 일 상세 페이지
├─ components/                # 공용 컴포넌트
│  ├─ Gnb.tsx                 # 상단 로고 바
│  ├─ Button.tsx              # 추가·수정 완료·삭제 버튼(활성 상태 포함)
│  ├─ CheckBox.tsx            # 완료 토글 체크 버튼
│  ├─ StatusLabel.tsx         # TO DO / DONE 라벨
│  ├─ TodoInput.tsx           # 할 일 입력창 + 추가 버튼
│  ├─ TodoItem.tsx            # 목록의 할 일 한 줄
│  ├─ TodoSection.tsx         # TO DO/DONE 섹션과 빈 상태
│  ├─ TodoDetail.tsx          # 상세 화면 본문
│  ├─ NameBar.tsx             # 상세 상단 이름·상태 바
│  ├─ ImageUpload.tsx         # 이미지 첨부 영역
│  └─ Memo.tsx                # 줄노트 메모 영역
├─ lib/
│  ├─ api.ts                  # API 요청 함수 모음
│  └─ validateImage.ts        # 이미지 이름·용량 검사
└─ types/todo.ts              # 할 일 데이터 타입
public/images/                # Figma에서 내보낸 로고·아이콘·일러스트 SVG
```

## 컬러 시스템

| 토큰 | 값 | 토큰 | 값 |
|---|---|---|---|
| slate-900 | #0F172A | violet-600 | #7C3AED |
| slate-800 | #1E293B | violet-100 | #EDE9FE |
| slate-500 | #64748B | rose-500 | #F43F5E |
| slate-400 | #94A3B8 | lime-300 | #BEF264 |
| slate-300 | #CBD5E1 | amber-800 | #92400E |
| slate-200 | #E2E8F0 | | |
| slate-100 | #F1F5F9 | | |
