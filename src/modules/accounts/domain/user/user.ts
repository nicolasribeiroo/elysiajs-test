import { Entity } from '@core/domain/Entity';
import type { Either } from '@core/logic/Either';
import { right } from '@core/logic/Either';
import type { InvalidUsernameError } from './errors/InvalidUsernameError';
import type { Username } from './username';

interface IUserProps {
	username: Username;
}

export class User extends Entity<IUserProps> {
	private constructor(props: IUserProps, id?: string) {
		super(props, 'user', id);
	}

	public get id(): string {
		return this._id;
	}

	public get username(): Username {
		return this.props.username;
	}

	public static create(props: IUserProps, id?: string): Either<InvalidUsernameError, User> {
		const user = new User(props, id);

		return right(user);
	}
}
