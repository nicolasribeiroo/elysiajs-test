import { t } from 'elysia';
import type { AppInstance } from '@infra/http/app';
import { makeRegisterUserController } from '@infra/http/factories/controllers/RegisterUserControllerFactory';

const bodySchema = t.Object({
	username: t.String(),
	email: t.String(),
	password: t.String(),
});

export function CreateUserController<Instance extends AppInstance>(app: Instance) {
	return app.post(
		'/users',
		async ({ body, headers }) => {
			const registerUserController = makeRegisterUserController();

			const requestingIp = headers['cf-connecting-ip'] ?? '0.0.0.0';
			const userAgent = headers['user-agent'] ?? 'N/A';

			return registerUserController.handle({
				body,
				requestingIp,
				userAgent,
			});
		},
		{
			body: bodySchema,
			detail: {
				tags: ['Users/Create'],
			},
		},
	);
}
