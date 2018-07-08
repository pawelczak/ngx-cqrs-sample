import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { CqrsStrategy, CqrsModule } from 'ngx-cqrs';

import { routes } from './app.routes';
import { AppComponent } from './app.component';

import { AuthorModule } from '../library/author/app/AuthorModule';

@NgModule({
	imports: [
		BrowserModule,
		RouterModule.forRoot(routes),

		CqrsModule.forRoot(CqrsStrategy.NGRX),

		AuthorModule.forRoot()
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

