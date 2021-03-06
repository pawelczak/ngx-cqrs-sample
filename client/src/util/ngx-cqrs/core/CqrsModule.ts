import { ModuleWithProviders, NgModule, Provider } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { CqrsForFeatureModule } from './CqrsForFeatureModule';
import { CqrsForRootModule } from './CqrsForRootModule';
import { CqrsModuleConfig } from './CqrsModuleConfig';
import { CqrsStrategy } from './CqrsStrategy';

import { CommandStream } from '../domain/command/CommandStream';
import { FILTERED_COMMAND_STREAM } from '../domain/command/FilteredCommandsStream';
import { CommandBus } from '../domain/command/CommandBus';
import { CommandDispatcher } from '../domain/command/CommandDispatcher';
import { COMMAND_HANDLERS } from '../domain/command/COMMAND_HANDLERS';
import { LogCommandHandler } from '../domain/command/LogCommandHandler';
import { EventBus } from '../domain/event/EventBus';
import { EventDispatcher } from '../domain/event/EventDispatcher';
import { EventStream } from '../domain/event/EventStream';
import { EVENT_HANDLERS } from '../domain/event/EVENT_HANDLERS';

import { NgrxEventHandler } from '../infrastructure/ngrx/event/NgrxEventHandler';
import { NgrxLoggerCommandHandler } from '../infrastructure/ngrx/command/NgrxLoggerCommandHandler';
import { EventStore } from 'ngx-cqrs/domain/event/EventStore';

const handlers: Array<Provider> = [
	// {
	// 	provide: COMMAND_HANDLERS,
	// 	useClass: LogCommandHandler,
	// 	multi: true
	// }
];

const providers = [
	{ provide: FILTERED_COMMAND_STREAM, useExisting: CommandStream },
	CommandBus,
	CommandStream,
	CommandDispatcher,
	EventBus,
	EventStream,
	EventStore,
	EventDispatcher,
	...handlers
];

const ngrxProviders: Array<Provider> = [
	{
		provide: COMMAND_HANDLERS,
		useClass: NgrxLoggerCommandHandler,
		multi: true
	}, {
		provide: EVENT_HANDLERS,
		useClass: NgrxEventHandler,
		multi: true
	}
];

const restProviders: Array<Provider> = [];

function populateProviders(strategies: CqrsStrategy = CqrsStrategy.NONE): Array<Provider> {

	let strategyProviders: Array<Provider> = [...providers];

	if (strategies & CqrsStrategy.NGRX) {
		strategyProviders = [...strategyProviders, ...ngrxProviders];
	}

	if (strategies & CqrsStrategy.REST) {
		strategyProviders = [...strategyProviders, ...restProviders];
	}

	return strategyProviders;
}


@NgModule({
	imports: []
})
export class CqrsModule {

	static forRoot(strategies: CqrsStrategy = CqrsStrategy.NONE): ModuleWithProviders {

		let imports: Array<any> = [
			CqrsForRootModule
		];

		if (strategies & CqrsStrategy.NGRX) {
			imports = [
				StoreModule.forRoot({}),
				StoreDevtoolsModule.instrument({
					maxAge: 50
				}),
				...imports
			];
		}

		@NgModule({
			imports: imports
		})
		class DynamicCqrsForRootModule {
		}

		return {
			ngModule: DynamicCqrsForRootModule,
			providers: populateProviders(strategies)
		};
	}

	static forFeature(config: CqrsModuleConfig): ModuleWithProviders {

		@NgModule({
			imports: [
				StoreModule.forFeature(config.storeName, config.states),
				CqrsForFeatureModule
			]
		})
		class DynamicCqrsForFeatureModule {
		}

		return {
			ngModule: DynamicCqrsForFeatureModule,
			providers: []
		};
	}
}
