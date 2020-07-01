import { ProblemStatementLink } from './ProblemStatementLink.model';

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
  ) {}
}