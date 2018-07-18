import { COMMAND_HANDLERS } from 'ngx-cqrs';

import { LoadAuthorCommandHandler } from './load/LoadAuthorCommandHandler';
import { IncAuthorRatingCommandHandler } from './rating/IncAuthorRatingCommandHandler';

export const commandHandlerProviders = [
	{
		provide: COMMAND_HANDLERS,
		useClass: LoadAuthorCommandHandler,
		multi: true
	}, {
		provide: COMMAND_HANDLERS,
		useClass: IncAuthorRatingCommandHandler,
		multi: true
	}
];
