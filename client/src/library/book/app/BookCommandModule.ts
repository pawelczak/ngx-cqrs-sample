import { ModuleWithProviders, NgModule } from '@angular/core';

import { COMMAND_HANDLERS } from 'ngx-cqrs';

import { BookAggregateRepository } from '../domain/command/BookAggregateRepository';
import { FetchBooksCommandHandler } from '../domain/command/fetch/FetchBooksCommandHandler';

import { NgrxBookAggregateRepository } from '../infrastructure/ngrx/command/NgrxBookAggregateRepository';


const providers = [
	{
		provide: BookAggregateRepository,
		useClass: NgrxBookAggregateRepository
	}, {
		provide: COMMAND_HANDLERS,
		useClass: FetchBooksCommandHandler,
		multi: true
	}
];

@NgModule({
	imports: []
})
export class BookCommandModule {

	static forRoot(): ModuleWithProviders {
		return {
			ngModule: BookCommandModule,
			providers: providers
		};
	}
}
