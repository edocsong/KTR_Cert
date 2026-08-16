export type CertType = "성능인증" | "혁신제품" | "조달우수제품";

export interface FeeBreakdown {
  /** 기초 시험비 (원) */
  basicTestFee: number;
  /** 구조해석비 (원). 해당 품목에 구조해석이 불필요하면 0 */
  structuralAnalysisFee: number;
  /** 인증 컨설팅 비용 (원) */
  consultingFee: number;
}

export interface DurationRange {
  /** 최소 예상 소요기간 (영업일) */
  minDays: number;
  /** 최대 예상 소요기간 (영업일) */
  maxDays: number;
}

export interface CertItem {
  id: string;
  /** 품목 대분류 (예: 전기·전자, 기계, 정보통신) */
  category: string;
  /** 품목명 */
  itemName: string;
  /** 해당 품목이 지원 가능한 인증 유형 */
  certTypes: CertType[];
  /** 필수 시험항목 목록 */
  testItems: string[];
  fee: FeeBreakdown;
  duration: DurationRange;
  /** 참고사항 (선택) */
  notes?: string;
}
