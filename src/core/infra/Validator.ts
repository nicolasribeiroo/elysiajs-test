import type { Either } from '@core/logic/Either';
import type { CustomError } from './CustomError';

export interface Validator<T = any> {
	validate(data: T): Either<CustomError, null>;
}
