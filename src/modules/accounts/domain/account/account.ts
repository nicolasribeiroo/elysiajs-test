import { Entity } from '@core/domain/Entity';
import { right, type Either } from '@core/logic/Either';
import type { Email } from './email';
import type { InvalidEmailError } from './errors/InvalidEmailError';
import type { InvalidPasswordLengthError } from './errors/InvalidPasswordLengthError.ts';
import type { Password } from './password';

interface IAccountProps {
	email: Email;
	password: Password;
	userId: string;
}

export class Account extends Entity<IAccountProps> {
	private constructor(props: IAccountProps, id?: string) {
		super(props, 'account', id);
	}

	public get id(): string {
		return this._id;
	}

	public get email(): Email {
		return this.props.email;
	}

	public get userId(): string {
		return this.props.userId;
	}

	public get password(): Password {
		return this.props.password;
	}

	public static create(
		props: IAccountProps,
		id?: string,
	): Either<InvalidEmailError | InvalidPasswordLengthError, Account> {
		const account = new Account(props, id);

		return right(account);
	}
}
