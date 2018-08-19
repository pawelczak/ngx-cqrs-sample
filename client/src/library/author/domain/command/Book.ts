import { Entity } from 'ngx-cqrs';

@Entity()
export class Book {

	constructor(private id: string,
				private title: string) {}

	getId(): string {
		return this.id;
	}

	getTitle(): string {
		return this.title;
	}
}
