import type { InvalidParamError } from '@infra/validation/errors/InvalidParamError';
import type { InvalidEmailError } from '@modules/accounts/domain/account/errors/InvalidEmailError';
import type { InvalidPasswordLengthError } from '@modules/accounts/domain/account/errors/InvalidPasswordLengthError.ts';
import type { InvalidTokenError } from '@modules/accounts/domain/user/errors/InvalidTokenError';
import type { InvalidUsernameError } from '@modules/accounts/domain/user/errors/InvalidUsernameError';
import type { InvalidEmailOrPasswordError } from '@modules/accounts/useCases/AuthenticateUser/errors/InvalidEmailOrPasswordError';
import type { InvalidUserIdError } from '@modules/accounts/useCases/GetUser/errors/InvalidUserIdError';
import type { EmailAlreadyExistsError } from '@modules/accounts/useCases/RegisterUser/errors/EmailAlreadyExistsError';
import type { UsernameAlreadyExistsError } from '@modules/accounts/useCases/RegisterUser/errors/UsernameAlreadyExistsError';

export type CustomError =
	| EmailAlreadyExistsError
	| InvalidEmailError
	| InvalidEmailOrPasswordError
	| InvalidParamError
	| InvalidPasswordLengthError
	| InvalidTokenError
	| InvalidUserIdError
	| InvalidUsernameError
	| UsernameAlreadyExistsError;
