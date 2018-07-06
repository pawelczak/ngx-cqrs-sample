import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

import { BookResource } from '../../domain/command/BookResource';
import { BookAggregate } from '../../domain/command/BookAggregate';
import { RestBookConverter } from './RestBookConverter';

import * as rawBooks from './books.json';

@Injectable()
export class RestBookResource extends BookResource {

	constructor(private restBookConverter: RestBookConverter) {
		super();
	}

	fetchAll(): Observable<Array<BookAggregate>> {
		return of(
				this.restBookConverter.convertArray((rawBooks as any).books)
			)
			.pipe(
				delay(3000)
			);
	}
}