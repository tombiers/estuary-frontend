import { WorkshopContentDTO } from "@/api/dto/WorkshopContentDTO";

export interface WorkshopContent {
  // can't define statics on an interface
  //static fromDTO(dto: WorkshopContentDTO): WorkshopContent

  loadContent(): Promise<void>;

  DTO: WorkshopContentDTO;
}