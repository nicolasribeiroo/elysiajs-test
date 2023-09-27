import { pika } from '@core/infra/Pika';
import { left, right } from '@core/logic/Either';
import type { Either } from '@core/logic/Either';
import { prisma } from '@infra/prisma/client';
import { redisConnection } from '@infra/redis/connection';
import type { IAccountsRepository } from '@modules/accounts/repositories/IAccountsRepository';
import type { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { Account } from '../../domain/account/account';
import { Email } from '../../domain/account/email';
import type { InvalidEmailError } from '../../domain/account/errors/InvalidEmailError';
import type { InvalidPasswordLengthError } from '../../domain/account/errors/InvalidPasswordLengthError.ts';
import { Password } from '../../domain/account/password';
import type { InvalidUsernameError } from '../../domain/user/errors/InvalidUsernameError';
import { User } from '../../domain/user/user';
import { Username } from '../../domain/user/username';
import { EmailAlreadyExistsError } from './errors/EmailAlreadyExistsError';
import { UsernameAlreadyExistsError } from './errors/UsernameAlreadyExistsError';

interface RegisterUserRequest {
	email: string;
	password: string;
	requestingIp: string;
	userAgent: string;
	username: string;
}

type RegisterUserResponse = Either<
	| EmailAlreadyExistsError
	| InvalidEmailError
	| InvalidPasswordLengthError
	| InvalidUsernameError
	| UsernameAlreadyExistsError,
	User
>;

export class RegisterUser {
	public constructor(
		private readonly usersRepository: IUsersRepository,
		private readonly accountsRepository: IAccountsRepository,
	) {}

	public async execute({
		username,
		email,
		password,
		requestingIp,
		userAgent,
	}: RegisterUserRequest): Promise<RegisterUserResponse> {
		const usernameOrError = Username.create(username);
		const emailOrError = Email.create(email);
		const passwordOrError = Password.create(password);

		if (usernameOrError.isLeft()) {
			return left(usernameOrError.value);
		}

		if (emailOrError.isLeft()) {
			return left(emailOrError.value);
		}

		if (passwordOrError.isLeft()) {
			return left(passwordOrError.value);
		}

		const id = pika.gen('user');
		const account_id = pika.gen('account');

		const accountOrError = Account.create(
			{
				email: emailOrError.value,
				password: passwordOrError.value,
				userId: id,
			},
			account_id,
		);

		if (accountOrError.isLeft()) {
			return left(accountOrError.value);
		}

		const account = accountOrError.value;

		const accountAlreadyExists = await this.accountsRepository.exists(account.email.value);

		if (accountAlreadyExists) {
			return left(new EmailAlreadyExistsError(account.email.value));
		}

		const userOrError = User.create(
			{
				username: usernameOrError.value,
			},
			id,
		);

		if (userOrError.isLeft()) {
			return left(userOrError.value);
		}

		const user = userOrError.value;

		const usernameAlreadyExists = await this.usersRepository.usernameExists(user.username.value);

		if (usernameAlreadyExists) {
			return left(new UsernameAlreadyExistsError(user.username.value));
		}

		await this.usersRepository.create(user);
		await this.accountsRepository.create(account);

		const session = pika.gen('session');
		await redisConnection.hset(`sessions/${session}`, {
			user_id: id,
			account_id,
		});

		await prisma.session.create({
			data: {
				ip: requestingIp,
				token: session,
				user_agent: userAgent,
				user_id: id,
				account_id,
			},
		});

		return right(user);
	}
}
