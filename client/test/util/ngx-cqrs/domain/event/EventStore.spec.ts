import { TestBed } from '@angular/core/testing';

import { CqrsModule, DomainEvent } from 'ngx-cqrs';
import { EventStore } from 'ngx-cqrs/domain/event/EventStore';


describe('EventStore -', () => {

	class GreatEvent extends DomainEvent {
	}

	class AwesomeEvent extends DomainEvent {
	}

	describe('waitForNextEventOccurrence -', () => {

		let eventStore: EventStore;

		beforeEach(() => {
			TestBed.configureTestingModule({
				imports: [
					CqrsModule.forRoot()
				],
				providers: [
					EventStore
				]
			});
			eventStore = TestBed.get(EventStore);
		});

		it('should wait for future events', (done) => {

			// given
			const beforeEvent = new GreatEvent(),
				afterEvent = new GreatEvent(),
				event = new AwesomeEvent(),
				requestedEventType = GreatEvent.type;

			eventStore.next(beforeEvent);

			// when
			eventStore.waitForNextEventOccurrence(requestedEventType)
					  .subscribe((event: DomainEvent) => {

						  // then
						  expect(event.equalsByType(afterEvent)).toBeTruthy();
						  expect(event.equals(beforeEvent)).toBeFalsy();
						  done();
					  });

			eventStore.next(event);
			eventStore.next(event);
			eventStore.next(afterEvent);
		});


	});

});
