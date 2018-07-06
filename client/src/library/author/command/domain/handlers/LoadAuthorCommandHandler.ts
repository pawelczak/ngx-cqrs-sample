import { Injectable } from '@angular/core';
import { zip } from 'rxjs';
import { switchMap, map, take } from 'rxjs/operators';

import { AuthorAggregateRepository } from '../AuthorAggregateRepository';
import { AuthorResource } from '../AuthorResource';
import { AuthorAggregate } from '../AuthorAggregate';
import { LoadAuthorsCommand } from '../AuthorCommands';

import { BookAggregateRepository } from '../../../../book/domain/command/BookAggregateRepository';
import { BookAggregate } from '../../../../book/domain/command/BookAggregate';

import { CommandHandler } from '../../../../../util/cqrs/domain/command/CommandHandler';
import { CommandBus } from '../../../../../util/cqrs/domain/command/CommandBus';
import { CommandDispatcher } from '../../../../../util/cqrs/domain/command/CommandDispatcher';

@Injectable()
export class LoadAuthorCommandHandler extends CommandHandler {

	constructor(private commandBus: CommandBus,
				private commandDispatcher: CommandDispatcher,
				private authorAggregateRepository: AuthorAggregateRepository,
				private authorResource: AuthorResource,
				private bookAggregateRepository: BookAggregateRepository) {
		super(LoadAuthorsCommand.type);
	}

	execute(command: LoadAuthorsCommand): void {
		zip(this.authorResource.fetchAll(),
			this.authorResource.fetchAllRatings())
			.pipe(
				switchMap((responses: Array<any>) => {

					const aggregates: Array<AuthorAggregate> = responses[0],
						ratings: { [key: number]: number } = responses[1];

					aggregates.forEach((aggregate: any) => {

						if (ratings[aggregate.id]) {
							aggregate.setRating(ratings[aggregate.id]);
						}

					});

					return this.bookAggregateRepository
							   .selectAll()
							   .pipe(
								   take(1),
								   map((bookAggregates: Array<BookAggregate>) => {

									   aggregates.forEach((aggregate) => {
										   aggregate.setContributions(bookAggregates);
									   });

									   this.authorAggregateRepository.save(aggregates);
								   })
							   );
				})
			)
			.subscribe(() => {
			});
	}
}
