import { Command } from 'ngx-cqrs';

export class FetchBooksCommand extends Command {
	constructor() {
		super();
	}
}
