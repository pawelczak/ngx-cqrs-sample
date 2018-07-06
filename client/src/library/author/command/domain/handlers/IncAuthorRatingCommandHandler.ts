import { Injectable } from '@angular/core';
import { switchMap, map } from 'rxjs/operators';

import { AuthorAggregate } from '../AuthorAggregate';
import { AuthorResource } from '../AuthorResource';
import { AuthorAggregateRepository } from '../AuthorAggregateRepository';
import { IncAuthorRatingCommand } from '../AuthorCommands';
import { IncAuthorRatingEvent } from '../AuthorEvents';

import { CommandHandler } from '../../../../../util/cqrs/domain/command/CommandHandler';
import { EventDispatcher } from '../../../../../util/cqrs/domain/event/EventDispatcher';

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
