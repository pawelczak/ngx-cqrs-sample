import { BookContribution } from './BookContribution';

import { BookAggregate } from '../../../book/domain/command/BookAggregate';

export class AuthorAggregate {

	private rating: number = 0;

	constructor(public id: string,
				public name: string,
				public contributions: Array<BookContribution>) {}

	setRating(rating: number): void {
		this.rating = rating;
	}

	incRating(): void {
		this.rating++;
	}

	getRating(): number {
		return this.rating;
	}

	setContributions(books: Array<BookAggregate>): void {

		this.contributions.forEach((contrib: BookContribution) => {
			const book = books.find((book: BookAggregate) => book.getId() === contrib.id);
			if (book) {
				contrib.setBook(book);
			}
		});
	}
}
