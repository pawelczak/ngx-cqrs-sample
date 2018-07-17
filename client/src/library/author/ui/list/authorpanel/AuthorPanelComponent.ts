import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

import { CommandDispatcher } from 'ngx-cqrs';

import { AuthorQuery } from '../../../domain/query/AuthorQuery';
import { IncAuthorRatingCommand } from '../../../domain/command/AuthorCommands';

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

	constructor(private commandDispatcher: CommandDispatcher) {
	}

	increaseAuthorsRating(authorId: string): void {
		this.commandDispatcher.dispatch(new IncAuthorRatingCommand(authorId));
	}

	showContributions(): void {
		this.showMore = true;
	}

	hideContributions(): void {
		this.showMore = false;
	}

}