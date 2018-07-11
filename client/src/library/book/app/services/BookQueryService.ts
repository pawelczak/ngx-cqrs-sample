import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { filter, switchMap, take } from 'rxjs/operators';

import { DomainEvent, EventBus } from 'ngx-cqrs';

import { BookQueryRepository } from '../../domain/query/BookQueryRepository';
import { BookQuery } from '../../domain/query/BookQuery';
import { BooksFetchedEvent } from '../../domain/command/fetch/BooksFetchedEvent';

@Injectable()
export class BookQueryService {

	private unsubscribe$ = new Subject<void>();

	constructor(private eventBus: EventBus,
				private bookQueryRepository: BookQueryRepository) {
	}

	selectAll(): Observable<Array<BookQuery>> {

		return this.bookQueryRepository.selectAll();

		// return this.eventBus
		// 		   .pipe(
		// 			   filter((event: DomainEvent) => event.constructor.name === BooksFetchedEvent.type),
		// 			   take(1),
		// 			   switchMap(() => {
		// 				   return this.bookQueryRepository.selectAll();
		// 			   })
		// 		   );
	}

	destroy(): void {
		this.unsubscribe$.next();
		this.unsubscribe$.complete();
		this.unsubscribe$ = new Subject<void>();
	}

}
