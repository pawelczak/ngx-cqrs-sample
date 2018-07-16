import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { BookQuery } from '../../domain/query/BookQuery';
import { BookQueryService } from '../../app/services/BookQueryService';
import { BookCommandService } from '../../app/services/BookCommandService';

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
				private bookQueryService: BookQueryService,
				private bookCommandService: BookCommandService) {
	}

	ngOnInit() {

		this.bookCommandService.fetch();

		this.bookQueryService
			.selectAll()
			.pipe(takeUntil(this.unsubscribe$))
			.subscribe((books: Array<BookQuery>) => {
				this.books = books;
				this.changeDetectorRef.detectChanges();
			});
	}

	ngOnDestroy() {
		this.unsubscribe$.next();
		this.unsubscribe$.complete();

		this.bookQueryService.destroy();
		this.bookCommandService.destroy();
	}

}
