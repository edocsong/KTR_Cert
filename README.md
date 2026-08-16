# KTR Cert — 성능인증·조달우수제품 견적 조회

성능인증(EPC) 및 조달우수제품 인증 준비 고객이 품목별 시험항목, 기초 시험비·구조해석비·컨설팅 비용, 예상 소요기간을 조회할 수 있는 웹앱입니다.

## 실행

```bash
npm install
npm run dev
```

## 데이터 교체 (중요)

현재 [src/data/certItems.ts](src/data/certItems.ts)에는 **프로토타입 시연용 샘플(예시) 데이터**가 들어있습니다. 화면에도 "예시 데이터" 안내 배너가 항상 표시됩니다.

실제 서비스로 전환하려면:

1. `src/types.ts`의 `CertItem` 타입에 맞춰 실제 품목별 시험항목/비용/기간 데이터를 준비합니다.
2. `certItems.ts`의 배열을 실제 데이터로 교체하거나, 이 파일이 API/DB에서 데이터를 fetch하도록 수정합니다.
3. `src/App.tsx`의 `SampleDataBanner` 컴포넌트를 제거합니다.
4. `src/pages/InquiryPage.tsx`의 문의 폼은 현재 실제 전송 없이 화면에만 성공 메시지를 표시합니다. 담당 부서로 문의가 전달되도록 백엔드(API) 연동이 필요합니다.

## 구조

- `src/types.ts` — 품목/비용/기간 데이터 타입
- `src/data/certItems.ts` — 품목 데이터 (샘플)
- `src/pages/ItemListPage.tsx` — 품목 검색·필터 목록
- `src/pages/ItemDetailPage.tsx` — 품목 상세 및 비용 견적
- `src/pages/InquiryPage.tsx` — 상담 문의 폼
