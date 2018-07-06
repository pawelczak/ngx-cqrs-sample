import { Inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BookStoreAnemia } from '../BookStoreAnemia';
import { BOOK_STORE_NAME } from '../NgrxBookStoreName';

import { BookQueryRepository } from '../../../domain/query/BookQueryRepository';
import { BookQuery } from '../../../domain/query/BookQuery';

@Injectable()
export class NgrxBookQueryRepository extends BookQueryRepository {

	constructor(private store: Store<any>,
				@Inject(BOOK_STORE_NAME) private storeName: string) {
		super();
	}

	selectAll(): Observable<Array<BookQuery>> {
		return this.store.select(state => state[this.storeName].books.entities)
			.pipe(
				map((entities: { [key: string]: BookStoreAnemia }) => {
					return Object.keys(entities)
								 .map(id => entities[id])
								 .map((book: any) => {
									 return new BookQuery(book.id, book.title);
								 });
				})
			)
	}

}
