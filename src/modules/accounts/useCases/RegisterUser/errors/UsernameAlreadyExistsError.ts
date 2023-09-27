import type { UseCaseError } from '@core/domain/errors/UseCaseError';

export class UsernameAlreadyExistsError extends Error implements UseCaseError {
	public readonly code = 'username_already_exists';

	public constructor(username: string) {
		super(`The username "${username}" is already registered.`);
		this.name = 'UsernameAlreadyExistsError';
	}
}
