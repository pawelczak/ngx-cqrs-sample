import { BookAggregate } from '../../../book/domain/command/BookAggregate';

export class BookContribution {

	private book: BookAggregate;

	constructor(public id: string) {}

	setBook(book: BookAggregate): void {
		this.book = book;
	}
}