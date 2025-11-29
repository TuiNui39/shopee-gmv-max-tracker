import Papa from 'papaparse';

interface ParseCSVOptions {
  header: boolean;
  dynamicTyping: boolean;
}

interface ShopeeAdsData {
  productName: string;
  productSku: string;
  adSpend: number;
  impressions: number;
  clicks: number;
  orders: number;
  gmv: number;
  affiliateCommission: number;
}

interface BigSellerData {
  productName: string;
  productSku: string;
  orders: number;
  units: number;
  gmv: number;
  productCost: number;
}

interface MatchedData {
  matched: Array<{
    shopeeData: ShopeeAdsData;
    bigsellerData: BigSellerData;
  }>;
  unmatchedShopee: ShopeeAdsData[];
  unmatchedBigSeller: BigSellerData[];
}

interface SummaryData {
  totalOrders: number;
  totalUnits: number;
  totalGmv: number;
  totalAdSpend: number;
  totalAffiliateCommission: number;
  totalProductCost: number;
}

export function parseCSV<T>(fileContent: string, options?: ParseCSVOptions): T[] {
  const defaultOptions: ParseCSVOptions = {
    header: true,
    dynamicTyping: true,
  };
  const mergedOptions = { ...defaultOptions, ...options };
  const { data } = Papa.parse(fileContent, mergedOptions);
  return data as T[];
}

export function parseShopeeAdsCSV(fileContent: string): ShopeeAdsData[] {
  return parseCSV<ShopeeAdsData>(fileContent);
}

export function parseBigSellerCSV(fileContent: string): BigSellerData[] {
  return parseCSV<BigSellerData>(fileContent);
}

export function matchProductData(
  shopeeData: ShopeeAdsData[],
  bigsellerData: BigSellerData[]
): MatchedData {
  const matched: MatchedData['matched'] = [];
  const unmatchedShopee: ShopeeAdsData[] = [];
  const unmatchedBigSeller: BigSellerData[] = [];

  const bigsellerMap = new Map(
    bigsellerData.map((data) => [data.productSku || data.productName, data])
  );

  for (const shopeeItem of shopeeData) {
    const key = shopeeItem.productSku || shopeeItem.productName;
    const bigsellerItem = bigsellerMap.get(key);
    if (bigsellerItem) {
      matched.push({ shopeeData: shopeeItem, bigsellerData: bigsellerItem });
      bigsellerMap.delete(key);
    } else {
      unmatchedShopee.push(shopeeItem);
    }
  }

  unmatchedBigSeller.push(...bigsellerMap.values());

  return { matched, unmatchedShopee, unmatchedBigSeller };
}

export function validateShopeeAdsData(data: ShopeeAdsData[]): boolean {
  // Add validation logic for Shopee Ads data
  return true;
}

export function validateBigSellerData(data: BigSellerData[]): boolean {
  // Add validation logic for BigSeller data
  return true;
}

export function summarizeMatchedData(matchedData: MatchedData['matched']): SummaryData {
  const summary: SummaryData = {
    totalOrders: 0,
    totalUnits: 0,
    totalGmv: 0,
    totalAdSpend: 0,
    totalAffiliateCommission: 0,
    totalProductCost: 0,
  };

  for (const { shopeeData, bigsellerData } of matchedData) {
    summary.totalOrders += shopeeData.orders;
    summary.totalUnits += bigsellerData.units;
    summary.totalGmv += shopeeData.gmv;
    summary.totalAdSpend += shopeeData.adSpend;
    summary.totalAffiliateCommission += shopeeData.affiliateCommission;
    summary.totalProductCost += bigsellerData.productCost;
  }

  return summary;
}