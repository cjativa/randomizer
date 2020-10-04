import { OrganizationController } from "controllers/OrganizationController";
import { RecipientsHandler } from "database_handlers./RecipientsHandler";
import { SponsorHandler } from "database_handlers./SponsorHandler";
import express from "express";
import { RecipientController } from "../../controllers/RecipientsController";
import { SponsorController } from "../../controllers/SponsorController";

const apiRouter = express.Router();
apiRouter.use("/organization", new OrganizationController().getRouter());
apiRouter.use("/recipient", new RecipientController().getRouter());
apiRouter.use("/sponsor", new SponsorController().getRouter());

export default apiRouter;
