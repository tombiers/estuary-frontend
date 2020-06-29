import { Place } from "./Place.model";

// represents a  shortened workshop model as need for an overview of multiple workshops
export class Workshop {
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
