import type { Account } from '../domain/account/account';

export interface IAccountsRepository {
	create(account: Account): Promise<void>;
	exists(email: string): Promise<boolean>;
	findByEmail(email: string): Promise<Account | null>;
	save(account: Account): Promise<void>;
}
