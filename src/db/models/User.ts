import knex from "../knex";
import BaseModel from "./BaseModel";

BaseModel.knex(knex);

export default class User extends BaseModel {
  static tableName = "users";
  static jsonSchema = {
    type: "object",
    required: ["username", "password"],
    properties: {
      id: { type: "integer" },
      username: { type: "string" },
      password: { type: "string" },
      createdAt: { type: "string" },
    },
  };

  id: number;
  username: string;
  password: string;
  createdAt: string;
}
