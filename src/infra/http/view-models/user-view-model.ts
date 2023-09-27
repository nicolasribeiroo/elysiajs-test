import type { User } from '@modules/accounts/domain/user/user';

export const UserViewModel = {
	toHTTP(user: User) {
		const { id, username } = user;

		return {
			id,
			username: username.value,
		};
	},
};
