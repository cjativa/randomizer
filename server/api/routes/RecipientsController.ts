import { RecipientsHandler } from "database_handlers./RecipientsHandler";
import express from "express";
import { IRecipient } from "../../../shared/interfaces/IRecipient";

const recipientsController = express.Router();

recipientsController.get<{ recipient: IRecipient }, any, any, { org: number }>(
  "/recipientsEligibleForGifts",
  ({ query }, res) => {
    const { org } = query;
    RecipientsHandler.getRecipientsEligibleForGiftsByOrgId(
      org
    ).then((recipient) => res.send(recipient));
  }
);

export default recipientsController;
