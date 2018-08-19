import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BookQuery, BookQueryService } from '../../../book';

import { AuthorQuery } from './AuthorQuery';


export abstract class AuthorQueryRepository {

	protected constructor(protected bookQueryService: BookQueryService) {
	}

	selectAll(): Observable<Array<AuthorQuery>> {

		const books$ = this.bookQueryService.selectAll(),
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
