import { ModuleWithProviders, NgModule } from '@angular/core';

import { BookQueryRepository } from '../domain/query/BookQueryRepository';

import { NgrxBookQueryRepository } from '../infrastructure/ngrx/query/NgrxBookQueryRepository';

import { BookQueryService } from './services/BookQueryService';

const providers = [
	{
		provide: BookQueryRepository,
		useClass: NgrxBookQueryRepository
	},
	BookQueryService
];

@NgModule({
	imports: []
})
export class BookQueryModule {

	static forRoot(): ModuleWithProviders {
		return {
			ngModule: BookQueryModule,
			providers: providers
		};
	}
}
