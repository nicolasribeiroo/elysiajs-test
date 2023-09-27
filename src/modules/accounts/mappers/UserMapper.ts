import type { User as RawUser } from '@prisma/client';
import { User } from '../domain/user/user';
import { Username } from '../domain/user/username';

export const UserMapper = {
	toDomain(raw: RawUser) {
		const usernameOrError = Username.create(raw.username);

		if (usernameOrError.isLeft()) {
			throw new Error('Name value is invalid.');
		}

		const userOrError = User.create(
			{
				username: usernameOrError.value,
			},
			raw.id,
		);

		if (userOrError.isRight()) {
			return userOrError.value;
		}

		return null;
	},

	async toPersistence(user: User) {
		return {
			id: user.id,
			username: user.username.value,
		};
	},
};
