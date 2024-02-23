import { Router } from 'express';

import { UserRoutes } from '../modules/User/user.route';
import { AdminActionRoutes } from '../modules/adminActions/adminAction.routes';
import { GamesRoutes } from '../modules/games/games.routes';
import { TransactionRoutes } from '../modules/transaction/transaction.routes';

const router = Router();

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/games',
    route: GamesRoutes,
  },
  {
    path: '/transactions',
    route: TransactionRoutes,
  },
  {
    path: '/admin',
    route: AdminActionRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
