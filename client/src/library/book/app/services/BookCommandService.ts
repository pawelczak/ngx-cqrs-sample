import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { EventStore } from 'ngx-cqrs/domain/event/EventStore';
import { CommandDispatcher, DomainEvent } from 'ngx-cqrs';

import { BooksFetchedEvent } from '../../domain/command/fetch/BooksFetchedEvent';
import { FetchBooksCommand } from '../../domain/command/fetch/FetchBooksCommand';


@Injectable()
export class BookCommandService {

	private unsubscribe$ = new Subject<void>();

	constructor(private eventStore: EventStore,
				private commandDispatcher: CommandDispatcher) {
	}

	fetch(): void {

		const events: Array<any> = (this.eventStore as any)._events;

		const foundEvent = events.reverse()
								 .find((event: DomainEvent) => {
									 return event.constructor.name === BooksFetchedEvent.type;
								 });

		if (!foundEvent) {
			this.commandDispatcher.dispatch(new FetchBooksCommand());
		}

	}

	destroy(): void {
		this.unsubscribe$.next();
		this.unsubscribe$.complete();
		this.unsubscribe$ = new Subject<void>();
	}

}
