export class Category {
  public id: number;
  public name: string;
  public description: string;
  public color: string;
  public icon: string;

  constructor(
    id: number,
    name: string,
    description: string,
    color: string,
    icon: string
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.color = color;
    this.icon = icon;
  }
}

export interface CategoryDto {
  id: number;
  name: string;
  description: string;
  color: string;
  icon: string;
}
