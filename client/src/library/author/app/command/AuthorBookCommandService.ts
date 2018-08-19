import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BookAggregate, BookCommandService } from '../../../book';

import { Book } from '../../domain/command/Book';

@Injectable()
export class AuthorBookCommandService {

	constructor(private bookCommandService: BookCommandService) {}

	selectAll(): Observable<Array<Book>> {

		return this.bookCommandService
			.selectAll()
			.pipe(
				map((aggregates) => this.convertBooks(aggregates))
			);
	}

	private convertBooks(bookAggregates: Array<BookAggregate>): Array<Book> {
		return bookAggregates.map((aggregate: BookAggregate) => this.convertBook(aggregate));
	}

	private convertBook(bookAggregate: BookAggregate): Book {
		return new Book(
			bookAggregate.getId(),
			bookAggregate.getTitle()
		);
	}


}