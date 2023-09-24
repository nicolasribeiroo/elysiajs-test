export interface Controller<T = any> {
	handle(request: T): Promise<Response>;
}
