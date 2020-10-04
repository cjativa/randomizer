import express from "express";
import recipientsController from "./RecipientsController";

const apiRouter = express.Router();
apiRouter.use("/recipients", recipientsController);

export default apiRouter;
