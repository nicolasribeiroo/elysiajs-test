import { prisma } from '@infra/prisma/client';
import type { User } from '../../domain/user/user';
import { UserMapper } from '../../mappers/UserMapper';
import type { IUsersRepository } from '../IUsersRepository';

export class PrismaUsersRepository implements IUsersRepository {
	public async usernameExists(username: string): Promise<boolean> {
		const user = await prisma.user.findFirst({
			where: {
				username: { equals: username, mode: 'insensitive' },
			},
		});

		return Boolean(user);
	}

	public async findById(id: string): Promise<User | null> {
		const user = await prisma.user.findUnique({ where: { id } });

		if (!user) {
			return null;
		}

		return UserMapper.toDomain(user);
	}

	public async save(user: User): Promise<void> {
		const data = await UserMapper.toPersistence(user);

		await prisma.user.update({
			where: { id: user.id },
			data,
		});
	}

	public async create(user: User): Promise<void> {
		const data = await UserMapper.toPersistence(user);

		await prisma.user.create({ data });
	}
}
