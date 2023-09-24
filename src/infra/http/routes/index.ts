import type Elysia from 'elysia';
import { controllers as usersControllers } from './users/users.routes';

const controllers = {
	...usersControllers,
};

export function register(app: Elysia) {
	for (const controller of Object.values(controllers)) app.use(controller);

	return app;
}
