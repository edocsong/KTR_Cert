import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { certItems } from "../data/certItems";
import { formatDuration, formatWon, totalFee } from "../utils/format";
import CaseStudyModal from "../components/CaseStudyModal";

export default function ItemDetailPage() {
  const { id } = useParams<{ id: string }>();
  const item = certItems.find((i) => i.id === id);
  const [showCaseStudy, setShowCaseStudy] = useState(false);

  if (!item) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6">
        <p className="text-lg font-semibold text-slate-900">
          품목을 찾을 수 없습니다.
        </p>
        <Link
          to="/"
          className="mt-4 inline-block text-sm font-medium text-blue-700 hover:underline"
        >
          ← 품목 목록으로 돌아가기
        </Link>
      </div>
    );
  }

  const feeRows: { label: string; value: number; hint?: string }[] = [
    { label: "기초 시험비", value: item.fee.basicTestFee },
    { label: "구조해석비", value: item.fee.structuralAnalysisFee, hint: "인증 유형 1건당" },
    { label: "컨설팅 비용", value: item.fee.consultingFee, hint: "인증 유형 1건당" },
  ];

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <Link
        to="/"
        className="mb-6 inline-block text-sm font-medium text-slate-500 hover:text-blue-700"
      >
        ← 품목 목록으로 돌아가기
      </Link>

      <div className="mb-2 flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600">
          {item.category}
        </span>
        {item.certTypes.map((type) => (
          <span
            key={type}
            className="rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700"
          >
            {type}
          </span>
        ))}
      </div>
      <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
        {item.itemName}
      </h1>
      {item.notes && (
        <p className="mt-2 text-sm text-slate-500">{item.notes}</p>
      )}

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-5">
        <div className="rounded-xl border border-slate-200 bg-white p-6 lg:col-span-3">
          <h2 className="mb-4 text-sm font-semibold text-slate-900">
            필수 시험항목
          </h2>
          <ul className="space-y-2">
            {item.testItems.map((t) => (
              <li
                key={t}
                className="flex items-start gap-2 text-sm text-slate-700"
              >
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600" />
                <span>
                  {t}
                  {t.includes("구조 안전성 해석") && (
                    <button
                      type="button"
                      onClick={() => setShowCaseStudy(true)}
                      className="ml-2 text-xs font-medium text-blue-700 hover:underline"
                    >
                      ▶ 사례보기
                    </button>
                  )}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-6 lg:col-span-2">
          <div className="rounded-xl border border-slate-200 bg-white p-6">
            <h2 className="mb-4 text-sm font-semibold text-slate-900">
              예상 비용
            </h2>
            <dl className="space-y-3">
              {feeRows.map((row) => (
                <div
                  key={row.label}
                  className="flex items-baseline justify-between"
                >
                  <dt className="text-sm text-slate-500">
                    {row.label}
                    {row.hint && (
                      <span className="ml-1 text-xs text-slate-400">
                        ({row.hint})
                      </span>
                    )}
                  </dt>
                  <dd className="text-sm font-medium text-slate-900">
                    {formatWon(row.value)}
                  </dd>
                </div>
              ))}
            </dl>
            <div className="mt-4 flex items-baseline justify-between border-t border-slate-100 pt-4">
              <dt className="text-sm font-semibold text-slate-900">
                예상 총 비용
              </dt>
              <dd className="text-lg font-bold text-blue-700">
                {formatWon(totalFee(item.fee))}
              </dd>
            </div>
            <p className="mt-3 text-xs leading-relaxed text-slate-400">
              ※ 컨설팅 비용·구조해석비는 인증 유형(성능인증·혁신제품·조달우수제품)별로
              각각 청구됩니다. 위 금액은 인증 유형 1건 신청 기준이며, 복수
              유형을 동시에 신청하는 경우 유형 수만큼 추가됩니다.
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-6">
            <h2 className="mb-2 text-sm font-semibold text-slate-900">
              예상 소요기간
            </h2>
            <p className="text-lg font-bold text-slate-900">
              {formatDuration(item.duration.minDays, item.duration.maxDays)}
            </p>
            <p className="mt-1 text-xs text-slate-400">
              접수 완료 후 시험·심사 절차 기준 (영업일)
            </p>
          </div>

          <Link
            to="/inquiry"
            state={{ itemName: item.itemName }}
            className="rounded-lg bg-blue-700 px-4 py-3 text-center text-sm font-semibold text-white hover:bg-blue-800"
          >
            이 품목으로 상담 문의하기
          </Link>
        </div>
      </div>

      {showCaseStudy && (
        <CaseStudyModal onClose={() => setShowCaseStudy(false)} />
      )}
    </div>
  );
}
