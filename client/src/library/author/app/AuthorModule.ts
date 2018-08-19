import { ModuleWithProviders, NgModule, Provider } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatCardModule, MatListModule, MatProgressSpinnerModule } from '@angular/material';

import { CqrsModule } from 'ngx-cqrs';

import { BookModule } from '../../book';

import { AuthorResource } from '../domain/command/AuthorResource';
import { RestAuthorResource } from '../infrastructure/rest/RestAuthorResource';
import { NgrxAuthorAggregateRepository } from '../infrastructure/ngrx/command/NgrxAuthorAggregateRepository';
import { RestAuthorConverter } from '../infrastructure/rest/RestAuthorConverter';
import { NgrxAuthorAggregateConverter } from '../infrastructure/ngrx/NgrxAuthorAggregateConverter';
import { commandHandlerProviders } from '../domain/command/commandHandlerProviders';
import { authorReducer } from '../infrastructure/ngrx/AuthorReducer';
import { AuthorAggregateRepository } from '../domain/command/AuthorAggregateRepository';
import { AuthorQueryRepository } from '../domain/query/AuthorQueryRepository';
import { NgrxAuthorQueryRepository } from '../infrastructure/ngrx/query/NgrxAuthorQueryRepository';

import { AuthorListComponent } from '../ui/list/AuthorListComponent';
import { AuthorPanelComponent } from '../ui/list/authorpanel/AuthorPanelComponent';

import { AuthorCommandService } from './services/AuthorCommandService';
import { AuthorQueryService } from './services/AuthorQueryService';
import { AuthorBookCommandService } from './command/AuthorBookCommandService';

const storeName = 'library';

const providers: Array<Provider> = [
	{
		provide: AuthorResource,
		useClass: RestAuthorResource
	},
	{
		provide: AuthorQueryRepository,
		useClass: NgrxAuthorQueryRepository
	},
	{
		provide: AuthorAggregateRepository,
		useClass: NgrxAuthorAggregateRepository
	},
	RestAuthorConverter,
	NgrxAuthorAggregateConverter,
	...commandHandlerProviders,

	AuthorCommandService,
	AuthorBookCommandService,
	AuthorQueryService
];

@NgModule({
	imports: [
		CommonModule,
		MatCardModule,
		MatButtonModule,
		MatListModule,
		MatProgressSpinnerModule,
		CqrsModule.forFeature({
			storeName: storeName,
			states: {
				authors: authorReducer
			}
		}),

		BookModule.forRoot()
	],
	declarations: [
		AuthorListComponent,
		AuthorPanelComponent
	]
})
export class AuthorModule {

	static forRoot(config?: any): ModuleWithProviders {

		let rootProviders = [...providers];

		return {
			ngModule: AuthorModule,
			providers: rootProviders
		};
	}

}
