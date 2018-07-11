import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';

import { DomainEvent } from 'ngx-cqrs';

@Injectable()
export class EventStore extends ReplaySubject<DomainEvent> {

	constructor() {
		super();
	}

	next(value: any): void {
		super.next(value);
	}

}
