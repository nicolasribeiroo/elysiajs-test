import type { Either } from '@core/logic/Either';
import { left, right } from '@core/logic/Either';
import { InvalidEmailError } from './errors/InvalidEmailError';

export class Email {
	private readonly email: string;

	private constructor(email: string) {
		this.email = email;
	}

	public get value(): string {
		return this.email;
	}

	private static format(email: string) {
		return email.trim().toLowerCase();
	}

	public static create(email: string): Either<InvalidEmailError, Email> {
		if (!this.validate(email)) {
			return left(new InvalidEmailError(email));
		}

		const formattedEmail = this.format(email);

		return right(new Email(formattedEmail));
	}

	private static validate(email: string): boolean {
		if (!email || email.trim().length > 255) {
			return false;
		}

		const regex =
			/^(([^\s"(),.:;<>@[\\\]]+(\.[^\s"(),.:;<>@[\\\]]+)*)|(".+"))@((\[(?:\d{1,3}\.){3}\d{1,3}])|(([\dA-Za-z\-]+\.)+[A-Za-z]{2,}))$/;

		return Boolean(regex.test(email));
	}
}
