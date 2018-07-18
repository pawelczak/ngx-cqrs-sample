import { Injectable } from '@angular/core';
import { switchMap, map } from 'rxjs/operators';

import { CommandHandler, EventDispatcher } from 'ngx-cqrs';

import { AuthorAggregate } from '../AuthorAggregate';
import { AuthorResource } from '../AuthorResource';
import { AuthorAggregateRepository } from '../AuthorAggregateRepository';
import { IncAuthorRatingCommand } from './IncAuthorRatingCommand';
import { IncAuthorRatingEvent } from './IncAuthorRatingEvent';


@Injectable()
export class IncAuthorRatingCommandHandler extends CommandHandler {

	constructor(private authorAggregateRepository: AuthorAggregateRepository,
				private authorResource: AuthorResource,
				private eventDispatcher: EventDispatcher) {
		super(IncAuthorRatingCommand.type);
	}

	execute(command: IncAuthorRatingCommand): void {

		const aggregateId = command.aggregateId;

		this.authorAggregateRepository
			.selectOne(aggregateId)
			.pipe(
				switchMap((authorAggregate: AuthorAggregate) => {

					authorAggregate.incRating();

					return this.authorResource
							   .updateRating(authorAggregate)
							   .pipe(
								   map(() => authorAggregate)
							   );
				})
			)
			.subscribe((authorAggregate: AuthorAggregate) => {
				this.authorAggregateRepository.save(authorAggregate);
				this.eventDispatcher.dispatch(new IncAuthorRatingEvent(aggregateId));
			});
	}

}
