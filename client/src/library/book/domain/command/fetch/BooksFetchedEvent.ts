import { DomainEvent } from '../../../../../util/cqrs/domain/event/DomainEvent';

export class BooksFetchedEvent extends DomainEvent {
	constructor(public data: any) {
		super();
	}
}
