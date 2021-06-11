import knex from "knex";

const database = knex({client: "pg", connection: "postgresql://postgres:postgres@0.0.0.0/knex"})

export default database;
