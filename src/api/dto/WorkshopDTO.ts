import { BaseWorkshopDTO } from './BaseWorkshopDTO';
import { WorkshopContentDTO } from './WorkshopContentDTO';

export interface WorkshopDTO<T extends WorkshopContentDTO> extends BaseWorkshopDTO {
  authors: string[],
  status: number,
  content: T

}