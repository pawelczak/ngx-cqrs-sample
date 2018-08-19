import { ModuleWithProviders, NgModule, Provider } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatTableModule } from '@angular/material';

import { CqrsModule } from 'ngx-cqrs';

import { BookCommandModule } from './BookCommandModule';
import { BookQueryModule } from './BookQueryModule';
import { BookResource } from '../domain/command/BookResource';

import { BOOK_STORE_NAME } from '../infrastructure/ngrx/NgrxBookStoreName';
import { NgrxBookConverter } from '../infrastructure/ngrx/NgrxBookConverter';
import { bookReducer } from '../infrastructure/ngrx/BookReducer';
import { RestBookResource } from '../infrastructure/rest/RestBookResource';
import { RestBookConverter } from '../infrastructure/rest/RestBookConverter';

import { BookListComponent } from '../ui/list/BookListComponent';

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
		BrowserModule,
		CqrsModule.forFeature({
			storeName: storeName,
			states: {
				books: bookReducer
			}
		}),
		MatTableModule,

		BookCommandModule.forRoot(),
		BookQueryModule.forRoot()
	],
	declarations: [
		BookListComponent
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
