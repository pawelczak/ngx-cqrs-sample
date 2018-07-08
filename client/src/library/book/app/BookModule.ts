import { ModuleWithProviders, NgModule, Provider } from '@angular/core';

import { CqrsModule } from 'ngx-cqrs/core/CqrsModule';

import { BookCommandModule } from './BookCommandModule';
import { BookQueryModule } from './BookQueryModule';
import { BookResource } from '../domain/command/BookResource';

import { BOOK_STORE_NAME } from '../infrastructure/ngrx/NgrxBookStoreName';
import { NgrxBookConverter } from '../infrastructure/ngrx/NgrxBookConverter';
import { bookReducer } from '../infrastructure/ngrx/BookReducer';
import { RestBookResource } from '../infrastructure/rest/RestBookResource';
import { RestBookConverter } from '../infrastructure/rest/RestBookConverter';


const storeName = 'books';

const providers: Array<Provider> = [
	{
		provide: BOOK_STORE_NAME,
		useValue: storeName
	}, {
		provide: BookResource,
		useClass: RestBookResource
	},
	RestBookConverter,
	NgrxBookConverter
];

@NgModule({
	imports: [
		CqrsModule.forFeature({
			storeName: storeName,
			states: {
				books: bookReducer
			}
		}),

		BookCommandModule.forRoot(),
		BookQueryModule.forRoot()
	]
})
export class BookModule {

	static forRoot(): ModuleWithProviders {
		return {
			ngModule: BookModule,
			providers: providers
		};
	}
}
