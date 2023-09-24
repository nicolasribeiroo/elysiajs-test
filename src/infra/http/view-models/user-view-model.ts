import type { User } from '@modules/users/domain/user';

export const UserViewModel = {
	toHTTP(user: User) {
		const { email, id, username } = user;

		return {
			id,
			email: email.value,
			username: username.value,
		};
	},
};
