import { BookContribution } from './BookContribution';
import { Book } from './Book';


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

	setContributions(books: Array<Book>): void {

		this.contributions.forEach((contrib: BookContribution) => {
			const book = books.find((book: Book) => book.getId() === contrib.id);
			if (book) {
				contrib.setBook(book);
			}
		});
	}
}
