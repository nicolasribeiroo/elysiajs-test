import type { Controller } from '@core/infra/Controller';
import { CompareFieldsValidator } from '@infra/validation/CompareFieldsValidator';
import { ValidatorCompositor } from '@infra/validation/Compositor';
import { PrismaAccountsRepository } from '@modules/accounts/repositories/prisma/PrismaAccountsRepository';
import { PrismaUsersRepository } from '@modules/accounts/repositories/prisma/PrismaUsersRepository';
import { RegisterUser } from '@modules/accounts/useCases/RegisterUser/RegisterUser';
import { RegisterUserController } from '@modules/accounts/useCases/RegisterUser/RegisterUserController';

export function makeRegisterUserController(): Controller {
	const prismaUsersRepository = new PrismaUsersRepository();
	const prismaAccountsRepository = new PrismaAccountsRepository();
	const registerUser = new RegisterUser(prismaUsersRepository, prismaAccountsRepository);

	const validator = new ValidatorCompositor([new CompareFieldsValidator('password', 'password_confirmation')]);

	return new RegisterUserController(validator, registerUser);
}
