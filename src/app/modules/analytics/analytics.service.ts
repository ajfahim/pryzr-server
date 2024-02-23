import dayjs from 'dayjs';
import { Transaction } from '../transaction/transaction.model';

const transactionAnalytics = async () => {
  // Get the date 30 days ago from today
  const thirtyDaysAgo = dayjs().subtract(30, 'day').startOf('day').toDate();

  // Aggregation pipeline
  const result = Transaction.aggregate([
    // Match transactions within the last 30 days
    {
      $match: {
        date: { $gte: thirtyDaysAgo },
      },
    },
    // Group by date and type, calculate total amount for each type
    {
      $group: {
        _id: { $dateToString: { format: '%Y-%m-%d', date: '$date' } },
        totalWithdrawal: {
          $sum: { $cond: [{ $eq: ['$type', 'withdrawal'] }, '$amount', 0] },
        },
        totalPurchase: {
          $sum: { $cond: [{ $eq: ['$type', 'purchase'] }, '$amount', 0] },
        },
      },
    },
  ]);
  return result;
};

export const AnalyticsServices = {
  transactionAnalytics,
};
