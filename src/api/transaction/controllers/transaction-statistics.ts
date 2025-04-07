import { factories } from '@strapi/strapi';

interface GetMonthlyStatsParams {
  startDate: string;
  endDate: string;
  company?: string;
}

export default factories.createCoreController('api::transaction.transaction', ({ strapi }) => ({
  async getMonthlyStats(ctx) {
    try {
      const { startDate, endDate, company } = ctx.query as unknown as GetMonthlyStatsParams;
      
      const stats = await strapi.service('api::transaction.transaction-statistics').getMonthlyStats({
        startDate,
        endDate,
        company
      });

      return { data: stats };
    } catch (error) {
      ctx.throw(500, error);
    }
  }
})); 