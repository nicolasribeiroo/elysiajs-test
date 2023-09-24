import type { Controller } from '@core/infra/Controller';
import type { HttpResponse } from '@core/infra/HttpResponse';
import { notFound, ok } from '@core/infra/HttpResponse';
import type { User } from '@modules/users/domain/user';
import type { GetUser } from './GetUser';

interface GetUserControllerRequest {
	params: {
		id: string;
	};
}

export class GetUserController implements Controller {
	public constructor(private readonly getUser: GetUser) {}

	public async handle(request: GetUserControllerRequest): Promise<HttpResponse<User>> {
		const { id } = request.params;

		const result = await this.getUser.execute({ id });

		if (result.isLeft()) {
			return notFound(result.value);
		}

		return ok(result.value);
	}
}
