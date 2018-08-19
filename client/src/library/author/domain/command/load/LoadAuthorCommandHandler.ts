import { Injectable } from '@angular/core';
import { zip, of } from 'rxjs';
import { switchMap, map, take } from 'rxjs/operators';

import { CommandHandler, CommandBus, CommandDispatcher } from 'ngx-cqrs';

import { AuthorAggregateRepository } from '../AuthorAggregateRepository';
import { AuthorResource } from '../AuthorResource';
import { AuthorAggregate } from '../AuthorAggregate';
import { LoadAuthorsCommand } from './LoadAuthorsCommand';

import { AuthorBookCommandService } from '../../../app/command/AuthorBookCommandService';
import { Book } from '../Book';


@Injectable()
export class LoadAuthorCommandHandler extends CommandHandler {

	constructor(private commandBus: CommandBus,
				private commandDispatcher: CommandDispatcher,
				private authorAggregateRepository: AuthorAggregateRepository,
				private authorResource: AuthorResource,
				private authorBookCommandService: AuthorBookCommandService
	) {
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

					return this.authorBookCommandService
							   .selectAll()
							   .pipe(
								   take(1),
								   map((books: Array<Book>) => {

									   aggregates.forEach((aggregate) => {
										   aggregate.setContributions(books);
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
