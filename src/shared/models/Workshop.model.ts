export class Workshop { 
  constructor(
    public id: number,
    public name: string,
    public place: string,
    public date: number,
    public tags: string[],
    public upvotes: number
  ) { }
}