import { Inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { EventDispatcher } from 'ngx-cqrs';

import { BookStoreAnemia } from '../BookStoreAnemia';
import { BOOK_STORE_NAME } from '../NgrxBookStoreName';
import { NgrxBookConverter } from '../NgrxBookConverter';

import { BookAggregateRepository } from '../../../domain/command/BookAggregateRepository';
import { BookAggregate } from '../../../domain/command/BookAggregate';
import { BooksFetchedEvent } from '../../../domain/command/fetch/BooksFetchedEvent';


@Injectable()
export class NgrxBookAggregateRepository extends BookAggregateRepository {

	constructor(private store: Store<any>,
				private eventDispatcher: EventDispatcher,
				private ngrxBookConverter: NgrxBookConverter,
				@Inject(BOOK_STORE_NAME) private storeName: string) {
		super();
	}

	selectAll(): Observable<Array<BookAggregate>> {
		return this.store.select(state => state[this.storeName].books.entities)
				   .pipe(
					   map((entities: { [key: string]: BookStoreAnemia }) => {
						   return Object.keys(entities)
										.map(key => entities[key])
										.map((book: any) => {
											return new BookAggregate(book.id, book.title, book.content, book.yearOfPublication);
										});
					   })
				   )
	}

	save(book: BookAggregate): void;
	save(books: Array<BookAggregate>): void;
	save(arg: any): void {

		if (Array.isArray(arg)) {

			const books = arg as Array<BookAggregate>,
				anemicBooks = this.ngrxBookConverter.convertBooks(books);

			this.eventDispatcher.dispatch(new BooksFetchedEvent(anemicBooks));
		}

	}

}
