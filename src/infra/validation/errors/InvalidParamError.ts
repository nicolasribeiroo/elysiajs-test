export class InvalidParamError extends Error {
	public readonly code = 'invalid_param';

	public constructor(param: string) {
		super(`The received value for field "${param}" is invalid.`);
		this.name = 'InvalidParamError';
	}
}
