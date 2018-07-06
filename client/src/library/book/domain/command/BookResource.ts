import { Observable } from 'rxjs';

import { BookAggregate } from './BookAggregate';

export abstract class BookResource {

	abstract fetchAll(): Observable<Array<BookAggregate>>;

}
