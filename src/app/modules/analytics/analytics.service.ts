import dayjs from 'dayjs';
import { User } from '../User/user.model';
import { GamePlayRecord } from '../gameplayRecords/gamePlayRecords.model';
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

const userAnalytics = async () => {
  // Get today's date
  const today = dayjs().startOf('day').toDate();

  // Get the start of the current month
  const startOfMonth = dayjs().startOf('month').toDate();

  // Count total number of users
  const totalUsersCount = await User.countDocuments({});

  // Count number of users registered today
  const usersRegisteredTodayCount = await User.countDocuments({
    createdAt: { $gte: today },
  });

  // Count number of users registered this month
  const usersRegisteredThisMonthCount = await User.countDocuments({
    createdAt: { $gte: startOfMonth },
  });

  return {
    totalUsersCount,
    usersRegisteredTodayCount,
    usersRegisteredThisMonthCount,
  };
};

const gamePlayAnalytics = async () => {
  const result = GamePlayRecord.aggregate([
    // Group by game_id
    {
      $group: {
        _id: '$game_id',
        totalBetCredits: { $sum: '$bet_credits' },
        totalWinCredits: { $sum: '$win_credits' },
      },
    },
    // Calculate RTP and holding percentages
    {
      $project: {
        _id: 1,
        totalBetCredits: 1,
        totalWinCredits: 1,
        RTP: { $divide: ['$totalWinCredits', '$totalBetCredits'] },
        holdingPercentage: {
          $subtract: [1, { $divide: ['$totalWinCredits', '$totalBetCredits'] }],
        },
      },
    },
    {
      $lookup: {
        from: 'games',
        foreignField: '_id',
        localField: '_id',
        as: 'game',
        pipeline: [{ $project: { name: 1, thumbnail_url: 1, description: 1 } }],
      },
    },
    {
      $unwind: '$game',
    },
    {
      $project: { _id: 0 },
    },
  ]);

  return result;
};
export const AnalyticsServices = {
  transactionAnalytics,
  userAnalytics,
  gamePlayAnalytics,
};
