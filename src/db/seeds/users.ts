import { Knex } from "knex";
import hashPassword from "../../controllers/Auth/utils/hashPassword";
import User from "../models/User";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await User.query().delete();

  // Inserts seed entries
  await User.query().insert(
    [
      { username: "test", password: "testpassword" },
      { username: "piyush", password: "piyushpassword" },
      { username: "elon", password: "elonpassword" },
      { username: "ben", password: "benpassword" },
      { username: "warren", password: "warrenpassword" },
    ].map((user) => ({ ...user, password: hashPassword(user.password) }))
  );
}
