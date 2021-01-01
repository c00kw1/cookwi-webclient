export class QuantityUnit {
  constructor() {
    this.id = '';
    this.name = '';
    this.acronym = '';
  }
  public id: string;
  public name: string;
  public acronym: string;
  public type: UnitType;
}

export enum UnitType {
  Liquid,
  Weight,
  Size,
  Container,
}
