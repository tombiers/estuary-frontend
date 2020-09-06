import { Place } from "./Place.model";
import { i18n } from "@/main"
import { BaseWorkshopDTO } from "@/api/dto/BaseWorkshopDTO";
import * as Util from "@/shared/Util.ts";

export enum WorkshopType {
  UNKOWN,
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
  
  get DTO() {

    let workshopTypeDTO: number;
    switch (this.type) {
      case WorkshopType.PS:
        workshopTypeDTO = 1;
        break;
      case WorkshopType.IDEA:
        workshopTypeDTO = 2;
        break;
      case WorkshopType.UNKOWN:
        workshopTypeDTO = 0;
        break;
      default:
        workshopTypeDTO = 0;
    }

    const dto: BaseWorkshopDTO = {
      id: this.id,
      type: workshopTypeDTO,
      place: {
        name: this.place.name,
        mapLink: this.place.mapLink
      },
      date: this.date,
      tags: this.tags,
      likes: this.upvotes,
      teaser: this.teaser
    }
    return dto
  }
  
  static fromDTO(dto: BaseWorkshopDTO): BaseWorkshop {
    let workshopType: WorkshopType;
    switch (dto.type) {
      case 1:
        workshopType = WorkshopType.PS;
        break;
      case 2:
        workshopType = WorkshopType.IDEA;
        break;
      default:
        workshopType = WorkshopType.UNKOWN;
    }

    return new BaseWorkshop(
      dto.id,
      workshopType,
      new Place(dto.place.name, dto.place.mapLink),
      dto.date,
      dto.tags,
      dto.likes,
      dto.teaser
    );
  }

}
