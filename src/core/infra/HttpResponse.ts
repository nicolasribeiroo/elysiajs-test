import type { CustomError } from './CustomError';

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

export function unauthorized(): Response {
	return new Response(
		JSON.stringify({
			success: false,
			error: {
				code: 'no_permission',
				message: 'You do not have permission to access this resource',
			},
		}),
		{
			status: 401,
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

export function fail(error: CustomError): Response {
	console.log(error);

	return new Response(
		JSON.stringify({
			success: false,
			error: {
				code: error.code,
				message: error.message,
			},
		}),
		{
			status: 500,
			headers: {
				'Content-Type': 'application/json',
			},
		},
	);
}
