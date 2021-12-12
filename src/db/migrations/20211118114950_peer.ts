import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("peers", (table) => {
    table.integer("userId").notNullable();
    table.foreign("userId").references("users.id");
    table.integer("peerId").notNullable();
    table.foreign("peerId").references("users.id");
    table.unique(["userId", "peerId"]);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("peers");
}
