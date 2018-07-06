import { Injectable } from '@angular/core';

import { BookStoreAnemia } from './BookStoreAnemia';

import { BookAggregate } from '../../domain/command/BookAggregate';

@Injectable()
export class NgrxBookConverter {

	convert(book: BookAggregate): BookStoreAnemia {
		return new BookStoreAnemia(book.getId(), book.getTitle(), book.getContent(), book.getYearOfPublication());
	}

	convertBooks(books: Array<BookAggregate>): Array<BookStoreAnemia> {
		return books.map((book: BookAggregate) => this.convert(book));
	}

}
