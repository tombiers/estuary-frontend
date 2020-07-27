import * as rm from "typed-rest-client/RestClient"

import { BaseWorkshopDTO } from "@/api/dto/BaseWorkshopDTO";
import { WorkshopType, BaseWorkshop } from '@/shared/models/BaseWorkshop.model';
import { ProblemStatement } from '@/shared/models/ProblemStatement.model';
import { ProblemStatementDTO } from './dto/ProblemStatementDTO';

export interface APIResult<T> {
  status: number,
  content: T|undefined
}

const serverURL = "http://localhost:3000";

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
    const rest: rm.RestClient = new rm.RestClient("rest-samples", serverURL);
    const res: rm.IRestResponse<BaseWorkshopDTO[]> = await rest.get<BaseWorkshopDTO[]>("/workshops");
    
    const apiResult: APIResult<BaseWorkshop[]> = {
      status: res.statusCode,
      content: (res.statusCode == 200) ? res.result!.map(element => BaseWorkshop.fromDTO(element)) : undefined
    }
    await delay(3000);
    return apiResult;
  }

  public static async getProblemStatements(): Promise<APIResult<ProblemStatementDTO[]>> {
    const rest: rm.RestClient = new rm.RestClient("rest-samples", serverURL);
    const res: rm.IRestResponse<ProblemStatementDTO[]> = await rest.get<ProblemStatementDTO[]>("/problemStatements");

    const apiResult: APIResult<ProblemStatement[]> = {
      status: res.statusCode,
      content: (res.statusCode == 200) ? res.result!.map(element => ProblemStatement.fromDTO(element)) : undefined
    }
    await delay(3000);
    return apiResult;
  }


  
}