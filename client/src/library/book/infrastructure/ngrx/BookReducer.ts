import { BookState } from './BookState';
import { NgrxAuthorAnemia } from './NgrxAuthorAnemia';

import { BooksFetchedEvent } from '../../domain/command/fetch/BooksFetchedEvent';

const defaultState = new BookState();

export function bookReducer(state: BookState = defaultState, action: any): BookState {

	switch (action.type) {

		case BooksFetchedEvent.type:

			const books = action.payload.data as Array<NgrxAuthorAnemia>;

			let booksAsEntities = {};

			books.forEach((book: NgrxAuthorAnemia) => {
				booksAsEntities[book.id] = book;
			});

			return Object.assign(new BookState(), state, { entities: booksAsEntities });

		default:
			return state;

	}

}
