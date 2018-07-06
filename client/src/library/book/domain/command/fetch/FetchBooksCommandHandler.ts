import { Injectable } from '@angular/core';

import { FetchBooksCommand } from './FetchBooksCommand';
import { BookResource } from '../BookResource';
import { BookAggregateRepository } from '../BookAggregateRepository';
import { BookAggregate } from '../BookAggregate';

import { CommandHandler } from '../../../../../util/cqrs/domain/command/CommandHandler';


@Injectable()
export class FetchBooksCommandHandler extends CommandHandler {

	constructor(private bookResource: BookResource,
				private bookAggregateRepository: BookAggregateRepository) {
		super(FetchBooksCommand.type);
	}

	execute(command: FetchBooksCommand): void {

		this.bookResource
			.fetchAll()
			.subscribe((bookAggregates: Array<BookAggregate>) => {
				this.bookAggregateRepository.save(bookAggregates);
			});
	}
}