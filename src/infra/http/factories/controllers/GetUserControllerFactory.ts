import type { Controller } from '@core/infra/Controller';
import { PrismaUsersRepository } from '@modules/accounts/repositories/prisma/PrismaUsersRepository';
import { GetUser } from '@modules/accounts/useCases/GetUser/GetUser';
import { GetUserController } from '@modules/accounts/useCases/GetUser/GetUserController';

export function makeGetUserController(): Controller {
	const prismaUsersRepository = new PrismaUsersRepository();
	const getUser = new GetUser(prismaUsersRepository);

	return new GetUserController(getUser);
}
