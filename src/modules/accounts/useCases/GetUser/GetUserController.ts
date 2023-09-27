import type { Controller } from '@core/infra/Controller';
import type { CustomError } from '@core/infra/CustomError';
import { fail, notFound, ok } from '@core/infra/HttpResponse';
import { UserViewModel } from '@infra/http/view-models/user-view-model';
import type { GetUser } from './GetUser';

interface GetUserControllerRequest {
	headers: {
		authorization?: string;
	};
	params: {
		id: string;
	};
}

export class GetUserController implements Controller {
	public constructor(private readonly getUser: GetUser) {}

	public async handle(request: GetUserControllerRequest): Promise<Response> {
		try {
			console.log(request);
			const { authorization } = request.headers;
			const { id } = request.params;

			const result = await this.getUser.execute({ id, authorization });

			if (result.isLeft()) {
				return notFound(result.value as CustomError);
			} else {
				return ok(UserViewModel.toHTTP(result.value));
			}
		} catch (error: any) {
			return fail(error);
		}
	}
}
