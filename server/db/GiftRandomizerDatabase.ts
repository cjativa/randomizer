import { CREATE_ORGANIZATION_TABLE } from "../database_scripts/OrganizationDatabaseScripts";
import { CREATE_RECIPIENT_TABLE } from "../database_scripts/RecipientDatabaseScripts";
import { createPool, Pool } from "mysql";
import { CREATE_SPONSOR_TABLE } from "../database_scripts/SponsorDatabaseScript";

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

  public async init(): Promise<void> {
    await this.initializeTables();
  }

  private async initializeTables(): Promise<void> {
    const connection = GiftRandomizerDatabase.getInstance().getConnection();
    const createOrganizationTable = new Promise((resolve, reject) =>
      connection.query(CREATE_ORGANIZATION_TABLE, (err) =>
        err ? reject(err) : resolve()
      )
    );
    const createSponsorTable = new Promise((resolve, reject) =>
      connection.query(CREATE_SPONSOR_TABLE, (err) =>
        err ? reject(err) : resolve()
      )
    );
    const createRecipientTable = new Promise((resolve, reject) =>
      connection.query(CREATE_RECIPIENT_TABLE, (err) =>
        err ? reject(err) : resolve()
      )
    );
    await Promise.all([
      createOrganizationTable,
      createSponsorTable,
      createRecipientTable,
    ]);
  }
}
