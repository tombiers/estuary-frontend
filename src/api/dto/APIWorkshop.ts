export interface BaseWorkshopDTO {
  id: number,
  type: number,
  place: {
    name: string,
    mapLink: string
  },
  date: number,
  tags: string[],
  likes: number,
  teaser: string
}