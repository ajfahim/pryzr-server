import { Router } from 'express';

import { UserRoutes } from '../modules/User/user.route';
import { GamesRoutes } from '../modules/games/games.routes';

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
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
