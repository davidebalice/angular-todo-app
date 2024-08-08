import { CategoryDto } from './category.model';

export class Todo {
  public id: number;
  public title: string;
  public description: string;
  public imageUrl: string;
  public categoryDto: CategoryDto | undefined;
  public categoryId: number;
  public tagId: number;
  public statusId: number;
  public createdAt: Date;

  constructor(
    id: number,
    title: string,
    description: string,
    categoryId: number,
    tagId: number,
    statusId: number,
    imageUrl: string,
    createdAt: Date
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.imageUrl = imageUrl;
    this.categoryId = categoryId;
    this.tagId = tagId;
    this.statusId = statusId;
    this.createdAt = createdAt;
  }
}
