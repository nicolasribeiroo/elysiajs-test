import type { Prefixes } from '@core/infra/Pika';
import { pika } from '@core/infra/Pika';

export abstract class Entity<T> {
	protected readonly _id: string;

	public readonly prefix: Prefixes | undefined;

	public readonly props: T;

	public constructor(props: T, prefix: Prefixes, id?: string) {
		this._id = id ?? pika.gen(prefix);
		this.props = props;
	}

	public get id(): string {
		return this._id;
	}
}
