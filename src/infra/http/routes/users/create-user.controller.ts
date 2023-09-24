import { t } from 'elysia';
import type { AppInstance } from '@infra/http/app';
import { makeRegisterUserController } from '@infra/http/factories/controllers/RegisterUserControllerFactory';

const bodySchema = t.Object({
	username: t.String(),
	email: t.String(),
	password: t.String(),
});

const responseSchema = t.Object({
	success: t.Boolean(),
	data: t.Optional(
		t.Object({
			id: t.String(),
			username: t.String(),
			email: t.String(),
		}),
	),
	error: t.Optional(
		t.Object({
			code: t.String(),
			message: t.String(),
		}),
	),
});

export function CreateUserController<Instance extends AppInstance>(app: Instance) {
	return app.post(
		'/users',
		async ({ body }) => {
			const registerUserController = makeRegisterUserController();

			return registerUserController.handle({
				body,
			});
		},
		{
			body: bodySchema,
			response: responseSchema,
			detail: {
				tags: ['Users'],
			},
		},
	);
}
