import { BookQuery } from '../../../book/domain/query/BookQuery';

import { BookContributionQuery } from './BookContributionQuery';

export class AuthorQuery {

	public desc: string = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum';

	private bookContributions: Array<BookContributionQuery> = [];

	constructor(public id: string,
				public name: string,
				public rating: number,
				public contributions: Array<any> = []) {
	}

	getContributions(): Array<BookContributionQuery> {
		return this.bookContributions;
	}

	setContributions(books: Array<BookQuery>): void {

		this.bookContributions = [];
		this.contributions.forEach((contrib: BookContributionQuery) => {
			const book = books.find((book) => book.id === contrib.id);

			if (book) {
				this.bookContributions.push(book);
			}
		});
	}

	hasContributions(): boolean {
		return this.bookContributions.length > 0;
	}

}
