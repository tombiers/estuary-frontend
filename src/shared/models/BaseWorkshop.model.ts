import { Place } from "./Place.model";

// represents a  base workshop model as needed for an overview of multiple workshops
export class BaseWorkshop {
  constructor(
    public id: number,
    public type: string,
    public place: Place,
    public date: number,
    public tags: string[],
    public upvotes: number,
    public teaser: string
  ) {}
}
