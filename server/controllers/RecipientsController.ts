import { RecipientsHandler } from "../database_handlers./RecipientsHandler";
import { Router } from "express";
import { IRecipient } from "../../shared/interfaces/IRecipient";

export class RecipientController {
  private readonly router: Router = Router();

  constructor() {
    this.setupRoutes();
  }

  public getRouter(): Router {
    return this.router;
  }

  private setupRoutes(): void {
    this.router.get<any, any, any, { org: number }>(
      "/recipientsEligibleForGifts",
      ({ query: { org } }, res) =>
        RecipientsHandler.getRecipientsEligibleForGiftsByOrgId(
          org
        ).then((recipient) => res.send(recipient))
    );
    this.router.post<any, any, { org: number; recipient: IRecipient }, any>(
      "/create",
      ({ body: { recipient } }, res) =>
        RecipientsHandler.createRecipientForOrg(recipient).then(() =>
          res.sendStatus(200)
        )
    );
  }
}
