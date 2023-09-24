import type { DomainError } from '@core/domain/errors/DomainError';

export interface HttpResponse<T> {
	data?: T;
	error?: DomainError;
	success: boolean;
}

export function ok<T>(data: T): HttpResponse<T> {
	return {
		success: true,
		data,
	};
}

export function created(): HttpResponse<void> {
	return {
		success: true,
	};
}

export function clientError(error: Error): HttpResponse<void> {
	return {
		success: false,
		error: {
			code: 'client_error',
			message: error.message,
		},
	};
}

export function notFound(error: Error): HttpResponse<any> {
	return {
		success: false,
		error: {
			code: 'not_found',
			message: error.message,
		},
	};
}

export function conflict(error: Error): HttpResponse<void> {
	return {
		success: false,
		error: {
			code: 'conflict',
			message: error.message,
		},
	};
}
