import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

import { EventStore } from 'ngx-cqrs/domain/event/EventStore';
import { CommandDispatcher } from 'ngx-cqrs';

import { BooksFetchedEvent } from '../../domain/command/fetch/BooksFetchedEvent';
import { FetchBooksCommand } from '../../domain/command/fetch/FetchBooksCommand';
import { BookAggregate } from '../../domain/command/BookAggregate';
import { BookAggregateRepository } from '../../domain/command/BookAggregateRepository';


@Injectable()
export class BookCommandService {

	private unsubscribe$ = new Subject<void>();

	constructor(private eventStore: EventStore,
				private commandDispatcher: CommandDispatcher,
				private bookAggregateRepository: BookAggregateRepository) {
	}

	init(): void {

		const foundEvent = this.eventStore.findEventByType(BooksFetchedEvent.type);

		if (!foundEvent) {
			this.commandDispatcher.dispatch(new FetchBooksCommand());
		}
	}

	selectAll(): Observable<Array<BookAggregate>> {
		return this.bookAggregateRepository.selectAll();
	}

	destroy(): void {
		this.unsubscribe$.next();
		this.unsubscribe$.complete();
		this.unsubscribe$ = new Subject<void>();
	}

}
