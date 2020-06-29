import { Place } from "./Place.model";
import { Workshop } from './Workshop.model';

// represents a  complete workshop model as need for the detail view
export class WorkshopFull extends Workshop{
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
  ) {
    super (id, type, place, date, tags, upvotes, teaser)
  }
}
