import { pika } from '@core/infra/Pika';
import type { Either } from '@core/logic/Either';
import { left, right } from '@core/logic/Either';
import { redisConnection } from '@infra/redis/connection';
import { InvalidTokenError } from '@modules/accounts/domain/user/errors/InvalidTokenError';
import type { User } from '../../domain/user/user';
import type { IUsersRepository } from '../../repositories/IUsersRepository';
import { InvalidUserIdError } from './errors/InvalidUserIdError';
import { UserNotFoundError } from './errors/UserNotFoundError';

interface GetUserRequest {
	authorization?: string;
	id: string;
}

type GetUserResponse = Either<InvalidTokenError | InvalidUserIdError | UserNotFoundError, User>;

export class GetUser {
	public constructor(private readonly usersRepository: IUsersRepository) {}

	public async execute({ id, authorization }: GetUserRequest): Promise<GetUserResponse> {
		if (id === '@me') {
			if (!authorization || !pika.validate(authorization, 'session')) {
				return left(new InvalidTokenError());
			}

			const session = (await redisConnection.hgetall(`sessions/${authorization}`)) as {
				user_id: string;
			};

			if (!session || Object.keys(session).length === 0) {
				return left(new UserNotFoundError(id));
			}

			if (session.user_id) {
				const user = await this.usersRepository.findById(session.user_id);

				if (!user) {
					return left(new UserNotFoundError(id));
				}

				return right(user);
			}

			return left(new UserNotFoundError(id));
		}

		if (!id || !pika.validate(id, 'user')) {
			return left(new InvalidUserIdError(id));
		}

		const user = await this.usersRepository.findById(id);

		if (!user) {
			return left(new UserNotFoundError(id));
		}

		return right(user);
	}
}
