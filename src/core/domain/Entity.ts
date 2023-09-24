import { pika } from '@core/infra/Pika';

export abstract class Entity<T> {
	protected readonly _id: string;

	public readonly props: T;

	public constructor(props: T, id?: string) {
		this._id = id ?? pika.gen('user');
		this.props = props;
	}

	public get id(): string {
		return this._id;
	}
}
