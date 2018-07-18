import { Injectable } from '@angular/core';

import { AuthorStoreAnemia } from './NgrxAuthorAnemia';
import { AuthorAggregate } from '../../domain/command/AuthorAggregate';


@Injectable()
export class NgrxAuthorAggregateConverter {

	toAnemia(aggregate: AuthorAggregate): AuthorStoreAnemia {
		return new AuthorStoreAnemia(
			aggregate.id,
			aggregate.name,
			aggregate.contributions,
			aggregate.getRating()
		);
	}

	toArrayAnemia(aggregates: Array<AuthorAggregate>): Array<AuthorStoreAnemia> {
		return aggregates.map((aggregate) => this.toAnemia(aggregate));
	}
}