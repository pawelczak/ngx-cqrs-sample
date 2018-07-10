import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { BookQuery } from '../../domain/query/BookQuery';
import { BookQueryService } from '../../app/services/BookQueryService';

@Component({
	selector: 'cqrs-book-list',
	styleUrls: [
		'./BookListComponent.ngx.scss'
	],
	templateUrl: './BookListComponent.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookListComponent implements OnInit, OnDestroy {

	books: Array<BookQuery>;

	private unsubscribe$ = new Subject<void>();

	constructor(private changeDetectorRef: ChangeDetectorRef,
				private bookQueryService: BookQueryService) {
	}

	ngOnInit() {

		this.bookQueryService
			.selectAll()
			.pipe(
				takeUntil(this.unsubscribe$)
			)
			.subscribe((books: Array<BookQuery>) => {
				this.books = books;
				this.changeDetectorRef.detectChanges();
			});
	}

	ngOnDestroy() {
		this.unsubscribe$.next();
		this.unsubscribe$.complete();
	}

}
