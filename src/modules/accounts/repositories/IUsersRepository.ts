import type { User } from '../domain/user/user';

export interface IUsersRepository {
	create(user: User): Promise<void>;
	findById(id: string): Promise<User | null>;
	save(user: User): Promise<void>;
	usernameExists(username: string): Promise<boolean>;
}
