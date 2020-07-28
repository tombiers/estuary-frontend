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
    const links: ProblemStatementLink[] = dto.linked.map(linkDTO => new ProblemStatementLink(linkDTO.id, linkDTO.tag));
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

  public get toDTO(): ProblemStatementDTO {
    const links = this.linked.map(link =>{ return {"id": link.id, "tag": link.tag}})
    const dto: ProblemStatementDTO = {
      "id": this.id,
      "likes": this.likes,
      "iAm": this.iAm,
      "iWant": this.iWant,
      "but": this.but,
      "because": this.because,
      "feel": this.feel,
      "linked": links
    }
    return dto;
  }
}