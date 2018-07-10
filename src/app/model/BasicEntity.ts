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

    console.log(basicEntity);
    if (basicEntity.entityCreationTimestamp !== null && basicEntity.entityCreationTimestamp !== undefined) {
      this.entityCreationTimestamp = new Date(basicEntity.entityCreationTimestamp);
    }

    this.entityVersion = basicEntity.entityVersion;
    this.id = basicEntity.id;

    if (basicEntity.lastUpdatedTimestamp !== null && basicEntity.lastUpdatedTimestamp !== undefined) {
      this.lastUpdatedTimestamp = new Date(basicEntity.lastUpdatedTimestamp);
    }
  }
}
