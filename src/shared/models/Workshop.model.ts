import { i18n } from "@/main";
import { Place } from "./Place.model";
import { BaseWorkshop, WorkshopType } from './BaseWorkshop.model';
import { WorkshopDTO } from '@/api/dto/WorkshopDTO';
import { WorkshopContent } from './WorkshopContent.model';
import { WorkshopContentDTO } from '@/api/dto/WorkshopContentDTO';
import { ProblemStatementWorkshopContent } from './ProblemStatementWorkshopContent.model';
import { ProblemStatementWorkshopContentDTO } from "@/api/dto/ProblemStatementWorkshopContentDTO"
import { UnknownWorkshopContent } from "@/shared/models/UnknownWorkshopContent.model";
import * as Util from "@/shared/Util";

export enum WorkshopStatus {
  WIP,
  PUBLIC,
  UNKOWN
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
    public status: WorkshopStatus,
    public content: T
  ) {
    super (id, type, place, date, tags, upvotes, teaser)
  }

  get statusLocale(): string {
    switch (this.status) {
      case WorkshopStatus.WIP: 
        return i18n.t("workshopStatus.wip").toString();
      
      case WorkshopStatus.PUBLIC: 
      return i18n.t("workshopStatus.public").toString();
      
      default:
        return i18n.t("workshopStatus.unkown").toString();
    }
  }

  get DTO(): WorkshopDTO<WorkshopContentDTO> {
    const dto: WorkshopDTO<WorkshopContentDTO> = {
      id: this.id,
      type: Util.WorkshopTypeToDTO(this.type),
      place: {
        name: this.place.name,
        mapLink: this.place.mapLink
      },
      date: this.date,
      tags: this.tags,
      likes: this.upvotes,
      teaser: this.teaser,
      authors: this.authors,
      status: Util.WorkshopStatusToDTO(this.status),
      content: this.content.DTO
    }
    return dto;
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
        workshopContent = UnknownWorkshopContent.fromDTO(dto.content);
        break;
      default:
        workshopType = WorkshopType.UNKOWN;
        workshopContent = UnknownWorkshopContent.fromDTO(dto.content);
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
      Util.WorkshopStatusFromDTO(dto.status),
      workshopContent
    );
  }

}
