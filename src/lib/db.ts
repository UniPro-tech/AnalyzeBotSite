import { type Db, MongoClient } from "mongodb";

// キャッシュ用の変数
let cachedClient: MongoClient | null = null;
let cachedAuthDb: Db | null = null;
let cachedDataDb: Db | null = null;

export function getMongoClient() {
  if (cachedClient) return cachedClient;

  const uri = process.env.MONGODB_URI!;

  cachedClient = new MongoClient(uri);
  return cachedClient;
}

export function getAuthDB() {
  if (cachedAuthDb) return cachedAuthDb;
  cachedAuthDb = getMongoClient().db("dashboard");
  return cachedAuthDb;
}

export function getDataDB() {
  if (cachedDataDb) return cachedDataDb;
  cachedDataDb = getMongoClient().db("discord_analyzer");
  return cachedDataDb;
}
