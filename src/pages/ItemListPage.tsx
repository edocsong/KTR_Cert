import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { categories, certItems } from "../data/certItems";
import type { CertType } from "../types";
import { formatDuration } from "../utils/format";

const CERT_TYPE_OPTIONS: CertType[] = ["성능인증", "혁신제품", "조달우수제품"];

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

      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center">
        <select
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            setSelectedId("");
          }}
          className="rounded-lg border border-slate-300 px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-blue-500"
        >
          <option value="전체">전체 분류</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <select
          value={certType}
          onChange={(e) => {
            setCertType(e.target.value as CertType | "전체");
            setSelectedId("");
          }}
          className="rounded-lg border border-slate-300 px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-blue-500"
        >
          <option value="전체">전체 인증유형</option>
          {CERT_TYPE_OPTIONS.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      <select
        value={selectedId}
        onChange={(e) => setSelectedId(e.target.value)}
        className="input mb-6"
      >
        <option value="">품목을 선택하세요</option>
        {options.map((item) => (
          <option key={item.id} value={item.id}>
            {item.itemName}
          </option>
        ))}
      </select>

      {selectedItem ? (
        <div className="rounded-xl border border-slate-200 bg-white p-6">
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
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600" />
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
              className="rounded-lg bg-blue-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-800"
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
