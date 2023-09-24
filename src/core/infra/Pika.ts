import Pika from 'pika-id';

export const pika = new Pika([
	'user',
	{
		prefix: 'u',
		description: 'Users',
	},
]);

export const pika_prefixes = pika.prefixes.user.prefix;
