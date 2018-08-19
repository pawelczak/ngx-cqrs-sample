import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { MatButtonModule, MatToolbarModule } from '@angular/material';

import { CqrsStrategy, CqrsModule } from 'ngx-cqrs';

import { BookModule } from '../library/book';
import { AuthorModule } from '../library/author';

import { routes } from './app.routes';
import { AppComponent } from './app.component';


@NgModule({
	imports: [
		BrowserModule,
		RouterModule.forRoot(routes, { useHash: true }),

		CqrsModule.forRoot(CqrsStrategy.NGRX),

		MatToolbarModule,
		MatButtonModule,

		AuthorModule.forRoot(),
		BookModule.forRoot()
	],
	declarations: [
		AppComponent
	],
	bootstrap: [
		AppComponent
	]
})
export class AppModule {
}

