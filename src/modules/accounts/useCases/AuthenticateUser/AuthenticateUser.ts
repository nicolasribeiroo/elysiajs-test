import { pika } from '@core/infra/Pika';
import { left, type Either, right } from '@core/logic/Either';
import { prisma } from '@infra/prisma/client';
import { redisConnection } from '@infra/redis/connection';
import type { IAccountsRepository } from '@modules/accounts/repositories/IAccountsRepository';
import { InvalidEmailOrPasswordError } from './errors/InvalidEmailOrPasswordError';

interface TokenResponse {
	token: string;
}

interface AuthenticateUserRequest {
	email: string;
	password: string;
	requestingIp: string;
	userAgent: string;
}

type AuthenticateUserResponse = Either<InvalidEmailOrPasswordError, TokenResponse>;

export class AuthenticateUser {
	public constructor(private readonly accountsRepository: IAccountsRepository) {}

	public async execute({
		email,
		password,
		requestingIp,
		userAgent,
	}: AuthenticateUserRequest): Promise<AuthenticateUserResponse> {
		const account = await this.accountsRepository.findByEmail(email);

		if (!account) {
			return left(new InvalidEmailOrPasswordError());
		}

		const isValidPassword = await account.password.comparePassword(password);

		console.log(isValidPassword, password);

		if (isValidPassword === false) {
			return left(new InvalidEmailOrPasswordError());
		}

		const session = pika.gen('session');
		await redisConnection.hset(`sessions/${session}`, {
			user_id: account.userId,
			account_id: account.id,
		});

		await prisma.session.create({
			data: {
				ip: requestingIp,
				token: session,
				user_agent: userAgent,
				user_id: account.userId,
				account_id: account.id,
			},
		});

		return right({ token: session });
	}
}
