import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { certItems } from "../data/certItems";

interface LocationState {
  itemName?: string;
}

export default function InquiryPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const prefillItem = (location.state as LocationState | null)?.itemName ?? "";

  const [form, setForm] = useState({
    itemName: prefillItem,
    company: "",
    contactName: "",
    phone: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  function update<K extends keyof typeof form>(key: K, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="animate-fade-up mx-auto max-w-xl px-4 py-20 text-center sm:px-6">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-accent-50 text-2xl text-accent-600">
          ✓
        </div>
        <h1 className="text-xl font-bold text-slate-900">
          문의가 접수되었습니다
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          담당자가 확인 후 입력하신 연락처로 안내드리겠습니다.
        </p>
        <p className="mt-6 rounded-lg bg-amber-50 px-4 py-3 text-xs text-amber-800">
          ⚠ 프로토타입 데모 화면입니다. 실제 서비스에서는 이 문의가 담당
          부서로 전달되도록 백엔드 연동이 필요합니다.
        </p>
        <Link
          to="/"
          className="mt-6 inline-block text-sm font-medium text-brand-500 hover:underline"
        >
          ← 품목 목록으로 돌아가기
        </Link>
      </div>
    );
  }

  return (
    <div className="animate-fade-up mx-auto max-w-xl px-4 py-10 sm:px-6">
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="mb-6 inline-block text-sm font-medium text-slate-500 hover:text-brand-500"
      >
        ← 뒤로가기
      </button>
      <h1 className="text-2xl font-bold text-slate-900">상담 문의</h1>
      <p className="mt-2 text-sm text-slate-500">
        품목과 연락처를 남겨주시면 담당자가 정확한 견적과 절차를 안내해
        드립니다.
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-8 space-y-5 rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
      >
        <Field label="문의 품목" required>
          <select
            required
            value={form.itemName}
            onChange={(e) => update("itemName", e.target.value)}
            className="input"
          >
            <option value="" disabled>
              품목을 선택해주세요
            </option>
            {certItems.map((item) => (
              <option key={item.id} value={item.itemName}>
                {item.itemName}
              </option>
            ))}
            <option value="기타(목록에 없는 품목)">기타(목록에 없는 품목)</option>
          </select>
        </Field>
        <Field label="회사명" required>
          <input
            required
            value={form.company}
            onChange={(e) => update("company", e.target.value)}
            className="input"
          />
        </Field>
        <div className="grid grid-cols-2 gap-4">
          <Field label="담당자명" required>
            <input
              required
              value={form.contactName}
              onChange={(e) => update("contactName", e.target.value)}
              className="input"
            />
          </Field>
          <Field label="연락처" required>
            <input
              required
              value={form.phone}
              onChange={(e) => update("phone", e.target.value)}
              placeholder="010-0000-0000"
              className="input"
            />
          </Field>
        </div>
        <Field label="이메일">
          <input
            type="email"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            className="input"
          />
        </Field>
        <Field label="문의 내용">
          <textarea
            rows={4}
            value={form.message}
            onChange={(e) => update("message", e.target.value)}
            className="input resize-none"
          />
        </Field>

        <button
          type="submit"
          className="w-full rounded-lg bg-brand-500 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-600 active:scale-[0.98]"
        >
          문의 보내기
        </button>
      </form>
    </div>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-slate-700">
        {label}
        {required && <span className="ml-0.5 text-red-500">*</span>}
      </span>
      {children}
    </label>
  );
}
