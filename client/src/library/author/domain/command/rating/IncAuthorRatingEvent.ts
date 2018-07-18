import { DomainEvent } from 'ngx-cqrs';

export class IncAuthorRatingEvent extends DomainEvent {
	constructor(public aggregateId: any) {
		super();
	}
}
