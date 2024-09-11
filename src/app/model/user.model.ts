export class User {
  public id: number;
  public name: string;
  public surname: string;
  public username: string;
  public email: string;

  constructor(id: number, name: string, surname: string, username: string, email: string) {
    this.id = id;
    this.name = name;
    this.surname = surname;
    this.username = username;
    this.email = email;
  }
}

export interface UserDto {
  id: number;
  name: string;
  surname: string;
  username: string;
  email: string;
}
