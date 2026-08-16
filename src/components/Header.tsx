import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-2 px-4 py-3 sm:px-6 sm:py-4">
        <Link to="/" className="flex min-w-0 items-center gap-2 sm:gap-2.5">
          <img
            src="/icon.png"
            alt="KTR Cert"
            className="h-8 w-8 shrink-0 rounded-lg sm:h-9 sm:w-9"
          />
          <span className="flex min-w-0 flex-col leading-tight">
            <span className="truncate text-sm font-semibold text-slate-900">
              KTR Cert
            </span>
            <span className="block truncate text-xs text-slate-500">
              한국화학융합시험연구원 경북구미센터
            </span>
          </span>
        </Link>
        <nav className="flex shrink-0 items-center gap-3 text-sm font-medium text-slate-600 sm:gap-4">
          <Link to="/" className="hidden whitespace-nowrap hover:text-blue-700 sm:inline">
            품목 조회
          </Link>
          <Link
            to="/inquiry"
            className="whitespace-nowrap rounded-md bg-blue-700 px-3 py-2 text-white hover:bg-blue-800 sm:px-3.5"
          >
            상담 문의
          </Link>
        </nav>
      </div>
    </header>
  );
}
