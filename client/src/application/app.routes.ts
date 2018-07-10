import { Routes } from '@angular/router';

import { AuthorListComponent } from '../library/author/ui/list/AuthorListComponent';
import { BookListComponent } from '../library/book/ui/list/BookListComponent';


export const routes: Routes = [
	{ path: '', redirectTo: 'authors', pathMatch: 'full' },
	{ path: 'authors', component: AuthorListComponent },
	{ path: 'books', component: BookListComponent },
	{ path: '**', redirectTo: 'authors', pathMatch: 'full' }
];
