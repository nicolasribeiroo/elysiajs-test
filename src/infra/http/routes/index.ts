import type Elysia from 'elysia';
import { controllers as sessionsControllers } from './sessions/sessions.routes';
import { controllers as usersControllers } from './users/users.routes';

const controllers = {
	...usersControllers,
	...sessionsControllers,
};

export function register(app: Elysia) {
	for (const controller of Object.values(controllers)) app.use(controller);

	return app;
}
