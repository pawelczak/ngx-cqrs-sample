import { Routes } from '@angular/router';

import { AuthorListComponent } from '../library/author';
import { BookListComponent } from '../library/book';



export const routes: Routes = [
	{ path: '', redirectTo: 'authors', pathMatch: 'full' },
	{ path: 'authors', component: AuthorListComponent },
	{ path: 'books', component: BookListComponent },
	{ path: '**', redirectTo: 'authors', pathMatch: 'full' }
];
