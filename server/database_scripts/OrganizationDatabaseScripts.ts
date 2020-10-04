export const ORGANIZATION_TABLE: string = "organization";

export const CREATE_ORGANIZATION_TABLE: string = `
CREATE TABLE ${ORGANIZATION_TABLE} (
  id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name TEXT,
  email_address TEXT,
  password TEXT
)
`;
