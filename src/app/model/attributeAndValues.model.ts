export class AttributeAndValues {
  public id: number;
  public name: string;
  public values: any[];

  constructor(id: number, name: string, values: any[]) {
    this.id = id;
    this.name = name;
    this.values = values;
  }
}
