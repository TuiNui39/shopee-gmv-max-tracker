interface Data {
  gmv: number;
  orders: number;
  costs: number;
  adSpend: number;
  clicks: number;
  impressions: number;
  commissionRate: number;
  transactionRate: number;
  paymentRate: number;
}

interface WeeklyData {
  [key: string]: number;
}

export function calculateAOV(gmv: number, orders: number): number {
  return gmv / orders;
}

export function calculateTotalFees(data: Data): number {
  return calculateShopeeFees(data.gmv, data.commissionRate, data.transactionRate, data.paymentRate);
}

export function calculateVAT(totalFees: number, adSpend: number): number {
  return (totalFees + adSpend) * 0.07;
}

export function calculateNetProfit(data: Data): number {
  const totalFees = calculateTotalFees(data);
  const vat = calculateVAT(totalFees, data.adSpend);
  return data.gmv - data.costs - totalFees - data.adSpend - vat;
}

export function calculateROAS(gmv: number, adSpend: number): number {
  return gmv / adSpend;
}

export function calculateRealROAS(netProfit: number, adSpend: number): number {
  return netProfit / adSpend;
}

export function calculateBreakEvenROAS(data: Data): number {
  const totalFees = calculateTotalFees(data);
  const vat = calculateVAT(totalFees, data.adSpend);
  return (data.costs + totalFees + vat) / data.adSpend;
}

export function calculateTargetROAS(breakEvenRoas: number, targetMargin: number): number {
  return breakEvenRoas / (1 - targetMargin);
}

export function calculateCTR(clicks: number, impressions: number): number {
  return (clicks / impressions) * 100;
}

export function calculateCPC(adSpend: number, clicks: number): number {
  return adSpend / clicks;
}

export function calculateCPA(adSpend: number, orders: number): number {
  return adSpend / orders;
}

export function calculateConversionRate(orders: number, clicks: number): number {
  return (orders / clicks) * 100;
}

export function calculateProfitMargin(netProfit: number, gmv: number): number {
  return (netProfit / gmv) * 100;
}

export function calculateAllMetrics(data: Data): WeeklyData {
  const totalFees = calculateTotalFees(data);
  const vat = calculateVAT(totalFees, data.adSpend);
  const netProfit = calculateNetProfit(data);
  const roas = calculateROAS(data.gmv, data.adSpend);
  const realRoas = calculateRealROAS(netProfit, data.adSpend);
  const breakEvenRoas = calculateBreakEvenROAS(data);
  const targetRoas = calculateTargetROAS(breakEvenRoas, 0.1);
  const ctr = calculateCTR(data.clicks, data.impressions);
  const cpc = calculateCPC(data.adSpend, data.clicks);
  const cpa = calculateCPA(data.adSpend, data.orders);
  const conversionRate = calculateConversionRate(data.orders, data.clicks);
  const profitMargin = calculateProfitMargin(netProfit, data.gmv);

  return {
    aov: calculateAOV(data.gmv, data.orders),
    totalFees,
    vat,
    netProfit,
    roas,
    realRoas,
    breakEvenRoas,
    targetRoas,
    ctr,
    cpc,
    cpa,
    conversionRate,
    profitMargin,
  };
}

export function calculateShopeeFees(
  gmv: number,
  commissionRate: number,
  transactionRate: number,
  paymentRate: number
): number {
  return gmv * (commissionRate + transactionRate + paymentRate);
}

export function compareWeeks(currentWeek: WeeklyData, previousWeek: WeeklyData): WeeklyData {
  const result: WeeklyData = {};
  for (const key in currentWeek) {
    if (currentWeek.hasOwnProperty(key) && previousWeek.hasOwnProperty(key)) {
      result[key] = currentWeek[key] - previousWeek[key];
    }
  }
  return result;
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('th-TH', { style: 'currency', currency: 'THB' }).format(amount);
}

export function formatPercent(value: number, decimals: number = 2): string {
  return `${(value * 100).toFixed(decimals)}%`;
}

export function formatROAS(roas: number): string {
  return `${roas.toFixed(2)}x`;
}