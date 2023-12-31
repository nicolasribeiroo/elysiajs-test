import type { UseCaseError } from '@core/domain/errors/UseCaseError';

export class UserNotFoundError extends Error implements UseCaseError {
	public readonly code = 'user_not_found';

	public constructor(id: string) {
		super(`The user with id "${id}" was not found.`);
		this.name = 'UserNotFoundError';
	}
}
