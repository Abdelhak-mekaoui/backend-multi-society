import { factories } from '@strapi/strapi';
import { GetMonthlyStatsParams, MonthlyStats } from '../types/transaction-statistics';

interface Transaction {
  date: string;
  type: 'achat' | 'vente';
  amount: number;
}

export default factories.createCoreService('api::transaction.transaction', ({ strapi }) => ({
  async getMonthlyStats({ startDate, endDate, company }: GetMonthlyStatsParams): Promise<MonthlyStats[]> {
    const query = {
      filters: {
        date: {
          $gte: startDate,
          $lte: endDate,
        },
        ...((company && company !== 'all') && { company: { name: { $eq: company } } }),
      },
    };

    const transactions = await strapi.entityService.findMany('api::transaction.transaction', query) as Transaction[];
    // Group transactions by month
    const monthlyStats = transactions.reduce((acc: Record<string, MonthlyStats>, transaction: Transaction) => {
      const month = new Date(transaction.date).toISOString().slice(0, 7); // YYYY-MM format
      
      if (!acc[month]) {
        acc[month] = {
          month,
          totalAchat: 0,
          totalVente: 0,
          net: 0
        };
      }

      if (transaction.type === 'achat') {
        acc[month].totalAchat += transaction.amount;
      } else if (transaction.type === 'vente') {
        acc[month].totalVente += transaction.amount;
      }

      acc[month].net = acc[month].totalVente - acc[month].totalAchat;

      return acc;
    }, {});

    // Convert to array and sort by month
    return Object.values(monthlyStats).sort((a, b) => a.month.localeCompare(b.month));
  }
})); 