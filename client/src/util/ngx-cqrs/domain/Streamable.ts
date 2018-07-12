import { getUuidV4String } from '../util/uuid';

export abstract class Streamable {

	private readonly guid: string = getUuidV4String();

	static get type(): string {
		return this.prototype.constructor.name;
	}

	equalsByType(s: Streamable): boolean {
		return this.constructor.name === s.constructor.name;
	}

	equals(s: Streamable): boolean {
		return (this.constructor.name === s.constructor.name) && (this.guid === s.guid);
	}
}
