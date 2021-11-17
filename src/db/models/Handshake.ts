import knex from "../knex";
import BaseModel from "./BaseModel";

BaseModel.knex(knex);

export default class Handshake extends BaseModel {
  static tableName = "handshakes";
  static jsonSchema = {
    type: "object",
    required: ["fromUserId", "toUserId"],
    properties: {
      fromUserId: { type: "integer" },
      toUserId: { type: "integer" },
      createdAt: { type: "string" },
    },
  };
  fromUserId: number;
  toUserId: number;
  createdAt: Date;

  static get relationMappings() {
    return {
      fromUser: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: "User",
        join: {
          from: "handshakes.fromUserId",
          to: "users.id",
        },
      },
      toUser: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: "User",
        join: {
          from: "handshakes.toUserId",
          to: "users.id",
        },
      },
    };
  }
}
