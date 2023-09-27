import type { UseCaseError } from '@core/domain/errors/UseCaseError';

export class InvalidEmailOrPasswordError extends Error implements UseCaseError {
	public readonly code = 'invalid_email_or_password';

	public constructor() {
		super(`Invalid e-mail/password combination.`);
		this.name = 'InvalidEmailOrPasswordError';
	}
}
