import { connect } from "@planetscale/database";

const db = connect({
  host: process.env.DATABASE_HOST,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
});

export default db;
