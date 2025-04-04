export interface MonthlyStats {
  month: string;
  totalAchat: number;
  totalVente: number;
  net: number;
}

export interface GetMonthlyStatsParams {
  startDate: string;
  endDate: string;
} 