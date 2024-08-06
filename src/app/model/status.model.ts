export class Status {
  public id: number;
  public name: string;
  public color: string;

  constructor(id: number, name: string, color: string) {
    this.id = id;
    this.name = name;
    this.color = color;
  }
}

export interface StatusDto {
  id: number;
  name: string;
  color: string;
}
