import { Injectable } from '@angular/core';
import { Observable, throwError, Subject, merge } from 'rxjs';
import { filter, take } from 'rxjs/operators';

import { DomainEvent } from 'ngx-cqrs';

@Injectable()
export class EventStore {

	private domainEvents: Array<DomainEvent> = [];

	private domainEvents$: Subject<DomainEvent> = new Subject<DomainEvent>();

	next(event: DomainEvent): void {
		this.domainEvents.push(event);
		this.domainEvents$.next(event);
	}

	findEventByType(eventType: string): DomainEvent {

		const events: Array<DomainEvent> = this.getEvents();

		return events.reverse()
					 .find((event: DomainEvent) => {
						 return event.constructor.name === eventType;
					 });
	}

	// waitForEventByType(): Observable<DomainEvent> {
	//
	// 	this.pipe(
	//
	// 	)
	// }

	waitForEvent(eventType: string): Observable<DomainEvent> {

		const eventFound$ = new Subject<DomainEvent>();

		// wait for future occurrence

		const futureOccurrencesOfEvent$ = this.waitForNextEventOccurrence(eventType);

		const a$ = merge(
			eventFound$,
			futureOccurrencesOfEvent$
		);

		// find in a history

		const event = this.findEventByType(eventType);

		if (event) {
			eventFound$.next(event);
		}

		return a$;
	}

	waitForNextEventOccurrence(eventType: string): Observable<DomainEvent>;
	waitForNextEventOccurrence(event: DomainEvent): Observable<DomainEvent>;
	waitForNextEventOccurrence(arg: string | DomainEvent): Observable<DomainEvent> {

		let eventType: string;

		if (arg instanceof DomainEvent) {
			eventType = arg.constructor.name;
		} else if (typeof arg === 'string') {
			eventType = arg;
		} else {
			return throwError(new Error('Unsupported argument type.'));
		}

		return this.domainEvents$
				   .pipe(
					   filter((event) => event.constructor.name === eventType),
					   take(1)
				   );
	}

	private getEvents(): Array<DomainEvent> {
		return this.domainEvents;
	}

}
