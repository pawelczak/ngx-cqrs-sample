import { Injectable } from '@angular/core';

import { NgrxAuthorAnemia } from './NgrxAuthorAnemia';

import { BookAggregate } from '../../domain/command/BookAggregate';

@Injectable()
export class NgrxBookConverter {

	convert(book: BookAggregate): NgrxAuthorAnemia {
		return new NgrxAuthorAnemia(book.getId(), book.getTitle(), book.getContent(), book.getYearOfPublication());
	}

	convertBooks(books: Array<BookAggregate>): Array<NgrxAuthorAnemia> {
		return books.map((book: BookAggregate) => this.convert(book));
	}

}
