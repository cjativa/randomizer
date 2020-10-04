import { OrganizationHandler } from "database_handlers./OrganizationHandler";
import { resolveSoa } from "dns";
import { Router } from "express";

interface ICreateOrganizationPayload {
  organizationName: string;
  emailAddress: string;
  password: string;
}

export class OrganizationController {
  private readonly router: Router = Router();

  constructor() {
    this.setupRoutes();
  }

  public getRouter(): Router {
    return this.router;
  }

  private setupRoutes(): void {
    this.router.post<any, any, ICreateOrganizationPayload, any>(
      "/create",
      ({ body: { organizationName, emailAddress, password } }, res) =>
        OrganizationHandler.createOrganization(
          organizationName,
          emailAddress,
          password
        ).then(() => res.sendStatus(200))
    );
  }
}
