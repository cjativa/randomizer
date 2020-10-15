import { RECIPIENT_TABLE } from "../database_scripts/RecipientDatabaseScripts";
import { GiftRandomizerDatabase } from "../db/GiftRandomizerDatabase";
import { IRecipient } from "../../shared/interfaces/IRecipient";

export class RecipientsHandler {
  public static createRecipientForOrg(recipient: IRecipient): Promise<void> {
    const { name, address, age, gender, organization_id } = recipient;
    return new Promise((resolve, reject) =>
      GiftRandomizerDatabase.getInstance()
        .getConnection()
        .query(
          `
      INSERT INTO ${RECIPIENT_TABLE} (
        name, address, age, gender, available, organization_id
      ) VALUES (?, ?, ?, ?, ?, ?)
      `,
          [name, address, age, gender, 0, organization_id],
          (err) => {
            if (err) {
              console.log(err);
              reject(err.message);
            } else {
              resolve();
            }
          }
        )
    );
  }

  public static getRecipientsEligibleForGiftsByOrgId(
    orgId: number
  ): Promise<IRecipient> {
    return new Promise((resolve, reject) =>
      GiftRandomizerDatabase.getInstance()
        .getConnection()
        .query(
          `
      SELECT *
      FROM ${RECIPIENT_TABLE}
      WHERE organization_id = ?
      `,
          [orgId],
          (err, results) => {
            if (err) {
              console.log(err.message);
              reject(err.message);
            } else {
              resolve(results[0]);
            }
          }
        )
    );
  }
}
