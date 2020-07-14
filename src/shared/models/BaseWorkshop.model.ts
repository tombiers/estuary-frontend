import { Place } from "./Place.model";
import { i18n } from "@/main"


export enum WorkshopType {
  PS,
  IDEA
}

// represents a  base workshop model as needed for an overview of multiple workshops
export class BaseWorkshop {
  constructor(
    public id: number,
    public type: WorkshopType,
    public place: Place,
    public date: number,
    public tags: string[],
    public upvotes: number,
    public teaser: string
  ) { }
  
  get workshopTypeLocale(): string {
    switch (this.type) {
      case WorkshopType.PS: {
        return i18n.t("workshopType.ps").toString();
      }
      case WorkshopType.IDEA: {
        return i18n.t("workshopType.idea").toString();
      }
      default: {
        return i18n.t("workshopType.unkown").toString();
      }
    }
  }
}
