import { ProblemStatementLinkDTO } from '@/api/dto/ProblemStatementLinkDTO';

export class ProblemStatementLink {
  constructor(
    public id: number,
    public tag: string
  ) { }
  
  public static fromDTO(dto: ProblemStatementLinkDTO): ProblemStatementLink {
    return new ProblemStatementLink(dto.id, dto.tag);
  }

  public get DTO(): ProblemStatementLinkDTO {
    const dto: ProblemStatementLinkDTO = {
      id: this.id,
      tag: this.tag
    }
    return dto;
  }
}