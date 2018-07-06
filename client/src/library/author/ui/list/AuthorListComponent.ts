import { Component, OnInit, ChangeDetectionStrategy, Injector, ChangeDetectorRef } from '@angular/core';
import { Subject } from 'rxjs';
import { filter, switchMap, take, takeUntil } from 'rxjs/operators';

import { LoadAuthorsCommand } from '../../command/domain/AuthorCommands';
import { AuthorsLoadedEvent } from '../../command/domain/AuthorEvents';
import { AuthorQueryRepository } from '../../query/domain/AuthorQueryRepository';
import { AuthorQuery } from '../../query/domain/AuthorQuery';

import { FetchBooksCommand } from '../../../book/domain/command/fetch/FetchBooksCommand';
import { BooksFetchedEvent } from '../../../book/domain/command/fetch/BooksFetchedEvent';

import { CommandDispatcher } from '../../../../util/cqrs/domain/command/CommandDispatcher';
import { EventBus } from '../../../../util/cqrs/domain/event/EventBus';
import { DomainEvent } from '../../../../util/cqrs/domain/event/DomainEvent';

@Component({
	selector: 'cqrs-author-list',
	templateUrl: './AuthorListComponent.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthorListComponent implements OnInit {

	authors: Array<AuthorQuery>;

	private unsubscribe$ = new Subject<void>();

	constructor(private injector: Injector,
				private changeDetectorRef: ChangeDetectorRef,
				private commandDispatcher: CommandDispatcher,
				private authorQueryRepository: AuthorQueryRepository,
				private eventBus: EventBus) {
	}

	ngOnInit() {

		this.eventBus
			.pipe(
				filter((event: DomainEvent) => event.constructor.name === AuthorsLoadedEvent.type),
				switchMap(() => {
					return this.authorQueryRepository
							   .selectAll()
							   .pipe(
								   takeUntil(
									   this.unsubscribe$
								   )
							   );
				})
			)
			.subscribe((authors) => {
				this.authors = authors;
				this.changeDetectorRef.detectChanges();
			});

		this.eventBus
			.pipe(
				filter((event: DomainEvent) => event.constructor.name === BooksFetchedEvent.type),
				take(1)
			)
			.subscribe(() => {
				this.commandDispatcher.dispatch(new LoadAuthorsCommand());
			});

		this.commandDispatcher.dispatch(new FetchBooksCommand());

	}

	ngOnDestroy() {
		this.unsubscribe$.next();
		this.unsubscribe$.complete();
	}

}
