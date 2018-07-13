import { TestBed } from '@angular/core/testing';

import { CqrsModule, DomainEvent } from 'ngx-cqrs';
import { EventStore } from 'ngx-cqrs/domain/event/EventStore';


describe('EventStore -', () => {

	class GreatEvent extends DomainEvent {
	}

	class AwesomeEvent extends DomainEvent {
	}

	describe('waitForNextEventOccurrence -', () => {

		let eventStore: EventStore,
			beforeEvent: DomainEvent,
			afterEvent: DomainEvent;

		beforeEach(() => {
			TestBed.configureTestingModule({
				imports: [
					CqrsModule.forRoot()
				]
			});
			eventStore = TestBed.get(EventStore);
			beforeEvent = new GreatEvent();
			afterEvent = new GreatEvent();
			eventStore.next(beforeEvent);
		});

		it('should wait for future events, by string eventType', (done) => {

			// given
			const requestedEventType = GreatEvent.type;

			// when
			eventStore.waitForNextEventOccurrence(requestedEventType)
					  .subscribe((event: DomainEvent) => {

							  // then
							  expect(event.equalsByType(afterEvent)).toBeTruthy();
							  expect(event.equals(beforeEvent)).toBeFalsy();
						  },
						  null,
						  () => {
							  done();
						  });

			eventStore.next(new AwesomeEvent());
			eventStore.next(afterEvent);
		});

		it('should wait for future events, by DomainEvent eventType', (done) => {

			// when
			eventStore.waitForNextEventOccurrence(afterEvent)
					  .subscribe((event: DomainEvent) => {

							  // then
							  expect(event.equalsByType(afterEvent)).toBeTruthy();
							  expect(event.equals(beforeEvent)).toBeFalsy();
						  },
						  null,
						  () => {
							  done();
						  });

			eventStore.next(new AwesomeEvent());
			eventStore.next(afterEvent);
		});

		it('should throw error for unsupported argument', (done) => {

			// when
			eventStore.waitForNextEventOccurrence({} as any)
					  .subscribe(null, (err) => {

						  // then
						  expect(err).toBeDefined();
						  expect(err instanceof Error).toBeTruthy();
						  done();
					  });

			eventStore.next(new GreatEvent());

		});
	});
});
