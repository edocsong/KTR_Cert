export default function SampleDataBanner() {
  return (
    <div className="flex items-center justify-center gap-1.5 border-b border-amber-200 bg-amber-50 px-4 py-1.5 text-center text-[11px] font-medium text-amber-800 sm:px-6 sm:text-xs">
      <svg
        viewBox="0 0 20 20"
        fill="currentColor"
        className="h-3.5 w-3.5 shrink-0"
        aria-hidden="true"
      >
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-11.25a.75.75 0 00-1.5 0v4.5a.75.75 0 001.5 0v-4.5zM10 13a1 1 0 100 2 1 1 0 000-2z"
          clipRule="evenodd"
        />
      </svg>
      시험항목·비용·기간은 프로토타입 시연용 예시 데이터입니다. 실제 비용은 상담을
      통해 확인해 주세요.
    </div>
  );
}
