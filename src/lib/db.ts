import { MongoClient } from "mongodb";

export const authDbClient = new MongoClient(
  process.env.AUTH_MONGODB_URI as string,
);
export const authDB = authDbClient.db();

export const dataDbClient = new MongoClient(
  process.env.DATA_MONGODB_URI as string,
);
export const dataDB = authDbClient.db();
