import { t } from 'elysia';
import type { AppInstance } from '@infra/http/app';
import { makeAuthenticateSessionController } from '@infra/http/factories/controllers/AuthenticateSessionControllerFactory';

const bodySchema = t.Object({
	email: t.String(),
	password: t.String(),
});

export function AuthenticateSessionController<Instance extends AppInstance>(app: Instance) {
	return app.post(
		'/sessions',
		async ({ body, headers }) => {
			const authenticateSessionController = makeAuthenticateSessionController();

			const requestingIp = headers['cf-connecting-ip'] ?? '0.0.0.0';
			const userAgent = headers['user-agent'] ?? 'N/A';

			return authenticateSessionController.handle({
				body,
				requestingIp,
				userAgent,
			});
		},
		{
			body: bodySchema,
			detail: {
				tags: ['Sessions/Authenticate'],
			},
		},
	);
}
