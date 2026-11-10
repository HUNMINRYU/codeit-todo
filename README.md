# do it; — Todo List

할 일을 추가하고, 완료로 체크하고, 메모와 사진을 붙여 관리하는 To Do 서비스입니다.

**배포 주소:** https://codeit-todo-nine.vercel.app

아래 이미지는 기능별 화면 예시입니다. 최신 색상과 간격은 배포 사이트에서 확인할 수 있습니다.

| 목록 (데스크탑) | 상세 (데스크탑) |
|---|---|
| ![목록 데스크탑](docs/screenshots/home-desktop.png) | ![상세 데스크탑](docs/screenshots/detail-desktop.png) |

| 목록 (모바일) | 상세 (모바일) |
|---|---|
| <img src="docs/screenshots/home-mobile.png" width="260" alt="목록 모바일" /> | <img src="docs/screenshots/detail-mobile.png" width="260" alt="상세 모바일" /> |

## 무엇을 하나요

코드잇 단기심화 지원자 과제로, 주어진 Figma 시안과 API 명세로 만든 Next.js 앱입니다. 모바일·태블릿·데스크톱 레이아웃을 지원하며, 시안의 375px·744px·1920px 화면에서 검증했습니다. 레이아웃 전환 기준은 744px와 1200px입니다.

**할 일 목록 (`/`)**
- 입력창에 할 일을 쓰고 **추가하기** 버튼을 누르거나 Enter를 치면 새 할 일이 생깁니다.
- 진행 중인 일(TO DO)과 완료한 일(DONE)을 나눠 보여 줍니다.
- 항목 왼쪽의 동그라미를 누르면 완료와 진행 중이 바뀝니다.
- 로고를 누르면 `/`로 이동하며 새로고침됩니다.
- 할 일이 없으면 빈 상태 일러스트와 안내 문구를 보여 줍니다.

**할 일 상세 (`/items/{itemId}`)**
- 이름, 완료 상태, 메모를 고칠 수 있습니다.
- 사진을 1장 붙일 수 있습니다. 파일 이름은 영문·숫자·공백과 기본 기호(`._-()`)를 허용하며, 크기는 5MB(5,242,880바이트) 이하여야 합니다.
- **수정 완료**를 누르면 저장하고 목록으로 돌아갑니다. 바뀐 내용이 있을 때 버튼이 연두색으로 바뀝니다.
- **삭제하기**를 누르면 확인 후 삭제하고 목록으로 돌아갑니다.

## 기술 스택

- **프레임워크**: Next.js 16 (App Router) + React 19 — 과제 필수 스택
- **언어**: TypeScript — API 응답 구조를 `TodoSummary`, `TodoDetail` 등의 타입으로 표현
- **스타일**: Tailwind CSS v4 — 시안의 컬러, 브레이크포인트, 그림자를 `@theme` 토큰 한곳에 모으기 위해
- **폰트**: NanumSquare (시안 지정 폰트)
- **배포**: Vercel

## 시작하기

Node.js **20.9.0 이상**과 npm이 필요합니다.

```bash
git clone https://github.com/HUNMINRYU/codeit-todo.git
cd codeit-todo
npm ci
```

프로젝트 루트에 `.env.local`을 만들고 테스트용 데이터 공간을 지정합니다.

```dotenv
NEXT_PUBLIC_TENANT_ID=my-codeit-todo
```

같은 tenantId는 같은 목록을 사용합니다. 값을 생략하면 배포 앱과 같은 `hunminryu`가 사용되므로, 로컬 테스트에는 별도 값을 사용하세요.

```bash
npm run dev
```

브라우저에서 http://localhost:3000 을 엽니다.

프로덕션 빌드로 확인하려면:

```bash
npm run build
npm start
```

`NEXT_PUBLIC_TENANT_ID`는 빌드 시 브라우저 코드에 포함됩니다. 값을 바꾼 뒤에는 개발 서버를 재시작하고, 배포 환경에서는 다시 빌드해야 합니다.

## 어떻게 동작하나요

**API 연결** — 목록·상세 조회, 생성·수정·삭제, 이미지 업로드 요청은 `src/lib/api.ts`에 모았습니다. 실패 응답이면 서버 메시지를 담은 에러를 던지고, 화면에서 알림으로 보여 줍니다.

**사진 첨부** — 사진을 고르면 먼저 브라우저에서 이름과 크기를 검사합니다(`src/lib/validateImage.ts`). 통과하면 미리보기만 바꾸고, 실제 업로드는 **수정 완료**를 누를 때 합니다. 업로드로 받은 주소를 할 일의 `imageUrl`에 저장합니다. 저장 버튼을 누르기 전에는 사진을 서버에 올리지 않습니다.

**완료 토글** — 체크하면 화면부터 바로 바꾸고 서버에 저장합니다. 저장이 실패하면 원래 상태로 되돌립니다.

