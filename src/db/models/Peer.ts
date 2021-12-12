import BaseModel from "./BaseModel";
import User from "./User";

export default class Peer extends BaseModel {
  static tableName = "peers";
  static idColumn = ["userId", "peerId"];

  userId: number;
  user: User;
  peerId: number;
  peer: User;

  static relationMappings = {
    user: {
      relation: BaseModel.BelongsToOneRelation,
      modelClass: "User",
      join: {
        from: "peers.userId",
        to: "users.id",
      },
    },
    peer: {
      relation: BaseModel.BelongsToOneRelation,
      modelClass: "User",
      join: {
        from: "peers.peerId",
        to: "users.id",
      },
    },
  };
}
