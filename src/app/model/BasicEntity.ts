/**
 * Abstract super class for all the entities within the application.
 *
 * @author Elías Calderón
 */
export class BasicEntity {
  entityCreationTimestamp: Date;
  entityVersion: number;
  id: string;
  lastUpdatedTimestamp: Date;

  constructor(basicEntity: any) {
	  alert(basicEntity.entityCreationTimestamp.getTime());
    this.entityCreationTimestamp = new Date(basicEntity.entityCreationTimestamp.getTime());
    this.entityVersion = basicEntity.entityVersion;
    this.id = basicEntity.id;
    this.lastUpdatedTimestamp = new Date(basicEntity.lastUpdatedTimestamp.getTime());
  }
}
