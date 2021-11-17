import { Knex } from "knex";

const config: Record<typeof process.env.NODE_ENV, Knex.Config> = {
  development: {
    client: "pg",
    connection: {
      connectionString: process.env.DATABASE_URL,
      ssl: false,
    },
    migrations: { directory: "./src/db/migrations" },
    seeds: { directory: "./src/db/seeds" },
    debug: true,
  },
  production: {
    client: "pg",
    connection: {
      connectionString: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false,
      },
    },
    migrations: { directory: "./src/db/migrations" },
  },
};

export default config;
