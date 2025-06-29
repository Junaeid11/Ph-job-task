import { Router } from 'express';
import { AuthRouter } from '../modules/Auth/auth.route';
import eventRouter from '../modules/Event/event.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRouter,
  },
  {
    path: '/events',
    route: eventRouter,
  },
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;