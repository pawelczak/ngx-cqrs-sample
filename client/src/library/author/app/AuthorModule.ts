import { ModuleWithProviders, NgModule, Provider } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule, MatCardModule, MatListModule, MatProgressSpinnerModule } from '@angular/material';

import { AuthorListComponent } from '../ui/list/AuthorListComponent';
import { authorReducer } from '../command/infrastructure/store/AuthorReducer';
import { AuthorQueryRepository } from '../query/domain/AuthorQueryRepository';
import { StoreAuthorQueryRepository } from '../query/infrastructure/StoreAuthorQueryRepository';
import { AuthorResource } from '../command/domain/AuthorResource';
import { RestAuthorResource } from '../command/infrastructure/rest/RestAuthorResource';
import { AuthorAggregateRepository } from '../command/domain/AuthorAggregateRepository';
import { StoreAuthorAggregateRepository } from '../command/infrastructure/store/StoreAuthorAggregateRepository';
import { AuthorAggregateConverter } from '../command/infrastructure/store/AuthorAggregateConverter';

import { commandHandlerProviders } from '../command/domain/handlers/commandHandlerProviders';
import { AuthorPanelComponent } from '../ui/list/authorpanel/AuthorPanelComponent';
import { ArticleModule } from '../../article/app/ArticleModule';
import { RestAuthorConverter } from '../command/infrastructure/rest/RestAuthorConverter';
import { CqrsModule } from '../../../util/cqrs/CqrsModule';

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
	...commandHandlerProviders
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

		ArticleModule.forRoot()
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
