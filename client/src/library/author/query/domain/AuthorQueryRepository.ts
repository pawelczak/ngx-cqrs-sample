import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AuthorQuery } from './AuthorQuery';

import { BookQuery } from '../../../book/domain/query/BookQuery';
import { BookQueryRepository } from '../../../book/domain/query/BookQueryRepository';

export abstract class AuthorQueryRepository {

	protected constructor(protected bookQueryRepository: BookQueryRepository) {
	}

	selectAll(): Observable<Array<AuthorQuery>> {

		const books$ = this.bookQueryRepository.selectAll(),
			authors$ = this.selectAuthorsFromState();

		return combineLatest(authors$, books$)
			.pipe(
				map((responses) => {
					const authors: Array<AuthorQuery> = responses[0],
						books: Array<BookQuery> = responses[1];

					authors.forEach((author) => {
						author.setContributions(books);
					});

					return authors;
				})
			);
	}

	abstract selectOne(): Observable<AuthorQuery>;

	abstract selectAuthorsFromState(): Observable<Array<AuthorQuery>>;
}
