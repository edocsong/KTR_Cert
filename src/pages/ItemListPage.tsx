import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { categories, certItems } from "../data/certItems";
import type { CertType } from "../types";
import { formatDuration } from "../utils/format";

const CERT_TYPE_OPTIONS: (CertType | "전체")[] = [
  "전체",
  "성능인증",
  "혁신제품",
  "조달우수제품",
];

export default function ItemListPage() {
  const [category, setCategory] = useState<string>("전체");
  const [certType, setCertType] = useState<CertType | "전체">("전체");
  const [selectedId, setSelectedId] = useState("");

  const options = useMemo(() => {
    return certItems.filter((item) => {
      const matchesCategory = category === "전체" || item.category === category;
      const matchesCertType =
        certType === "전체" || item.certTypes.includes(certType);
      return matchesCategory && matchesCertType;
    });
  }, [category, certType]);

  const selectedItem = certItems.find((item) => item.id === selectedId);

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <div className="mb-8">
        <h1 className="text-xl font-bold whitespace-nowrap text-slate-900 sm:text-3xl">
          시험항목·비용·기간 조회
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          성능인증(EPC)·혁신제품·조달우수제품 인증을 준비 중인 품목을
          선택하면 시험항목과 예상 소요기간을 확인할 수 있습니다.
        </p>
      </div>

      <div className="mb-3">
        <p className="mb-2 text-xs font-semibold text-slate-400">인증유형</p>
        <div className="flex flex-wrap gap-1.5">
          {CERT_TYPE_OPTIONS.map((t) => {
            const active = certType === t;
            return (
              <button
                key={t}
                type="button"
                onClick={() => {
                  setCertType(t);
                  setSelectedId("");
                }}
                className={
                  "rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors " +
                  (active
                    ? "bg-brand-500 text-white"
                    : "bg-white text-slate-600 ring-1 ring-inset ring-slate-200 hover:bg-slate-50")
                }
              >
                {t}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mb-6 -mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
        <p className="mb-2 text-xs font-semibold text-slate-400">분류</p>
        <div className="flex gap-1.5">
          {["전체", ...categories].map((c) => {
            const active = category === c;
            return (
              <button
                key={c}
                type="button"
                onClick={() => {
                  setCategory(c);
                  setSelectedId("");
                }}
                className={
                  "shrink-0 rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors " +
                  (active
                    ? "bg-accent-500 text-brand-700"
                    : "bg-white text-slate-600 ring-1 ring-inset ring-slate-200 hover:bg-slate-50")
                }
              >
                {c}
              </button>
            );
          })}
        </div>
      </div>

      <select
        value={selectedId}
        onChange={(e) => setSelectedId(e.target.value)}
        className="input mb-6"
      >
        <option value="">품목을 선택하세요 ({options.length}개)</option>
        {options.map((item) => (
          <option key={item.id} value={item.id}>
            {item.itemName}
          </option>
        ))}
      </select>

      {selectedItem ? (
        <div
          key={selectedItem.id}
          className="animate-fade-up rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
        >
          <h2 className="truncate text-lg font-semibold text-slate-900">
            {selectedItem.itemName}
          </h2>

          <h3 className="mt-4 mb-2 text-xs font-semibold text-slate-500">
            필수 시험항목
          </h3>
          <ul className="space-y-1.5">
            {selectedItem.testItems.map((t) => (
              <li
                key={t}
                className="flex items-start gap-2 text-sm text-slate-700"
              >
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-500" />
                {t}
              </li>
            ))}
          </ul>

          <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4">
            <div>
              <p className="text-xs text-slate-400">예상기간</p>
              <p className="text-sm font-semibold text-slate-900">
                {formatDuration(
                  selectedItem.duration.minDays,
                  selectedItem.duration.maxDays,
                )}
              </p>
            </div>
            <Link
              to={`/items/${selectedItem.id}`}
              className="rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-600 active:scale-[0.98]"
            >
              예상견적 보기
            </Link>
          </div>
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-slate-300 py-16 text-center text-sm text-slate-500">
          위에서 품목을 선택하면 시험항목과 예상기간이 표시됩니다.
        </div>
      )}
    </div>
  );
}
