import type { Controller } from '@core/infra/Controller';
import type { CustomError } from '@core/infra/CustomError';
import { clientError, fail, ok } from '@core/infra/HttpResponse';
import type { AuthenticateUser } from './AuthenticateUser';

interface AuthenticateUserControllerRequest {
	body: {
		email: string;
		password: string;
	};
	requestingIp: string;
	userAgent: string;
}

export class AuthenticateUserController implements Controller {
	public constructor(private readonly authenticateUser: AuthenticateUser) {}

	public async handle(request: AuthenticateUserControllerRequest): Promise<Response> {
		try {
			const { requestingIp, userAgent } = request;
			const { email, password } = request.body;

			const result = await this.authenticateUser.execute({
				email,
				password,
				requestingIp,
				userAgent,
			});

			if (result.isLeft()) {
				return clientError(result.value as CustomError);
			} else {
				const { token } = result.value;

				return ok({ token });
			}
		} catch (error: any) {
			return fail(error);
		}
	}
}
