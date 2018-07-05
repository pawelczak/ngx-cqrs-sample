import { getUuidV4String } from '../../uuid';

export abstract class Streamable {

	private readonly guid: string = getUuidV4String();

	static get type(): string {
		return this.prototype.constructor.name;
	}
}
