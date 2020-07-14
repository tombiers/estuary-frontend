import { Place } from "./Place.model";
import { BaseWorkshop, WorkshopType } from './BaseWorkshop.model';
import { WorkshopContent } from './WorkshopContent.model';
import { i18n } from "@/main";

export enum workshopStatus {
  WIP,
  PUBLIC
}

// represents a  complete workshop model as need for the detail view
export class Workshop<T extends WorkshopContent> extends BaseWorkshop{
  constructor(
    id: number,
    type: WorkshopType,
    place: Place,
    date: number,
    tags: string[],
    upvotes: number,
    teaser: string,
    public authors: string[],
    public status: workshopStatus,
    public content: T
  ) {
    super (id, type, place, date, tags, upvotes, teaser)
  }

  get statusLocale(): string {
    switch (this.status) {
      case workshopStatus.WIP: 
        return i18n.t("workshopStatus.wip").toString();
      
      case workshopStatus.PUBLIC: 
      return i18n.t("workshopStatus.public").toString();
      
      default:
        return i18n.t("workshopStatus.unkown").toString();
    }
  }
}
