export function formatWon(amount: number): string {
  return `${amount.toLocaleString("ko-KR")}원`;
}

export function formatDuration(minDays: number, maxDays: number): string {
  if (minDays === maxDays) return `약 ${minDays}영업일`;
  return `약 ${minDays}~${maxDays}영업일`;
}

export function totalFee(fee: {
  basicTestFee: number;
  structuralAnalysisFee: number;
  consultingFee: number;
}): number {
  return fee.basicTestFee + fee.structuralAnalysisFee + fee.consultingFee;
}
