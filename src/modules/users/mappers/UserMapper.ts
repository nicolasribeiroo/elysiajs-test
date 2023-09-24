import type { User as RawUser } from '@prisma/client';
import { Email } from '../domain/email';
import { Password } from '../domain/password';
import { User } from '../domain/user';
import { Username } from '../domain/username';

export const UserMapper = {
	toDomain(raw: RawUser) {
		const usernameOrError = Username.create(raw.username);
		const emailOrError = Email.create(raw.email);
		const passwordOrError = Password.create(raw.password, true);

		if (usernameOrError.isLeft()) {
			throw new Error('Name value is invalid.');
		}

		if (emailOrError.isLeft()) {
			throw new Error('Email value is invalid.');
		}

		if (passwordOrError.isLeft()) {
			throw new Error('Password value is invalid.');
		}

		const userOrError = User.create(
			{
				username: usernameOrError.value,
				email: emailOrError.value,
				password: passwordOrError.value,
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
			email: user.email.value,
			password: await user.password.getHashedValue(),
		};
	},
};
