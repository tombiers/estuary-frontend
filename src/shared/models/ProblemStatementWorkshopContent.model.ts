import { WorkshopContent } from "./WorkshopContent.model";
import { ProblemStatement } from "./ProblemStatement.model";

export class ProblemStatementWorkshopContent implements WorkshopContent {
  constructor(
    public problemStatements: ProblemStatement[]
  ) {}
}