import type { AppInstance } from '@infra/http/app';
import { makeGetUserController } from '@infra/http/factories/controllers/GetUserControllerFactory';

export function GetUserController<Instance extends AppInstance>(app: Instance) {
	return app.get(
		'/users/:id',
		async ({ params, headers }) => {
			const getUserController = makeGetUserController();

			return getUserController.handle({
				params,
				headers,
			});
		},
		{
			detail: {
				tags: ['Users/Get'],
			},
		},
	);
}
