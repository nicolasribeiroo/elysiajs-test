import type { UseCaseError } from '@core/domain/errors/UseCaseError';

export class EmailAlreadyExistsError extends Error implements UseCaseError {
	public readonly code = 'email_already_exists';

	public constructor(email: string) {
		super(`The email "${email}" is already registered.`);
		this.name = 'EmailAlreadyExistsError';
	}
}
