import { Knex } from "knex";
import User from "../models/User";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await User.query().delete();

  // Inserts seed entries
  await User.query().insert([
    { username: "piyush", password: "starship%tree%coalesce" },
    { username: "elon", password: "starlink%tree%coalesce" },
    { username: "ben", password: "stocks%tree%coalesce" },
    { username: "warren", password: "cococola%tree%coalesce" },
  ]);
}
