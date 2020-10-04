import { RecipientsHandler } from "database_handlers./RecipientsHandler";
import { SponsorHandler } from "database_handlers./SponsorHandler";
import express from "express";
import { RecipientController } from "./RecipientsController";
import { SponsorController } from "./SponsorController";

const apiRouter = express.Router();
apiRouter.use("/recipient", new RecipientController().getRouter());
apiRouter.use("/sponsor", new SponsorController().getRouter());

export default apiRouter;
