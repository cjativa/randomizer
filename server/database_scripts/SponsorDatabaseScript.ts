import { ORGANIZATION_TABLE } from "./OrganizationDatabaseScripts";
import { RECIPIENT_TABLE } from "./RecipientDatabaseScripts";

export const SPONSOR_TABLE: string = "sponsor";

export const CREATE_SPONSOR_TABLE: string = `
  CREATE TABLE IF NOT EXISTS ${SPONSOR_TABLE} (
    id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT,
    phone_number TEXT,
    organization_id INTEGER NOT NULL,
    recipient_id INTEGER,
    FOREIGN KEY (organization_id) REFERENCES ${ORGANIZATION_TABLE}(id),
    FOREIGN KEY (recipient_id) REFERENCES ${RECIPIENT_TABLE}(id)
  )
`;
