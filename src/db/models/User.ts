import knex from "../knex";
import BaseModel from "./BaseModel";
import { QueryBuilder } from "objection";

BaseModel.knex(knex);

export default class User extends BaseModel {
  static tableName = "users";
  id: number;
  username: string;
  password: string;
  createdAt: Date;

  static modifiers = {
    defaultSelects(builder: QueryBuilder<User>) {
      return builder.select("id", "username", "createdAt");
    },
  };
}
