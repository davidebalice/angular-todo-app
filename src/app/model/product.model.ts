import { CategoryDto } from './category.model';

export class Product {
  public id: number;
  public name: string;
  public sku: string;
  public description: string;
  public imageUrl: string;
  public categoryDto: CategoryDto;
  public idCategory: number;
  public idSubcategory: number;
  public price: number;

  constructor(
    id: number,
    name: string,
    sku: string,
    description: string,
    idCategory: number,
    idSubcategory: number,
    price: number,
    imageUrl: string,
  ) {
    this.id = id;
    this.name = name;
    this.sku = sku;
    this.description = description;
    this.price = price;
    this.imageUrl = imageUrl;
    this.idCategory = idCategory;
    this.idSubcategory = idSubcategory;
  }
}
