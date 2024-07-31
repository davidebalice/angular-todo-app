export class Subcategory {
  public id: number;
  public idCategory: number;
  public name: string;
  public description: string;

  constructor(
    id: number,
    idCategory: number,
    name: string,
    description: string
  ) {
    this.id = id;
    this.idCategory = idCategory;
    this.name = name;
    this.description = description;
  }
}

export interface SubcategoryDto {
  id: number;
  idCategory: number;
  name: string;
  description: string;
  bg: string;
  color: string;
}
