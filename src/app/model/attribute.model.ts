import { Value } from "./value.model";

export class Attribute {
  public id: number;
  public name: string;
  public description: string;

  constructor(id: number, name: string, description: string) {
    this.id = id;
    this.name = name;
  }
}

export interface AttributeDto {
  id: number;
  name: string;
}

export interface ProductAttributeResponse {
  attribute: Attribute;
  attributeValue: Value;
}
