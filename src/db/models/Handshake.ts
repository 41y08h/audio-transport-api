import knex from "../knex";
import BaseModel from "./BaseModel";
import User from "./User";

BaseModel.knex(knex);

export default class Handshake extends BaseModel {
  static tableName = "handshakes";
  fromUserId: number;
  toUserId: number;
  createdAt: Date;
  fromUser: User;
  toUser: User;

  static relationMappings = {
    fromUser: {
      relation: BaseModel.BelongsToOneRelation,
      modelClass: "User",
      join: { from: "handshakes.fromUserId", to: "users.id" },
    },
    toUser: {
      relation: BaseModel.BelongsToOneRelation,
      modelClass: "User",
      join: { from: "handshakes.toUserId", to: "users.id" },
    },
  };
}
