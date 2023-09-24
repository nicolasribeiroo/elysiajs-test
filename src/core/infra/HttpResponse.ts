import type { InvalidParamError } from '@infra/validation/errors/InvalidParamError';
import type { InvalidEmailError } from '@modules/users/domain/errors/InvalidEmailError';
import type { InvalidPasswordLengthError } from '@modules/users/domain/errors/InvalidPasswordLengthError.ts';
import type { InvalidUsernameError } from '@modules/users/domain/errors/InvalidUsernameError';
import type { InvalidUserIdError } from '@modules/users/useCases/GetUser/errors/InvalidUserIdError';

export type CustomError =
	| InvalidEmailError
	| InvalidParamError
	| InvalidPasswordLengthError
	| InvalidUserIdError
	| InvalidUsernameError;

export function ok<T>(data: T): Response {
	return new Response(
		JSON.stringify({
			success: true,
			data,
		}),
		{
			status: 200,
			headers: {
				'Content-Type': 'application/json',
			},
		},
	);
}

export function created(): Response {
	return new Response(undefined, {
		status: 201,
	});
}

export function clientError(error: CustomError): Response {
	return new Response(
		JSON.stringify({
			success: false,
			error: {
				code: error.code,
				message: error.message,
			},
		}),
		{
			status: 400,
			headers: {
				'Content-Type': 'application/json',
			},
		},
	);
}

export function notFound(error: CustomError): Response {
	return new Response(
		JSON.stringify({
			success: false,
			error: {
				code: error.code,
				message: error.message,
			},
		}),
		{
			status: 404,
			headers: {
				'Content-Type': 'application/json',
			},
		},
	);
}

export function conflict(error: CustomError): Response {
	return new Response(
		JSON.stringify({
			success: false,
			error: {
				code: error.code,
				message: error.message,
			},
		}),
		{
			status: 409,
			headers: {
				'Content-Type': 'application/json',
			},
		},
	);
}
