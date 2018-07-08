import { DomainEvent } from 'ngx-cqrs';

export class BooksFetchedEvent extends DomainEvent {
	constructor(public data: any) {
		super();
	}
}
