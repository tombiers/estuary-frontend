export interface ProblemStatementDTO {
  id: number,
  likes: number,
  iAm: string,
  iWant: string,
  but: string,
  because: string,
  feel: string,
  linked: {
    id: number,
    tag: string
  }[]
}
