import type { AppInstance } from '@infra/http/app';
import { makeGetUserController } from '@infra/http/factories/controllers/GetUserControllerFactory';

export function GetUserController<Instance extends AppInstance>(app: Instance) {
	return app.get(
		'/users/:id',
		async ({ params }) => {
			const getUserController = makeGetUserController();

			return getUserController.handle({
				params,
			});
		},
		{
			detail: {
				tags: ['Users'],
			},
		},
	);
}
