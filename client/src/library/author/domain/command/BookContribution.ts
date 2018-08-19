import { Book } from './Book';

export class BookContribution {

	private book: Book;

	constructor(public id: string) {}

	setBook(book: Book): void {
		this.book = book;
	}
}