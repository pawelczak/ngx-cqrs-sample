import { COMMAND_HANDLERS } from 'ngx-cqrs';

import { LoadAuthorCommandHandler } from './LoadAuthorCommandHandler';
import { IncAuthorRatingCommandHandler } from './IncAuthorRatingCommandHandler';

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
