export default interface IUser {
  id: number;
  username: string;
  createdAt: Date;
}

export interface IUserWithPassword extends IUser {
  password: string;
}
