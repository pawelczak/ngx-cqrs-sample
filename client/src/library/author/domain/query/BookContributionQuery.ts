import { BookQuery } from '../../../book';

export class BookContributionQuery {

	constructor(public id: string,
				public book?: BookQuery) {}
}
