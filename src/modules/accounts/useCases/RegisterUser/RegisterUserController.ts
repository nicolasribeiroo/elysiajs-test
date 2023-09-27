import type { Controller } from '@core/infra/Controller';
import type { CustomError } from '@core/infra/CustomError';
import { clientError, conflict, created, fail } from '@core/infra/HttpResponse';
import type { Validator } from '@core/infra/Validator';
import type { RegisterUser } from './RegisterUser';
import { EmailAlreadyExistsError } from './errors/EmailAlreadyExistsError';
import { UsernameAlreadyExistsError } from './errors/UsernameAlreadyExistsError';

interface RegisterUserControllerRequest {
	body: {
		email: string;
		password: string;
		username: string;
	};
	requestingIp: string;
	userAgent: string;
}

export class RegisterUserController implements Controller {
	public constructor(
		private readonly validator: Validator<RegisterUserControllerRequest>,
		private readonly registerUser: RegisterUser,
	) {}

	public async handle(request: RegisterUserControllerRequest): Promise<Response> {
		try {
			const validationResult = this.validator.validate(request);

			if (validationResult.isLeft()) {
				return clientError(validationResult.value);
			}

			const { requestingIp, userAgent } = request;
			const { email, username, password } = request.body;

			const result = await this.registerUser.execute({
				username,
				email,
				password,
				requestingIp,
				userAgent,
			});

			if (result.isLeft()) {
				const error = result.value;

				switch (error.constructor) {
					case EmailAlreadyExistsError:
						return conflict(error as CustomError);
					case UsernameAlreadyExistsError:
						return conflict(error as CustomError);
					default:
						return clientError(error as CustomError);
				}
			} else {
				return created();
			}
		} catch (error: any) {
			return fail(error);
		}
	}
}
