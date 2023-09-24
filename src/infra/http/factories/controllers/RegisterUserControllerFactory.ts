import type { Controller } from '@core/infra/Controller';
import { CompareFieldsValidator } from '@infra/validation/CompareFieldsValidator';
import { ValidatorCompositor } from '@infra/validation/Compositor';
import { PrismaUsersRepository } from '@modules/users/repositories/prisma/PrismaUsersRepository';
import { RegisterUser } from '@modules/users/useCases/RegisterUser/RegisterUser';
import { RegisterUserController } from '@modules/users/useCases/RegisterUser/RegisterUserController';

export function makeRegisterUserController(): Controller {
	const prismaUsersRepository = new PrismaUsersRepository();
	const registerUser = new RegisterUser(prismaUsersRepository);

	const validator = new ValidatorCompositor([new CompareFieldsValidator('password', 'password_confirmation')]);

	return new RegisterUserController(validator, registerUser);
}
