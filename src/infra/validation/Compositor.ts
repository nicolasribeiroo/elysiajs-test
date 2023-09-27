import type { CustomError } from '@core/infra/CustomError';
import type { Validator } from '@core/infra/Validator';
import type { Either } from '@core/logic/Either';
import { right } from '@core/logic/Either';

export class ValidatorCompositor<T = any> implements Validator<T> {
	public constructor(private readonly validators: Validator<T>[]) {}

	public validate(input: T): Either<CustomError, null> {
		for (const validator of this.validators) {
			const error = validator.validate(input);
			if (error !== null) return error;
		}

		return right(null);
	}
}
