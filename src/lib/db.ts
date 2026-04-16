import { MongoClient } from "mongodb";

export const authDbClient = new MongoClient(process.env.MONGODB_URI as string);
export const authDB = authDbClient.db("dashboard");

export const dataDbClient = new MongoClient(process.env.MONGODB_URI as string);
export const dataDB = dataDbClient.db("discord_analyzer");
