import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { routes } from './app.routes';
import { AppComponent } from './app.component';

import { AuthorModule } from '../library/author/app/AuthorModule';

import { CqrsModule } from '../util/cqrs/CqrsModule';
import { CqrsStrategy } from '../util/cqrs/CqrsStrategy';

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

