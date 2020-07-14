import { Place } from "./Place.model";
import { BaseWorkshop } from './BaseWorkshop.model';
import { WorkshopContent } from './WorkshopContent.model';

// represents a  complete workshop model as need for the detail view
export class Workshop<T extends WorkshopContent> extends BaseWorkshop{
  constructor(
    id: number,
    type: string,
    place: Place,
    date: number,
    tags: string[],
    upvotes: number,
    teaser: string,
    public authors: string[],
    public status: string,
    public content: T
  ) {
    super (id, type, place, date, tags, upvotes, teaser)
  }
}
