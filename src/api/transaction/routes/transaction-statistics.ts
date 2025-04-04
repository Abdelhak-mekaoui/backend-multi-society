import { factories } from '@strapi/strapi';

const routes = [
  {
    method: 'GET',
    path: '/transactions/monthly-stats',
    handler: 'transaction-statistics.getMonthlyStats',
    config: {
      policies: [],
      auth: false
    }
  }
] as const;

export default {
  routes
}; 