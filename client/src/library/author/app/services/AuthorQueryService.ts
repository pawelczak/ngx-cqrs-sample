import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';

import { EventStore } from 'ngx-cqrs/domain/event/EventStore';

import { AuthorQuery } from '../../query/domain/AuthorQuery';
import { AuthorQueryRepository } from '../../query/domain/AuthorQueryRepository';
import { AuthorsLoadedEvent } from '../../command/domain/AuthorEvents';

@Injectable()
export class AuthorQueryService {

	private unsubscribe$ = new Subject<void>();

	constructor(private eventStore: EventStore,
				private authorQueryRepository: AuthorQueryRepository) {}

	selectAll(): Observable<Array<AuthorQuery>> {

		return this.eventStore
				   .waitForEvent(AuthorsLoadedEvent.type)
				   .pipe(
					   switchMap(() => {
						   return this.authorQueryRepository.selectAll();
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
