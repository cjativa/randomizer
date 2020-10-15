import { ORGANIZATION_TABLE } from "./OrganizationDatabaseScripts";

export const RECIPIENT_TABLE: string = "recipient";

export const CREATE_RECIPIENT_TABLE: string = `
  CREATE TABLE IF NOT EXISTS ${RECIPIENT_TABLE} (
    id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name TEXT,
    address TEXT,
    age INTEGER,
    gender VARCHAR(6),
    available BOOLEAN NOT NULL DEFAULT 0,
    organization_id INTEGER NOT NULL,
    FOREIGN KEY (organization_id) REFERENCES ${ORGANIZATION_TABLE}(id)
  )
`;
