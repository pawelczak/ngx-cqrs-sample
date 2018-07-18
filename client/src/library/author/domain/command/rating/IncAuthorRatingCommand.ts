import { Command } from 'ngx-cqrs';

export class IncAuthorRatingCommand extends Command {

	constructor(public aggregateId: string) {
		super();
	}
}
