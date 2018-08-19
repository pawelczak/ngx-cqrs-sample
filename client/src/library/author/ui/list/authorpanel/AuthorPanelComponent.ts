import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

import { AuthorCommandService} from '../../../app/services/AuthorCommandService';

import { AuthorQuery} from '../../../domain/query/AuthorQuery';


@Component({
	selector: 'cqrs-author-panel',
	styleUrls: [
		'./AuthorPanelComponent.ngx.scss'
	],
	templateUrl: './AuthorPanelComponent.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthorPanelComponent {

	@Input()
	author: AuthorQuery;

	showMore: boolean = false;

	constructor(private authorCommandService: AuthorCommandService) {
	}

	increaseAuthorsRating(authorId: string): void {
		this.authorCommandService.increaseRating(authorId);
	}

	showContributions(): void {
		this.showMore = true;
	}

	hideContributions(): void {
		this.showMore = false;
	}

}
