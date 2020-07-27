import * as rm from "typed-rest-client/RestClient"

import { WorkshopType, BaseWorkshop } from '@/shared/models/BaseWorkshop.model';

interface APIWorkshop {
  id: number,
  type: number,
  place: string,
  date: number,
  tags: string[],
  likes: number,
  teaser: string
}


export default class APIservice {
  // get all workshops
  public static async getWorkshops() {
    const rest: rm.RestClient = new rm.RestClient("rest-samples", "http://localhost:3000");
    const res: rm.IRestResponse<APIWorkshop> = await rest.get<APIWorkshop>("/workshops");
    console.log(res.statusCode);
    console.log(res.result);
    
  }
}
