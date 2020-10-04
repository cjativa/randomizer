import { ISponsor } from "./ISponsor";
import { IRecipient } from "./IRecipient";

export interface ISponsorAndRecipient
  extends Omit<ISponsor, "id">,
    Omit<IRecipient, "id"> {
  sponsor_id: number;
  recipient_id: number;
}
