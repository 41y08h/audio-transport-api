import knex from "../knex";
import BaseModel from "./BaseModel";

BaseModel.knex(knex);

export default class User extends BaseModel {
  static tableName = "users";
  id: number;
  username: string;
  password: string;
  createdAt: string;
}
