import { Router } from 'express';

import appointmentsRouter from './appointments.routes';
import usersRouter from './users.routes';
import sessionsRouter from './sessions.routes';

const routes = Router();

routes.use('/appointments', appointmentsRouter); // Usa todos as rotas e define /appointments como rota principal
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);

export default routes;
