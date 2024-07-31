export class User {
  public id: number;
  public name: string;
  public surname: string;
  public username: string;

  constructor(id: number, name: string, surname: string, username: string) {
    this.id = id;
    this.name = name;
    this.surname = surname;
    this.username = username;
  }
}

export interface UserDto {
  id: number;
  name: string;
  surname: string;
  username: string;
}
