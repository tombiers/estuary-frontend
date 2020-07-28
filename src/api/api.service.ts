import * as rm from "typed-rest-client/RestClient"

import { BaseWorkshopDTO } from "@/api/dto/BaseWorkshopDTO";
import { WorkshopType, BaseWorkshop } from '@/shared/models/BaseWorkshop.model';
import { ProblemStatement } from '@/shared/models/ProblemStatement.model';
import { ProblemStatementDTO } from './dto/ProblemStatementDTO';
import { Workshop } from '@/shared/models/Workshop.model';
import { WorkshopDTO } from './dto/WorkshopDTO';
import { WorkshopContent } from '@/shared/models/WorkshopContent.model';
import { WorkshopContentDTO } from './dto/WorkshopContentDTO';

export interface APIResult<T> {
  status: number,
  content: T | undefined
}

const serverURL = "http://localhost:3000";

// add a delay when in development mode
function delay(ms: number) {
  if (process.env.NODE_ENV === "development") {
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

  // get all workshops with content
  public static async getWorkshopsWithContent(): Promise<APIResult<Workshop<WorkshopContent>[]>> {
    const rest: rm.RestClient = new rm.RestClient("rest-samples", serverURL);
    const res: rm.IRestResponse<WorkshopDTO<WorkshopContentDTO>[]> = await rest.get<WorkshopDTO<WorkshopContentDTO>[]>("/workshopsFull");

    const apiResult: APIResult<Workshop<WorkshopContent>[]> = {
      status: res.statusCode,
      content: (res.statusCode == 200) ? res.result!.map(element => Workshop.fromDTO(element)) : undefined
    }

    await delay(3000);
    return apiResult;
  }

  // get a workshop with content
  public static async getWorkshopWithContent(id: number): Promise<APIResult<Workshop<WorkshopContent>>> {
    const rest: rm.RestClient = new rm.RestClient("rest-samples", serverURL);
    const res: rm.IRestResponse<WorkshopDTO<WorkshopContentDTO>> = await rest.get<WorkshopDTO<WorkshopContentDTO>>("/workshopsFull/"+id);

    const apiResult: APIResult<Workshop<WorkshopContent>> = {
      status: res.statusCode,
      content: (res.statusCode == 200) ? Workshop.fromDTO(res.result!) : undefined
    }

    await delay(3000);
    return apiResult;
  }

  // get all ProblemStatements
  public static async getProblemStatements(): Promise<APIResult<ProblemStatement[]>> {
    const rest: rm.RestClient = new rm.RestClient("rest-samples", serverURL);
    const res: rm.IRestResponse<ProblemStatementDTO[]> = await rest.get<ProblemStatementDTO[]>("/problemStatements");

    const apiResult: APIResult<ProblemStatement[]> = {
      status: res.statusCode,
      content: (res.statusCode == 200) ? res.result!.map(element => ProblemStatement.fromDTO(element)) : undefined
    }
    await delay(3000);
    return apiResult;
  }

  // get ProblemStatement with id
  public static async getProblemStatement(id: number): Promise<APIResult<ProblemStatement>> {
    const rest: rm.RestClient = new rm.RestClient("rest-samples", serverURL);
    const res: rm.IRestResponse<ProblemStatementDTO> = await rest.get<ProblemStatementDTO>("/problemStatements/"+id);

    const apiResult: APIResult<ProblemStatement> = {
      status: res.statusCode,
      content: (res.statusCode == 200) ? ProblemStatement.fromDTO(res.result!) : undefined
    }
    await delay(3000);
    return apiResult;
  }

  // update a ProblemStatement
  public static async updateProblemStatement(problemStatement: ProblemStatement) {
    const rest: rm.RestClient = new rm.RestClient("rest-samples", serverURL);
    const res: rm.IRestResponse<ProblemStatementDTO> = await rest.update<ProblemStatementDTO>("/problemStatements/" + problemStatement.id, problemStatement.toDTO);

    const apiResult: APIResult<ProblemStatement> = {
      status: res.statusCode,
      content: (res.statusCode == 200) ? ProblemStatement.fromDTO(res.result!) : undefined
    }
    await delay(3000);
    return apiResult;
  }

  // add a new ProblemStatement, the id is ignored
  // returns newly created problemstatement with the correct id
  public static async addProblemStatement(problemStatement: ProblemStatement) {
    const rest: rm.RestClient = new rm.RestClient("rest-samples", serverURL);
    const res: rm.IRestResponse<ProblemStatementDTO> = await rest.create<ProblemStatementDTO>("/problemStatements", problemStatement.toDTO);

    const apiResult: APIResult<ProblemStatement> = {
      status: res.statusCode,
      content: (res.statusCode == 201) ? ProblemStatement.fromDTO(res.result!) : undefined
    }

    await delay(3000);
    return apiResult;
  }
}