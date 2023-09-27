import type { DomainError } from '@core/domain/errors/DomainError';

export class InvalidTokenError extends Error implements DomainError {
	public readonly code = 'invalid_token';

	public constructor() {
		super(`The token is invalid.`);
		this.name = 'InvalidTokenError';
	}
}
