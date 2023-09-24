import type { pika_prefixes } from '@core/infra/Pika';
import { pika } from '@core/infra/Pika';

export abstract class Entity<T> {
	protected readonly _id: string;

	public readonly prefix: typeof pika_prefixes | undefined;

	public readonly props: T;

	public constructor(props: T, prefix: typeof pika_prefixes, id?: string) {
		this._id = id ?? pika.gen(prefix);
		this.props = props;
	}

	public get id(): string {
		return this._id;
	}
}
