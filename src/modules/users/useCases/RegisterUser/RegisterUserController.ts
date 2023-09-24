import type { Controller } from '@core/infra/Controller';
import type { HttpResponse } from '@core/infra/HttpResponse';
import { clientError, conflict, created } from '@core/infra/HttpResponse';
import type { Validator } from '@core/infra/Validator';
import type { RegisterUser } from './RegisterUser';
import { AccountAlreadyExistsError } from './errors/AccountAlreadyExistsError';

interface RegisterUserControllerRequest {
	body: {
		email: string;
		password: string;
		username: string;
	};
}

export class RegisterUserController implements Controller {
	public constructor(
		private readonly validator: Validator<RegisterUserControllerRequest>,
		private readonly registerUser: RegisterUser,
	) {}

	public async handle(request: RegisterUserControllerRequest): Promise<HttpResponse<void>> {
		const validationResult = this.validator.validate(request);

		if (validationResult.isLeft()) {
			return clientError(validationResult.value);
		}

		const { email, username, password } = request.body;

		const result = await this.registerUser.execute({
			username,
			email,
			password,
		});

		if (result.isLeft()) {
			const error = result.value;

			switch (error.constructor) {
				case AccountAlreadyExistsError:
					return conflict(error);
				default:
					return clientError(error);
			}
		} else {
			return created();
		}
	}
}
