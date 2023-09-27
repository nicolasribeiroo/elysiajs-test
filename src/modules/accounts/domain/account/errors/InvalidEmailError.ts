import type { DomainError } from '@core/domain/errors/DomainError';

export class InvalidEmailError extends Error implements DomainError {
	public readonly code = 'invalid_email';

	public constructor(email: string) {
		super(`The email "${email}" is invalid.`);
		this.name = 'InvalidEmailError';
	}
}
