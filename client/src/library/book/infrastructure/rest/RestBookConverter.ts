import { Injectable } from '@angular/core';

import { BookAggregate } from '../../domain/command/BookAggregate';

@Injectable()
export class RestBookConverter {

	convert(rawBook: any): BookAggregate {
		return new BookAggregate(
			rawBook.id,
			rawBook.title,
			rawBook.content,
			rawBook.pubDate
		);
	}

	convertArray(rawBooks: Array<any>): Array<BookAggregate> {
		return rawBooks.map((rawBook: any) => {
			return this.convert(rawBook);
		});
	}

}
