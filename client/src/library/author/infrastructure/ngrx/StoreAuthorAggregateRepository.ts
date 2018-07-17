import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { EventDispatcher } from 'ngx-cqrs';

import { AuthorAggregate } from '../../domain/command/AuthorAggregate';
import { AuthorChangedEvent, AuthorsLoadedEvent } from '../../domain/command/AuthorEvents';
import { AuthorAggregateRepository } from '../../domain/command/AuthorAggregateRepository';

import { AuthorAggregateConverter } from './AuthorAggregateConverter';
import { AuthorState } from './AuthorState';


@Injectable()
export class StoreAuthorAggregateRepository extends AuthorAggregateRepository {

	constructor(private store: Store<any>,
				private eventDispatcher: EventDispatcher,
				private authorAggregateConverter: AuthorAggregateConverter) {
		super();
	}

	selectOne(aggregateId: string): Observable<AuthorAggregate> {
		return this.selectState()
				   .pipe(
					   map(entities => entities[aggregateId]),
					   map((author: any) => {

						   const authorAggregate = new AuthorAggregate(author.id, author.name, author.contributions);

						   authorAggregate.setRating(author.rating);

						   return authorAggregate;
					   }),
					   take(1)
				   );
	}

	selectAll(): Observable<Array<AuthorAggregate>> {
		return undefined;
	}

	save(author: AuthorAggregate): void;
	save(authors: Array<AuthorAggregate>): void;
	save(arg: any): void {

		if (arg instanceof AuthorAggregate) {
			const author = arg as AuthorAggregate,
				anemicAuthor = this.authorAggregateConverter.toAnemia(author);

			this.eventDispatcher.dispatch(new AuthorChangedEvent(anemicAuthor));
		}

		if (Array.isArray(arg)) {

			const authors = arg as Array<AuthorAggregate>,
				anemicAuthors = this.authorAggregateConverter.toArrayAnemia(authors);

			this.eventDispatcher.dispatch(new AuthorsLoadedEvent(anemicAuthors));
		}
	}

	private selectState(): Observable<AuthorState> {
		return this.store.select(state => state.library.authors.entities);
	}

}
