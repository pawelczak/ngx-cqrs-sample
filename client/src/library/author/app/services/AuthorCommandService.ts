import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { CommandDispatcher } from 'ngx-cqrs';
import { EventStore } from 'ngx-cqrs/domain/event/EventStore';


import { LoadAuthorsCommand } from '../../domain/command/load/LoadAuthorsCommand';
import { IncAuthorRatingCommand } from '../../domain/command/rating/IncAuthorRatingCommand';

import { BookCommandService, BooksFetchedEvent } from '../../../book';


@Injectable()
export class AuthorCommandService {

	private unsubscribe$ = new Subject<void>();

	constructor(private eventStore: EventStore,
				private commandDispatcher: CommandDispatcher,
				private bookCommandService: BookCommandService) {
	}

	fetch(): void {

		this.eventStore
			.waitForEvent(BooksFetchedEvent.type)
			.pipe(takeUntil(this.unsubscribe$))
			.subscribe(() => {
				this.commandDispatcher.dispatch(new LoadAuthorsCommand());
			});

		this.bookCommandService.init();
	}

	increaseRating(authorId: string): void {
		this.commandDispatcher.dispatch(new IncAuthorRatingCommand(authorId));
	}

	destroy(): void {
		this.unsubscribe$.next();
		this.unsubscribe$.complete();
		this.unsubscribe$ = new Subject<void>();
	}
}
