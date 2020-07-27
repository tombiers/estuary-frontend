import * as rm from "typed-rest-client/RestClient"

import { BaseWorkshopDTO } from "@/api/dto/APIWorkshop";
import { WorkshopType, BaseWorkshop } from '@/shared/models/BaseWorkshop.model';

export interface APIResult<T> {
  status: number,
  content: T|undefined
}

// add a delay when in development mode
function delay(ms: number) {
  if (process.env.NODE_ENV === "development"){
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  return;
}

export default class APIservice {
  // get all workshops
  public static async getWorkshops(): Promise<APIResult<BaseWorkshop[]>> {
    const rest: rm.RestClient = new rm.RestClient("rest-samples", "http://localhost:3000");
    const res: rm.IRestResponse<BaseWorkshopDTO[]> = await rest.get<BaseWorkshopDTO[]>("/workshops");
    
    const apiResult: APIResult<BaseWorkshop[]> = {
      status: res.statusCode,
      content: (res.statusCode == 200) ? res.result!.map(element => BaseWorkshop.fromDTO(element)) : undefined
    }
    await delay(3000);
    return apiResult;
  }


  
}