import { SPONSOR_TABLE } from "database_scripts/SponsorDatabaseScript";
import { GiftRandomizerDatabase } from "db/GiftRandomizerDatabase";

export class SponsorHandler {
  public static createSponsor(
    organizationId: number,
    name: string,
    email: string,
    phoneNumber: string,
    recipientId: number
  ): Promise<any> {
    return new Promise((resolve, reject) =>
      GiftRandomizerDatabase.getInstance()
        .getConnection()
        .query(
          `
      INSERT INTO ${SPONSOR_TABLE} (
        name, email, phone_number, organiation_id, recipient_id
      ) VALUES (?, ?, ?, ?, ?)
      `,
          [name, email, phoneNumber, organizationId, recipientId],
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
