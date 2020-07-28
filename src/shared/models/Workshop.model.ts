import { i18n } from "@/main";
import { Place } from "./Place.model";
import { BaseWorkshop, WorkshopType } from './BaseWorkshop.model';
import { WorkshopDTO } from '@/api/dto/WorkshopDTO';
import { WorkshopContent } from './WorkshopContent.model';
import { WorkshopContentDTO } from '@/api/dto/WorkshopContentDTO';
import { ProblemStatementWorkshopContent } from './ProblemStatementWorkshopContent.model';
import { ProblemStatementWorkshopContentDTO } from "@/api/dto/ProblemStatementWorkshopContentDTO"

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

  public static fromDTO(dto: WorkshopDTO<WorkshopContentDTO>): Workshop<WorkshopContent> {
    let workshopType: WorkshopType;
    let workshopContent: WorkshopContent;
    switch (dto.type) {
      case 1:
        workshopType = WorkshopType.PS;
        workshopContent = ProblemStatementWorkshopContent.fromDTO(dto.content as ProblemStatementWorkshopContentDTO);
        break;
      case 2:
        workshopType = WorkshopType.IDEA;
        workshopContent = {};
        break;
      default:
        workshopType = WorkshopType.UNKOWN;
        workshopContent = {};
    }

    return new Workshop<WorkshopContent>(
      dto.id,
      workshopType,
      new Place(dto.place.name, dto.place.mapLink),
      dto.date,
      dto.tags,
      dto.likes,
      dto.teaser,
      dto.authors,
      dto.status,
      workshopContent
    );
  }

}
