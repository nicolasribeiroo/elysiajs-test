import { prisma } from '@infra/prisma/client';
import type { Account } from '../../domain/account/account';
import { AccountMapper } from '../../mappers/AccountMapper';
import type { IAccountsRepository } from '../IAccountsRepository';

export class PrismaAccountsRepository implements IAccountsRepository {
	public async exists(email: string): Promise<boolean> {
		const account = await prisma.account.findUnique({ where: { email } });

		return Boolean(account);
	}

	public async findByEmail(email: string): Promise<Account | null> {
		const account = await prisma.account.findFirst({ where: { email } });

		if (!account) {
			return null;
		}

		return AccountMapper.toDomain(account);
	}

	public async save(account: Account): Promise<void> {
		const data = await AccountMapper.toPersistence(account);

		await prisma.account.update({
			where: { id: account.id },
			data,
		});
	}

	public async create(account: Account): Promise<void> {
		const data = await AccountMapper.toPersistence(account);

		await prisma.account.create({ data });
	}
}
