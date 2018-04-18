import { TechnicalResource } from './TechnicalResource';

export class Position {
	technicalResource: TechnicalResource;
	
	constructor(position: any) {
		this.technicalResource = new TechnicalResource(position.technicalResource);
	}
}