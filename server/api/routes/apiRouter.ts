import { OrganizationController } from "../../controllers/OrganizationController";
import express from "express";
import { RecipientController } from "../../controllers/RecipientsController";
import { SponsorController } from "../../controllers/SponsorController";

const apiRouter = express.Router();
apiRouter.use("/organization", new OrganizationController().getRouter());
apiRouter.use("/recipient", new RecipientController().getRouter());
apiRouter.use("/sponsor", new SponsorController().getRouter());

export default apiRouter;
