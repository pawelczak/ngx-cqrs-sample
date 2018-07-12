import { Injectable } from '@angular/core';
import { ReplaySubject, Observable } from 'rxjs';

import { DomainEvent } from 'ngx-cqrs';
import { filter, take, takeLast, tap } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';

// TODO don't extend ReplaySubject
@Injectable()
export class EventStore { //extends ReplaySubject<DomainEvent> {

	private domainEvents: Array<DomainEvent> = [];

	private domainEvents$: Subject<DomainEvent> = new Subject<DomainEvent>();

	next(event: DomainEvent): void {

		this.domainEvents.push(event);
		this.domainEvents$.next(event);


		// super.next(event);
	}

	findEventByType(domainEventType: string): DomainEvent {

		const events: Array<DomainEvent> = this.getEvents();

		return events.reverse()
					 .find((event: DomainEvent) => {
						 return event.constructor.name === domainEventType;
					 });
	}

	// waitForEventByType(): Observable<DomainEvent> {
	//
	// 	this.pipe(
	//
	// 	)
	// }

	// waitForNextEventOccurrence(eventType: string): Observable<DomainEvent>;
	waitForNextEventOccurrence(eventType: string): Observable<DomainEvent> {
		return this.domainEvents$
				   .pipe(
					   filter((event) => event.constructor.name === eventType),
					   take(1)
				   );
	}


	private getEvents(): Array<DomainEvent> {
		// return (this as any)._events;
		return this.domainEvents;
	}

}
