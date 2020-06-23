import { Place } from "./Place.model";

export class Workshop {
  constructor(
    public id: number,
    public type: string,
    public place: Place,
    public date: number,
    public tags: string[],
    public upvotes: number,
    public teaser: string
  ) { }
}
