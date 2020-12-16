import { Router } from 'express';

import appointmentsRouter from '@modules/appointments/infra/http/routes/appointments.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import usersRouter from '@modules/users/infra/http/routes/users.routes';

const routes = Router();

routes.use('/appointments', appointmentsRouter); // Usa todos as rotas e define /appointments como rota principal
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);

export default routes;
