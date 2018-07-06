import { Observable } from 'rxjs';

import { BookAggregate } from './BookAggregate';

export abstract class BookAggregateRepository {

	abstract selectAll(): Observable<Array<BookAggregate>>;

	abstract save(book: BookAggregate): void;
	abstract save(books: Array<BookAggregate>): void;
}
