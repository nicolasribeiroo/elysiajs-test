import type { DomainError } from '@core/domain/errors/DomainError';

export class InvalidPasswordLengthError extends Error implements DomainError {
	public readonly code = 'invalid_password_length';

	public constructor() {
		super(`The password must have between 6 and 255 characters.`);
		this.name = 'InvalidPasswordLengthError';
	}
}
