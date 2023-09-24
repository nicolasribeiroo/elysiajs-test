import { Entity } from '@core/domain/Entity';
import type { Either } from '@core/logic/Either';
import { right } from '@core/logic/Either';
import type { Email } from './email';
import type { InvalidEmailError } from './errors/InvalidEmailError';
import type { InvalidPasswordLengthError } from './errors/InvalidPasswordLengthError.ts';
import type { InvalidUsernameError } from './errors/InvalidUsernameError';
import type { Password } from './password';
import type { Username } from './username';

interface IUserProps {
	email: Email;
	password: Password;
	username: Username;
}

export class User extends Entity<IUserProps> {
	private constructor(props: IUserProps, id?: string) {
		super(props, 'user', id);
	}

	public get username(): Username {
		return this.props.username;
	}

	public get email(): Email {
		return this.props.email;
	}

	public get password(): Password {
		return this.props.password;
	}

	public static create(
		props: IUserProps,
		id?: string,
	): Either<InvalidEmailError | InvalidPasswordLengthError | InvalidUsernameError, User> {
		const user = new User(props, id);

		return right(user);
	}
}
