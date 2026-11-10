/**
 * 상단 내비게이션 바.
 * 로고는 Link가 아닌 <a>로 감싸 클릭 시 "/"로 이동하면서 페이지를 새로고침한다(과제 요구사항).
 */
export default function Gnb() {
  return (
    <header className="h-15 border-b border-slate-200 bg-white">
      <div className="mx-auto flex h-full max-w-[1200px] items-center px-4 tablet:px-6 desktop:px-0">
        {/* 새로고침 이동이 요구사항이므로 Link 대신 <a>를 의도적으로 사용 */}
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
        <a href="/" aria-label="홈으로 이동">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/logo-small.svg" alt="do it;" width={59} height={34} className="ml-1.5 tablet:hidden" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/logo-large.svg" alt="do it;" width={141} height={34} className="ml-[3px] hidden tablet:block" />
        </a>
      </div>
    </header>
  );
}
