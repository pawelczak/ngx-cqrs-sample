import { DomainEvent } from 'ngx-cqrs';

export class GreatEvent extends DomainEvent {
	constructor(public data: string) {
		super();
	}
}
