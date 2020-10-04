import { RecipientsHandler } from "database_handlers./RecipientsHandler";
import { SponsorHandler } from "database_handlers./SponsorHandler";
import express, { Router } from "express";
import { IRecipient } from "../../../shared/interfaces/IRecipient";

interface ISetSponsorForRecipient {
  organization_id: number;
  sponsor_name: string;
  sponsor_email: string;
  sponsor_phone_number: string;
  recipient_id: number;
}

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
      ({ query: { org } }, res) => {
        RecipientsHandler.getRecipientsEligibleForGiftsByOrgId(
          org
        ).then((recipient) => res.send(recipient));
      }
    );
    this.router.post<any, any, ISetSponsorForRecipient, any>(
      "/setSponsorForRecipient",
      (
        {
          body: {
            organization_id,
            recipient_id,
            sponsor_email,
            sponsor_name,
            sponsor_phone_number,
          },
        },
        res
      ) => {
        SponsorHandler.createSponsor(
          organization_id,
          sponsor_name,
          sponsor_email,
          sponsor_phone_number,
          recipient_id
        ).then(() => res.sendStatus(200));
      }
    );
  }
}
