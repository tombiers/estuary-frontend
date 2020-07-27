import { WorkshopContent } from "./WorkshopContent.model";
import { ProblemStatement } from "./ProblemStatement.model";
import { getModule } from 'vuex-module-decorators';
import ProblemStatementStore from '@/store/modules/ProblemStatements';

export class ProblemStatementWorkshopContent implements WorkshopContent {
  public problemStatements: ProblemStatement[] = [];
  
  constructor(problemStatementIds: number[]) {
    const problemStatementStore = getModule(ProblemStatementStore);
    problemStatementIds.forEach(id => {
      this.problemStatements.push(problemStatementStore.problemStatement(id)!);
    });
    
  }
}