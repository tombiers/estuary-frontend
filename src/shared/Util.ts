import { WorkshopStatus } from "./models/Workshop.model";
import { WorkshopType } from './models/BaseWorkshop.model';

export function WorkshopStatusToDTO(status: WorkshopStatus): number {
  let statusDTO;
  switch (status) {
    case WorkshopStatus.WIP:
      statusDTO = 1
      break;
    case WorkshopStatus.PUBLIC:
      statusDTO = 2
      break;
    case WorkshopStatus.UNKOWN:
      statusDTO = 0
      break;
    default:
      statusDTO = 0
  }
  return statusDTO
}

export function WorkshopStatusFromDTO(dto: number): WorkshopStatus {
  let statusDTO;
  switch (dto) {
    case 1:
      statusDTO = WorkshopStatus.WIP
      break;
    case 2:
      statusDTO = WorkshopStatus.PUBLIC
      break;
    default:
      statusDTO = WorkshopStatus.UNKOWN
  }
  return statusDTO
}

export function WorkshopTypeToDTO(workshopType: WorkshopType): number {
  let workshopTypeDTO: number;
  switch (workshopType) {
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
  return workshopTypeDTO;
}

export function WorkshopTypeFromDTO(dtoType: number): WorkshopType {
  let workshopType;
  switch (dtoType) {
    case 1:
      workshopType = WorkshopType.PS;
      break;
    case 2:
      workshopType = WorkshopType.IDEA;
      break;
    default:
      workshopType = WorkshopType.UNKOWN;
  }
  return workshopType;
}

