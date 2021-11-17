import knex from "../knex";
import BaseModel from "./BaseModel";

BaseModel.knex(knex);

export default class Handshake extends BaseModel {
  static tableName = "handshakes";
  fromUserId: number;
  toUserId: number;
  createdAt: Date;

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
