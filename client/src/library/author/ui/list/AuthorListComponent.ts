import { Component, OnInit, ChangeDetectionStrategy, Injector, ChangeDetectorRef, OnDestroy, Inject, forwardRef } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AuthorQuery } from '../../domain/query/AuthorQuery';

import { AuthorCommandService } from '../../app/services/AuthorCommandService';
import { AuthorQueryService } from '../../app/services/AuthorQueryService';

@Component({
	selector: 'cqrs-author-list',
	styleUrls: [
		'./AuthorListComponent.ngx.scss'
	],
	templateUrl: './AuthorListComponent.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthorListComponent implements OnInit, OnDestroy {

	authors: Array<AuthorQuery>;

	private unsubscribe$ = new Subject<void>();

	constructor(private injector: Injector,
				private changeDetectorRef: ChangeDetectorRef,
				private authorCommandService: AuthorCommandService,
				private authorQueryService: AuthorQueryService
	) {
	}

	ngOnInit() {

		this.authorQueryService
			.selectAll()
			.pipe(takeUntil(this.unsubscribe$))
			.subscribe((authors: Array<AuthorQuery>) => {
				this.authors = authors;
				this.changeDetectorRef.detectChanges();
			});

		this.authorCommandService.fetch();
	}

	ngOnDestroy() {
		this.unsubscribe$.next();
		this.unsubscribe$.complete();

		this.authorCommandService.destroy();
		this.authorQueryService.destroy();
	}
}
