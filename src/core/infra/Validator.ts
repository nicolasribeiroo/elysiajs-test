import type { Either } from '@core/logic/Either';
import type { CustomError } from './HttpResponse';

export interface Validator<T = any> {
	validate(data: T): Either<CustomError, null>;
}
