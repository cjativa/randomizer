import { RECIPIENT_TABLE } from "../database_scripts/RecipientDatabaseScripts";
import { GiftRandomizerDatabase } from "../db/GiftRandomizerDatabase";
import { IRecipient } from "../../shared/interfaces/IRecipient";

export class RecipientsHandler {
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
