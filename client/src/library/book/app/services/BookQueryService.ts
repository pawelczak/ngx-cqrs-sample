import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';

import { EventStore } from 'ngx-cqrs/domain/event/EventStore';

import { BookQueryRepository } from '../../domain/query/BookQueryRepository';
import { BookQuery } from '../../domain/query/BookQuery';
import { BooksFetchedEvent } from '../../domain/command/fetch/BooksFetchedEvent';

@Injectable()
export class BookQueryService {

	private unsubscribe$ = new Subject<void>();

	constructor(private eventStore: EventStore,
				private bookQueryRepository: BookQueryRepository) {
	}

	selectAll(): Observable<Array<BookQuery>> {

		return this.eventStore
				   .waitForEvent(BooksFetchedEvent.type)
				   .pipe(
					   switchMap(() => {
						   return this.bookQueryRepository.selectAll();
					   }),
					   takeUntil(this.unsubscribe$)
				   );
	}

	destroy(): void {
		this.unsubscribe$.next();
		this.unsubscribe$.complete();
		this.unsubscribe$ = new Subject<void>();
	}

}
