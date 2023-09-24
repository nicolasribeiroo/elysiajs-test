import type { User } from '../domain/user';

export interface IUsersRepository {
	create(user: User): Promise<void>;
	exists(email: string): Promise<boolean>;
	findById(id: string): Promise<User | null>;
}
