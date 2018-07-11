import { Injectable } from '@angular/core';
import { Observable, Operator } from 'rxjs';
import { tap } from 'rxjs/operators';

import { DomainEvent } from './DomainEvent';
import { EventStream } from './EventStream';
import { Subscription } from 'rxjs/index';

@Injectable()
export class EventBus<C = DomainEvent> extends Observable<C> {

	constructor(eventStream?: EventStream) {
		super();

		if (eventStream) {
			this.source = eventStream;
		}

	}

	lift<R>(operator: Operator<C, R>): Observable<R> {
		const observable = new EventBus<R>();
		observable.source = this;
		observable.operator = operator;
		return observable;
	}

}
