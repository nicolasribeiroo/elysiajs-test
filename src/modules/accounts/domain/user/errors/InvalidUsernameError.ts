import type { DomainError } from '@core/domain/errors/DomainError';

export class InvalidUsernameError extends Error implements DomainError {
	public readonly code = 'invalid_username';

	public constructor(name: string) {
		super(`The name "${name}" is invalid.`);
		this.name = 'InvalidUsernameError';
	}
}
