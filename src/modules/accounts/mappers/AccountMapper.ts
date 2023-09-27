import type { Account as RawAccount } from '@prisma/client';
import { Account } from '../domain/account/account';
import { Email } from '../domain/account/email';
import { Password } from '../domain/account/password';

export const AccountMapper = {
	async toDomain(raw: RawAccount) {
		const emailOrError = Email.create(raw.email);
		const passwordOrError = Password.create(raw.password, true);

		if (emailOrError.isLeft()) {
			throw new Error('Email value is invalid.');
		}

		if (passwordOrError.isLeft()) {
			throw new Error('Password value is invalid.');
		}

		const accountOrError = Account.create(
			{
				email: emailOrError.value,
				password: passwordOrError.value,
				userId: raw.user_id,
			},
			raw.id,
		);

		if (accountOrError.isRight()) {
			return accountOrError.value;
		}

		return null;
	},

	async toPersistence(account: Account) {
		return {
			id: account.id,
			email: account.email.value,
			user_id: account.userId,
			password: await account.password.getHashedValue(),
		};
	},
};
