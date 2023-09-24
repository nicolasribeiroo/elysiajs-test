import { prisma } from '@infra/prisma/client';
import type { User } from '@modules/users/domain/user';
import { UserMapper } from '@modules/users/mappers/UserMapper';
import type { IUsersRepository } from '../IUsersRepository';

export class PrismaUsersRepository implements IUsersRepository {
	public async exists(email: string): Promise<boolean> {
		const user = await prisma.user.findUnique({ where: { email } });

		return Boolean(user);
	}

	public async findById(id: string): Promise<User | null> {
		const user = await prisma.user.findUnique({ where: { id } });

		if (!user) {
			return null;
		}

		return UserMapper.toDomain(user);
	}

	public async create(user: User): Promise<void> {
		const data = await UserMapper.toPersistence(user);

		await prisma.user.create({ data });
	}
}