**시안 맞춤** — 로고, 라벨, 일러스트와 기본 아이콘은 Figma에서 내보낸 SVG를 사용합니다. 추가 버튼의 + 아이콘은 상태별 색상을 적용할 수 있도록 같은 선 형태의 인라인 SVG로 표시합니다. 크기와 간격은 원본 프레임과 실제 화면을 비교해 보정했습니다.

**메모** — 짧은 글은 가운데에, 긴 글은 제목 아래에 배치하고 본문 안에서 스크롤합니다. 창 너비가 바뀌면 `ResizeObserver`로 높이를 다시 계산합니다.

## 폴더 구조

```
src/
├─ app/
│  ├─ layout.tsx              # 공통 레이아웃 (상단 로고 바, 폰트)
│  ├─ globals.css             # 컬러·브레이크포인트·그림자 토큰
│  ├─ page.tsx                # 할 일 목록 페이지
│  └─ items/[itemId]/page.tsx  # 할 일 상세 페이지
├─ components/                # 공용 컴포넌트
│  ├─ Gnb.tsx                 # 상단 로고 바
│  ├─ Button.tsx              # 추가·수정 완료·삭제 버튼
│  ├─ CheckBox.tsx            # 완료 토글 버튼
│  ├─ StatusLabel.tsx         # TO DO / DONE 라벨
│  ├─ TodoInput.tsx           # 입력창 + 추가 버튼
│  ├─ TodoItem.tsx            # 목록의 할 일 한 줄
│  ├─ TodoSection.tsx         # TO DO / DONE 묶음과 빈 상태
│  ├─ TodoDetail.tsx          # 상세 화면 본문
│  ├─ NameBar.tsx             # 상세 상단 이름·상태 바
│  ├─ ImageUpload.tsx         # 사진 첨부 영역
│  └─ Memo.tsx                # 줄노트 메모
├─ lib/
│  ├─ api.ts                  # API 요청 함수
│  └─ validateImage.ts        # 사진 이름·크기 검사
└─ types/todo.ts              # 할 일 데이터 타입
public/images/                # Figma에서 내보낸 SVG 에셋
```

## 컬러 시스템

| 토큰 | 값 | 쓰이는 곳 |
|---|---|---|
| page | `#F9FAFB` | 페이지 배경 |
| slate-900 | `#0F172A` | 테두리, 그림자, 본문 강조 |
| slate-800 | `#1E293B` | 본문 글자 |
| slate-500 | `#64748B` | 입력창 안내 문구 |
| slate-400 | `#94A3B8` | 빈 상태 문구 |
| slate-300 | `#CBD5E1` | 사진 영역 점선 |
| slate-200 | `#E2E8F0` | 기본 버튼 배경, 구분선 |
| slate-100 | `#F1F5F9` | 입력창 배경 |
| slate-50 | `#F8FAFC` | 빈 사진 영역 배경 |
| violet-600 | `#7C3AED` | 추가 버튼(입력 중) |
| violet-200 | `#DDD6FE` | 완료 상태인 상세 이름 바 |
| violet-100 | `#EDE9FE` | 완료한 항목 배경 |
| rose-500 | `#F43F5E` | 삭제하기 버튼 |
| lime-300 | `#BEF264` | 수정 완료 버튼(변경 있음) |
| amber-800 | `#92400E` | 메모 제목 |
| memo | `#FEFCE8` | 메모 배경 |
| memo-line | `#FEF3C7` | 메모 가로줄 |
| memo-scroll | `#FDE68A` | 메모 스크롤바 |

## 검증

```bash
npm run lint
npx tsc --noEmit
npm run build
```

2026-11-10 기준 위 검사를 통과했습니다. 별도 테스트 tenant에서 버튼·Enter 추가, 완료 상태 전환, 이름·메모·이미지 저장 및 재진입, 삭제를 실제 API와 연결해 확인했습니다. 자동화된 E2E 테스트 스크립트는 저장소에 포함하지 않았습니다.

- [제출 체크리스트](docs/submission-checklist.md): 요구 기능별 검사와 배포 확인 결과
- [시안 검증 결과](docs/figma-fix-results.md): 12개 화면 비교, 수정 사항과 비교 한계
- [최초 시안 차이 목록](docs/figma-diff.md): 수정 전 대조 기록
- [API 명세](https://assignment-todolist-api.vercel.app/docs/): 과제 제공 Swagger UI

## 개선하고 싶은 점

- [ ] 목록이 100개를 넘으면 다음 페이지를 이어 불러오기 (지금은 첫 100개만 조회)
- [ ] 알림 창(`alert`) 대신 화면 안에서 보이는 토스트 메시지
- [ ] 저장 중·불러오는 중 상태를 스켈레톤 화면으로 표시
