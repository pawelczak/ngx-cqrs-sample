import { Command } from 'ngx-cqrs';

export class LoadAuthorsCommand extends Command {

	constructor() {
		super();
	}

}

export class IncAuthorRatingCommand extends Command {

	constructor(public aggregateId: string) {
		super();
	}

}