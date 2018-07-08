import { Injectable } from '@angular/core';

import { CommandHandler } from 'ngx-cqrs';

import { FetchBooksCommand } from './FetchBooksCommand';
import { BookResource } from '../BookResource';
import { BookAggregateRepository } from '../BookAggregateRepository';
import { BookAggregate } from '../BookAggregate';

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