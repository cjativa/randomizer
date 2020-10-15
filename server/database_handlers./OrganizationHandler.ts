import { ORGANIZATION_TABLE } from "../database_scripts/OrganizationDatabaseScripts";
import { GiftRandomizerDatabase } from "../db/GiftRandomizerDatabase";

export class OrganizationHandler {
  public static createOrganization(
    organizationName: string,
    emailAddress: string,
    password: string
  ): Promise<void> {
    return new Promise((resolve, reject) =>
      GiftRandomizerDatabase.getInstance()
        .getConnection()
        .query(
          `
      INSERT INTO ${ORGANIZATION_TABLE} (
        name, email_address, password
      ) ? VALUES (?, ?, ?)`,
          [organizationName, emailAddress, password],
          (err) => {
            if (err) {
              console.log(err.message);
              reject(err.message);
            } else {
              resolve();
            }
          }
        )
    );
  }
}
