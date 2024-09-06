import { CategoryDto } from './category.model';
import { StatusDto } from './status.model';
import { TagDto } from './tag.model';
import { UserDto } from './user.model';

export class Todo {
  public id: number;
  public title: string;
  public description: string;
  public imageUrl: string;
  public category: CategoryDto | undefined;
  public categoryId: number;
  public tagId: number;
  public tag: TagDto | undefined;
  public userId: number;
  public user: UserDto | undefined;
  public statusId: number;
  public status: StatusDto | undefined;
  public date: Date;

  constructor(
    id: number,
    title: string,
    description: string,
    categoryId: number,
    tagId: number,
    userId: number,
    statusId: number,
    imageUrl: string,
    date: Date,
    category: CategoryDto,
    tag: TagDto,
    user: UserDto,
    status: StatusDto
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.imageUrl = imageUrl;
    this.categoryId = categoryId;
    this.tagId = tagId;
    this.statusId = statusId;
    this.userId = userId;
    this.date = date;
    this.category = category;
    this.tag = tag;
    this.status = status;
    this.user = user;
  }
}
