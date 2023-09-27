import type { InferPrefixes } from 'pika-id';
import Pika from 'pika-id';

export const pika = new Pika(
	[
		'user',
		'account',
		{
			prefix: 'session',
			secure: true,
		},
	],
	{
		epoch: 1_676_953_708_489,
	},
);

export type Prefixes = InferPrefixes<typeof pika>;
