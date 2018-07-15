import { Injectable } from '@angular/core';
import { Observable, throwError, Subject, of } from 'rxjs';
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

	/**
	 * First tries to event event in the history,
	 * than method waits for future occurrences of the event.
	 */
	waitForEvent(eventType: string): Observable<DomainEvent> {

		// find in a history
		const event = this.findEventByType(eventType);

		if (event) {
			return of(event);
		}

		// wait for future occurrence
		return this.waitForNextEventOccurrence(eventType);
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
