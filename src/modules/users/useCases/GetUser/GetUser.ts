import { pika } from '@core/infra/Pika';
import type { Either } from '@core/logic/Either';
import { left, right } from '@core/logic/Either';
import type { User } from '@modules/users/domain/user';
import type { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { InvalidUserIdError } from './errors/InvalidUserIdError';
import { UserNotFoundError } from './errors/UserNotFoundError';

interface GetUserRequest {
	id: string;
}

type GetUserResponse = Either<InvalidUserIdError | UserNotFoundError, User>;

export class GetUser {
	public constructor(private readonly usersRepository: IUsersRepository) {}

	public async execute({ id }: GetUserRequest): Promise<GetUserResponse> {
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
