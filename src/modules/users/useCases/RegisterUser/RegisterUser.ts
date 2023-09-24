import type { Either } from '@core/logic/Either';
import { left, right } from '@core/logic/Either';
import { Email } from '@modules/users/domain/email';
import type { InvalidEmailError } from '@modules/users/domain/errors/InvalidEmailError';
import type { InvalidPasswordLengthError } from '@modules/users/domain/errors/InvalidPasswordLengthError.ts';
import type { InvalidUsernameError } from '@modules/users/domain/errors/InvalidUsernameError';
import { Password } from '@modules/users/domain/password';
import { User } from '@modules/users/domain/user';
import { Username } from '@modules/users/domain/username';
import type { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { AccountAlreadyExistsError } from './errors/AccountAlreadyExistsError';

interface RegisterUserRequest {
	email: string;
	password: string;
	username: string;
}

type RegisterUserResponse = Either<
	AccountAlreadyExistsError | InvalidEmailError | InvalidPasswordLengthError | InvalidUsernameError,
	User
>;

export class RegisterUser {
	public constructor(private readonly usersRepository: IUsersRepository) {}

	public async execute({ username, email, password }: RegisterUserRequest): Promise<RegisterUserResponse> {
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

		const userOrError = User.create({
			username: usernameOrError.value,
			email: emailOrError.value,
			password: passwordOrError.value,
		});

		if (userOrError.isLeft()) {
			return left(userOrError.value);
		}

		const user = userOrError.value;

		const userAlreadyExists = await this.usersRepository.exists(user.email.value);

		if (userAlreadyExists) {
			return left(new AccountAlreadyExistsError(user.email.value));
		}

		await this.usersRepository.create(user);

		return right(user);
	}
}
