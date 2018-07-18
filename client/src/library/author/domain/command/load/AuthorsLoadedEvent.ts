import { DomainEvent } from 'ngx-cqrs';

export class AuthorsLoadedEvent extends DomainEvent {
	constructor(public data: any){
		super();
	}
}
