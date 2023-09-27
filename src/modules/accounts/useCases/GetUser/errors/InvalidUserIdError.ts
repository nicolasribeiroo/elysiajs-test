import type { UseCaseError } from '@core/domain/errors/UseCaseError';

export class InvalidUserIdError extends Error implements UseCaseError {
	public readonly code = 'invalid_user_id';

	public constructor(id: string) {
		super(`The user id "${id}" is invalid.`);
		this.name = 'InvalidUserIdError';
	}
}
