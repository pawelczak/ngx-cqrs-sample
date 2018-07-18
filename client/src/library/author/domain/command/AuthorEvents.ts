import { DomainEvent } from 'ngx-cqrs';

export class AuthorChangedEvent extends DomainEvent {
	constructor(public data: any) {
		super();
	}
}
