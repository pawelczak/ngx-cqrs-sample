import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { CommandDispatcher } from 'ngx-cqrs';
import { EventStore } from 'ngx-cqrs/domain/event/EventStore';

import { BookCommandService, BooksFetchedEvent } from '../../../book/app';

import { LoadAuthorsCommand } from '../../command/domain/AuthorCommands';

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

		this.bookCommandService.fetch();
	}

	destroy(): void {
		this.unsubscribe$.next();
		this.unsubscribe$.complete();
		this.unsubscribe$ = new Subject<void>();
	}
}
