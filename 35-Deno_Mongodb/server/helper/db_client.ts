import {
  MongoClient,
  Database,
} from "https://deno.land/x/mongo@v0.31.2/mod.ts";

let db: Database;

export async function connect() {
  const client = new MongoClient();

  await client.connect(
    "mongodb+srv://rMongoCluster0:DhF78EmsKgBLNsKw@cluster0.gkvqbxw.mongodb.net/?authMechanism=SCRAM-SHA-1"
  );

  db = client.database("todos-deno");
}

export function getDb() {
  return db;
}
