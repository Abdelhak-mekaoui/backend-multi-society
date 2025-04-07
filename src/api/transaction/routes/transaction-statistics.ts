import { factories } from '@strapi/strapi';

const routes = [
  {
    method: 'GET',
    path: '/transactions/monthly-stats',
    handler: 'transaction-statistics.getMonthlyStats',
    config: {
      policies: [],
      auth: false,
      query: {
        startDate: { type: 'string', required: true },
        endDate: { type: 'string', required: true },
        company: { type: 'string', required: false }
      }
    }
  }
] as const;

export default {
  routes
}; 