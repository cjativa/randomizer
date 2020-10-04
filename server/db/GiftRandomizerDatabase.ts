import { Connection, createConnection, createPool, Pool } from "mysql";

export class GiftRandomizerDatabase {
  private static INSTANCE: GiftRandomizerDatabase;
  private readonly connection: Pool;

  private constructor() {
    const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = process.env;
    this.connection = createPool({
      host: DB_HOST || "localhost",
      user: DB_USER || "gift_randomizer_process",
      password: DB_PASSWORD || "password123",
      database: DB_NAME || "gift_randomizer",
      charset: "utf8",
    });
  }

  public static getInstance(): GiftRandomizerDatabase {
    if (!GiftRandomizerDatabase.INSTANCE) {
      this.INSTANCE = new GiftRandomizerDatabase();
    }
    return this.INSTANCE;
  }

  public getConnection(): Pool {
    return this.connection;
  }
}
