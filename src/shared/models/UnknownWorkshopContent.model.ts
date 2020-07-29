import { WorkshopContent } from "./WorkshopContent.model";
import { WorkshopContentDTO } from '@/api/dto/WorkshopContentDTO';

export class UnknownWorkshopContent implements WorkshopContent {
  public content: string;
  constructor() {
    this.content ="unkown content type"
  }

  public static fromDTO(dto?: WorkshopContentDTO): UnknownWorkshopContent {
    return new UnknownWorkshopContent();
  }

  /* eslint-disable @typescript-eslint/no-empty-function */
  // TODO: throw an error for trying to load an unkown content type
  public async loadContent(): Promise<void> {}
  /* eslint-enable @typescript-eslint/no-empty-function */

  public get DTO(): string {
    return this.content;
  }
}
