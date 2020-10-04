import { RECIPIENT_TABLE } from "database_scripts/RecipientDatabaseScripts";
import { SPONSOR_TABLE } from "database_scripts/SponsorDatabaseScript";
import { GiftRandomizerDatabase } from "db/GiftRandomizerDatabase";
import { ISponsorAndRecipient } from "../../shared/interfaces/ISponsorAndRecipient";

export class SponsorHandler {
  public static createSponsor(
    organizationId: number,
    name: string,
    email: string,
    phoneNumber: string,
    recipientId: number
  ): Promise<void> {
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

  public static getSponsorsToRecipientsForOrg(
    organizationId: number
  ): Promise<ISponsorAndRecipient[]> {
    return new Promise((resolve, reject) =>
      GiftRandomizerDatabase.getInstance()
        .getConnection()
        .query(
          `
      SELECT s.*, s.id as sponsor_id, r.*, r.id as recipient_id
      FROM ${SPONSOR_TABLE} s
      JOIN ${RECIPIENT_TABLE} r
      ON s.recipient_id = r.id
      WHERE s.organization_id = ?
    `,
          [organizationId],
          (err, results) => {
            if (err) {
              console.log(err.message);
              reject(err.message);
            } else {
              resolve(results);
            }
          }
        )
    );
  }
}
