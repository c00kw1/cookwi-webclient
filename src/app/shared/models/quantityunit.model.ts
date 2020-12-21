export class QuantityUnit {
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
