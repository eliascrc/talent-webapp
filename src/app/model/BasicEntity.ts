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
    this.entityCreationTimestamp = basicEntity.entityCreationTimestamp;
    this.entityVersion = basicEntity.entityVersion;
    this.id = basicEntity.id;
    this.lastUpdatedTimestamp = basicEntity.lastUpdatedTimestamp;
  }
}
