import { Inject, NgModule, Optional } from '@angular/core';

import { CommandBus } from '../domain/command/CommandBus';
import { Command } from '../domain/command/Command';
import { CommandHandler } from '../domain/command/CommandHandler';
import { EventHandler } from '../domain/event/EventHandler';
import { EventBus } from '../domain/event/EventBus';
import { COMMAND_HANDLERS } from '../domain/command/COMMAND_HANDLERS';
import { EVENT_HANDLERS } from '../domain/event/EVENT_HANDLERS';

@NgModule({
	imports: []
})
export class CqrsForRootModule {

	constructor(@Optional() @Inject(COMMAND_HANDLERS) private commandHandlers: Array<CommandHandler>,
				@Optional() @Inject(EVENT_HANDLERS) private eventHandlers: Array<EventHandler>,
				private commandBus: CommandBus,
				private eventBus: EventBus) {

		this.initCommandHandlers();
		this.initEventHandlers();
	}

	private initCommandHandlers(): void {
		if (this.commandHandlers) {
			this.commandBus
				.subscribe((command: Command) => {

					this.commandHandlers
						.forEach((handler: CommandHandler) => {
							if (handler.forCommand(command)) {
								handler.execute(command);
							}
						});
				});
		}
	}

	private initEventHandlers(): void {
		if (this.eventHandlers) {
			this.eventBus
				.subscribe((command: Command) => {

					this.eventHandlers
						.forEach((handler: EventHandler) => {
							handler.execute(command);
						});
				});
		}
	}
}
