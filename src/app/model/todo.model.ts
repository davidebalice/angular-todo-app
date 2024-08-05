import { CategoryDto } from './category.model';

export class Todo {
  public id: number;
  public name: string;
  public description: string;
  public imageUrl: string;
  public categoryDto: CategoryDto | undefined;
  public idCategory: number;
  public idSubcategory: number;
  public createdAt: Date;

  constructor(
    id: number,
    name: string,
    description: string,
    idCategory: number,
    idSubcategory: number,
    imageUrl: string,
    createdAt: Date
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.imageUrl = imageUrl;
    this.idCategory = idCategory;
    this.idSubcategory = idSubcategory;
    this.createdAt = createdAt;
  }
}
