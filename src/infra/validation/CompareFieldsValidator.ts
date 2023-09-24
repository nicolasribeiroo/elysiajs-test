import type { Validator } from '@core/infra/Validator';
import type { Either } from '@core/logic/Either';
import { left, right } from '@core/logic/Either';
import { InvalidParamError } from './errors/InvalidParamError';

export class CompareFieldsValidator<T = any> implements Validator<T> {
	public constructor(
		private readonly field: string,
		private readonly filedToCompare: string,
	) {}

	public validate(data: T): Either<InvalidParamError, null> {
		const dataObject = data as { [key: string]: any };
		if (dataObject[this.field] !== dataObject[this.filedToCompare]) {
			return left(new InvalidParamError(dataObject[this.filedToCompare]));
		}

		return right(null);
	}
}
