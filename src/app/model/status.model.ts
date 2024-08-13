export class Status {
  public id: number;
  public name: string;
  public color: string;
  public icon: number;

  constructor(id: number, name: string, color: string, icon: number) {
    this.id = id;
    this.name = name;
    this.color = color;
    this.icon = icon;
  }
}

export interface StatusDto {
  id: number;
  name: string;
  color: string;
  icon: number;
}
