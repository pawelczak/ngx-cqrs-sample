import { Inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ArticleStoreAnemia } from '../ArticleStoreAnemia';
import { ARTICLE_STORE_NAME } from '../NgrxArticleStoreName';
import { NgrxArticleConverter } from '../NgrxArticleConverter';

import { ArticleAggregateRepository } from '../../../domain/command/ArticleAggregateRepository';
import { ArticleAggregate } from '../../../domain/command/ArticleAggregate';
import { ArticlesFetchedEvent } from '../../../domain/command/fetch/ArticlesFetchedEvent';

import { EventDispatcher } from '../../../../../util/cqrs/domain/event/EventDispatcher';

@Injectable()
export class NgrxArticleAggregateRepository extends ArticleAggregateRepository {

	constructor(private store: Store<any>,
				private eventDispatcher: EventDispatcher,
				private ngrxArticleConverter: NgrxArticleConverter,
				@Inject(ARTICLE_STORE_NAME) private storeName: string) {
		super();
	}

	selectAll(): Observable<Array<ArticleAggregate>> {
		return this.store.select(state => state[this.storeName].articles.entities)
				   .pipe(
					   map((entities: { [key: string]: ArticleStoreAnemia }) => {
						   return Object.keys(entities)
										.map(key => entities[key])
										.map((article: any) => {
											return new ArticleAggregate(article.id, article.title, article.content, article.yearOfPublication);
										});
					   })
				   )
	}

	save(article: ArticleAggregate): void;
	save(articles: Array<ArticleAggregate>): void;
	save(arg: any): void {

		if (Array.isArray(arg)) {

			const articles = arg as Array<ArticleAggregate>,
				anemicArticles = this.ngrxArticleConverter.convertArticles(articles);

			this.eventDispatcher.dispatch(new ArticlesFetchedEvent(anemicArticles));
		}

	}

}
