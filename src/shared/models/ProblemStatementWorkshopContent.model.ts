import { WorkshopContent } from './WorkshopContent.model';

export class ProblemStatementWorkshopContent implements WorkshopContent {
  constructor(
    public placeHolderContent: string
  ) {}
}