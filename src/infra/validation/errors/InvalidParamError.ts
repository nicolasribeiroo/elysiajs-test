export class InvalidParamError extends Error {
	public constructor(param: string) {
		super(`The received value for field "${param}" is invalid.`);
		this.name = 'InvalidParamError';
	}
}
