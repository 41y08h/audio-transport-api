import { Model } from "objection";
import knex from "../knex";

Model.knex(knex);

export default class Handshake extends Model {
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
        relation: Model.BelongsToOneRelation,
        modelClass: __dirname + "/User",
        join: {
          from: "handshakes.fromUserId",
          to: "users.id",
        },
      },
      toUser: {
        relation: Model.BelongsToOneRelation,
        modelClass: __dirname + "/User",
        join: {
          from: "handshakes.toUserId",
          to: "users.id",
        },
      },
    };
  }
}
