import { ProblemStatementLink } from './ProblemStatementLink.model';
import { ProblemStatementDTO } from '@/api/dto/ProblemStatementDTO';

export class ProblemStatement {
  constructor(
    public id: number,
    public likes: number,
    public iAm: string,
    public iWant: string,
    public but: string,
    public because: string,
    public feel: string,
    public linked: ProblemStatementLink[]
  ) { }

  public get linkedProblemStatementIds(): number[] {
    return this.linked.map(link => link.id);
  }
  
  public static fromDTO(dto: ProblemStatementDTO): ProblemStatement {
    const links: ProblemStatementLink[] = dto.linked.map(linkDTO => ProblemStatementLink.fromDTO(linkDTO));
    return new ProblemStatement(
      dto.id,
      dto.likes,
      dto.iAm,
      dto.iWant,
      dto.but,
      dto.because,
      dto.feel,
      links
    )
  }

  public get DTO(): ProblemStatementDTO {
    const dto: ProblemStatementDTO = {
      "id": this.id,
      "likes": this.likes,
      "iAm": this.iAm,
      "iWant": this.iWant,
      "but": this.but,
      "because": this.because,
      "feel": this.feel,
      "linked": this.linked.map(link => link.DTO)
    }
    return dto;
  }
}