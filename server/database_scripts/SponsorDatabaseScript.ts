export const SPONSOR_TABLE: string = "sponsor";

export const CREATE_SPONSOR_TABLE: string = `
  CREATE TABLE ${SPONSOR_TABLE} (
    id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT,
    phone_number TEXT,
    organization_id INTEGER NOT NULL,
    recipient_id INTEGER,
  )
`;
