export class Value {
  public id: number;
  public idAttribute: number;
  public value: string;

  constructor(id: number, idAttribute: number, value: string) {
    this.id = id;
    this.idAttribute = idAttribute;
    this.value = value;
  }
}

export interface ValueDto {
  id: number;
  idAttribute: number;
  value: string;
}
