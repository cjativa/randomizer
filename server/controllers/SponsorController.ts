import { SponsorHandler } from "../database_handlers./SponsorHandler";
import { Router } from "express";
import { ISponsorAndRecipient } from "../../shared/interfaces/ISponsorAndRecipient";

interface ISetSponsorForRecipient {
  organization_id: number;
  sponsor_name: string;
  sponsor_email: string;
  sponsor_phone_number: string;
  recipient_id: number;
}

export class SponsorController {
  private readonly router: Router = Router();

  constructor() {
    this.setupRoutes();
  }

  public getRouter(): Router {
    return this.router;
  }

  private setupRoutes(): void {
    this.router.get<any, ISponsorAndRecipient[], any, { org: number }>(
      "/getSponsorsToRecipientsForOrg",
      ({ query: { org } }, res) =>
        SponsorHandler.getSponsorsToRecipientsForOrg(
          org
        ).then((sponsorsToRecipients) => res.send(sponsorsToRecipients))
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
      ) =>
        SponsorHandler.createSponsor(
          organization_id,
          sponsor_name,
          sponsor_email,
          sponsor_phone_number,
          recipient_id
        ).then(() => res.sendStatus(200))
    );
  }
}
