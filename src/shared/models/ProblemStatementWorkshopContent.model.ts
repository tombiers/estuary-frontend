import { WorkshopContent } from "./WorkshopContent.model";
import { ProblemStatement } from "./ProblemStatement.model";
import { getModule } from 'vuex-module-decorators';
import ProblemStatementStore from '@/store/modules/ProblemStatements';
import { ProblemStatementWorkshopContentDTO } from '@/api/dto/ProblemStatementWorkshopContentDTO';

export class ProblemStatementWorkshopContent implements WorkshopContent {
  public problemStatements: ProblemStatement[] = [];
  public problemStatementIds: number[] = [];
  
  constructor(problemStatementIds: number[]) {
    const problemStatementStore = getModule(ProblemStatementStore);
    problemStatementIds.forEach(id => {
      this.problemStatementIds.push(id);
      this.problemStatements.push(problemStatementStore.problemStatement(id)!);
    });
    
  }

  public static fromDTO(dto: ProblemStatementWorkshopContentDTO) {
    return new ProblemStatementWorkshopContent(dto.psIDs)
  }
}