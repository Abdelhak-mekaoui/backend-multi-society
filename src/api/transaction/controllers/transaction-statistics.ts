import { factories } from '@strapi/strapi';
import { GetMonthlyStatsParams, MonthlyStats } from '../types/transaction-statistics';

export default factories.createCoreController('api::transaction.transaction', ({ strapi }) => ({
  async getMonthlyStats(ctx) {
    try {
      const { startDate, endDate } = ctx.query as unknown as GetMonthlyStatsParams;
      
      const stats = await strapi.service('api::transaction.transaction-statistics').getMonthlyStats({
        startDate,
        endDate
      });

      return { data: stats };
    } catch (error) {
      ctx.throw(500, error);
    }
  }
})); 