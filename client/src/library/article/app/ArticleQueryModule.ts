import { ModuleWithProviders, NgModule } from '@angular/core';

import { ArticleQueryRepository } from '../domain/query/ArticleQueryRepository';

import { NgrxArticleQueryRepository } from '../infrastructure/ngrx/query/NgrxArticleQueryRepository';

const providers = [
	{
		provide: ArticleQueryRepository,
		useClass: NgrxArticleQueryRepository
	}
];

@NgModule({
	imports: []
})
export class ArticleQueryModule {

	static forRoot(): ModuleWithProviders {
		return {
			ngModule: ArticleQueryModule,
			providers: providers
		};
	}
}
