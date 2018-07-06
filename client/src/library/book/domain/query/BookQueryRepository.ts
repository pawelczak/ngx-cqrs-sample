import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BookQuery } from './BookQuery';

export abstract class BookQueryRepository {

	selectAllByIds(ids: Array<string>): Observable<Array<BookQuery>> {
		return this.selectAll()
				   .pipe(
					   map((books: Array<BookQuery>) => {
						   return books.filter((book) => {
							   return ids.some((id: string) => book.id === id);
						   });
					   })
				   );
	}

	abstract selectAll(): Observable<Array<BookQuery>>;
}
