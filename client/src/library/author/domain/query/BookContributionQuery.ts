import { BookQuery } from '../../../book/domain/query/BookQuery';

export class BookContributionQuery {

	constructor(public id: string,
				public book?: BookQuery) {}
}
