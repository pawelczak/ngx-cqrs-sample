import { ModuleWithProviders, NgModule, Provider } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatCardModule, MatListModule, MatProgressSpinnerModule } from '@angular/material';

import { CqrsModule } from 'ngx-cqrs';

import { BookModule } from '../../book/app';


import { AuthorResource } from '../domain/command/AuthorResource';
import { RestAuthorResource } from '../infrastructure/rest/RestAuthorResource';
import { StoreAuthorAggregateRepository } from '../infrastructure/ngrx/StoreAuthorAggregateRepository';
import { RestAuthorConverter } from '../infrastructure/rest/RestAuthorConverter';
import { AuthorAggregateConverter } from '../infrastructure/ngrx/AuthorAggregateConverter';
import { commandHandlerProviders } from '../domain/command/handlers/commandHandlerProviders';
import { authorReducer } from '../infrastructure/ngrx/AuthorReducer';
import { AuthorAggregateRepository } from '../domain/command/AuthorAggregateRepository';
import { AuthorQueryRepository } from '../domain/query/AuthorQueryRepository';
import { StoreAuthorQueryRepository } from '../infrastructure/ngrx/query/StoreAuthorQueryRepository';

import { AuthorListComponent } from '../ui/list/AuthorListComponent';
import { AuthorPanelComponent } from '../ui/list/authorpanel/AuthorPanelComponent';

import { AuthorCommandService } from './services/AuthorCommandService';
import { AuthorQueryService } from './services/AuthorQueryService';




const storeName = 'library';

const providers: Array<Provider> = [
	{
		provide: AuthorResource,
		useClass: RestAuthorResource
	},
	{
		provide: AuthorQueryRepository,
		useClass: StoreAuthorQueryRepository
	},
	{
		provide: AuthorAggregateRepository,
		useClass: StoreAuthorAggregateRepository
	},
	RestAuthorConverter,
	AuthorAggregateConverter,
	...commandHandlerProviders,
	AuthorCommandService,
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
