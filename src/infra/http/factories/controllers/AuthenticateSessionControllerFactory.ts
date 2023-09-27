import type { Controller } from '@core/infra/Controller';
import { PrismaAccountsRepository } from '@modules/accounts/repositories/prisma/PrismaAccountsRepository';
import { AuthenticateUser } from '@modules/accounts/useCases/AuthenticateUser/AuthenticateUser';
import { AuthenticateUserController } from '@modules/accounts/useCases/AuthenticateUser/AuthenticateUserController';

export function makeAuthenticateSessionController(): Controller {
	const prismaAccountsRepository = new PrismaAccountsRepository();
	const authenticateUser = new AuthenticateUser(prismaAccountsRepository);

	return new AuthenticateUserController(authenticateUser);
}
