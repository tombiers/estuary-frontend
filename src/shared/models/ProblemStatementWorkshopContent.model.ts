import { WorkshopContent } from "./WorkshopContent.model";
import { ProblemStatement } from "./ProblemStatement.model";
import { getModule } from 'vuex-module-decorators';
import ProblemStatementStore from '@/store/modules/ProblemStatements';
import { ProblemStatementWorkshopContentDTO } from '@/api/dto/ProblemStatementWorkshopContentDTO';
import APIservice from '@/api/api.service';

export class ProblemStatementWorkshopContent implements WorkshopContent {
  public problemStatementIds: number[] = [];
  
  constructor(problemStatementIds: number[]) {
    const problemStatementStore = getModule(ProblemStatementStore);
    problemStatementIds.forEach(id => {
      this.problemStatementIds.push(id);
    });
    
  }

  public get DTO(): ProblemStatementWorkshopContentDTO {
    const dto: ProblemStatementWorkshopContentDTO = {
      psIDs: this.problemStatementIds
    }
    return dto; 
  }

  public static fromDTO(dto: ProblemStatementWorkshopContentDTO) {
    return new ProblemStatementWorkshopContent(dto.psIDs)
  }

  public async loadContent():Promise<void> {
    const checkIds = [];
    // first check ps directly inside the ws
    checkIds.push(...this.problemStatementIds);
    await getModule(ProblemStatementStore).checkProblemStatements(checkIds);
    // next check ps that are linked but not in this workshop
    let checkLinks:number[] = [];
    checkIds.forEach(id => {
      checkLinks.push(...getModule(ProblemStatementStore).problemStatement(id)!.linkedProblemStatementIds);
    })
    checkLinks = [...new Set(checkLinks)];
    await getModule(ProblemStatementStore).checkProblemStatements(checkLinks);

  }
}