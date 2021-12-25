import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("handshakes", (table) => {
    table.integer("fromUserId").unsigned().notNullable();
    table
      .foreign("fromUserId")
      .references("users.id")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");

    table.integer("toUserId").unsigned().notNullable();
    table
      .foreign("toUserId")
      .references("users.id")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");

    table.unique(["fromUserId", "toUserId"]);

    table.timestamp("createdAt").defaultTo(knex.fn.now()).notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("handshakes");
}
