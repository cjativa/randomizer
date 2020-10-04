import { RecipientsHandler } from "database_handlers./RecipientsHandler";
import express from "express";
import { RecipientController } from "./RecipientsController";

const apiRouter = express.Router();
apiRouter.use("/recipient", new RecipientController().getRouter());

export default apiRouter;
