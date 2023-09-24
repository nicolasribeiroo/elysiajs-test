import type { Either } from '@core/logic/Either';
import { left, right } from '@core/logic/Either';
import { InvalidUsernameError } from './errors/InvalidUsernameError';

export class Username {
	private readonly username: string;

	private constructor(username: string) {
		this.username = username;
	}

	public get value(): string {
		return this.username;
	}

	private static validate(name: string): boolean {
		return !(!name || name.trim().length < 2 || name.trim().length > 255);
	}

	public static create(name: string): Either<InvalidUsernameError, Username> {
		if (!this.validate(name)) {
			return left(new InvalidUsernameError(name));
		}

		return right(new Username(name));
	}
}
