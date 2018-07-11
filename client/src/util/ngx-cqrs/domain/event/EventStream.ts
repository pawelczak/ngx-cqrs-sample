import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { DomainEvent } from 'ngx-cqrs';
import { EventStore } from 'ngx-cqrs/domain/event/EventStore';

@Injectable()
export class EventStream extends Subject<DomainEvent> {

	constructor(private eventStore: EventStore) {
		super();
	}

	next(value: any): void {
		super.next(value);
		this.eventStore.next(value);
	}
}
