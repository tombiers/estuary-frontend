import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators";
import store from "@/store";
import { ProblemStatement } from '@/shared/models/ProblemStatement.model';
import { ProblemStatementLink } from '@/shared/models/ProblemStatementLink.model';
import APIservice from '@/api/api.service';

@Module({ dynamic: true, store, name: "ProblemStatementStore" })
export default class ProblemStatementStore extends VuexModule {
  private problemStatements: Map<number, ProblemStatement> = new Map();


  // returns problem statement with matching id or undefined
  get problemStatement() {
    return (id: number): ProblemStatement | undefined=> {
      return this.problemStatements.get(id);
    };
  }

  @Mutation
  public add(problemStatement: ProblemStatement) {
    this.problemStatements.set(problemStatement.id, problemStatement);
  }

  @Action
  public update(problemStatement: ProblemStatement) {
    // TODO: send updated problemstatement to backend
    // the update is only done in vuex for now
    this.add(problemStatement);
  }

  @Action
  public generateTestData(): void {
    this.fetchProblemStatements();
  }

  @Action
  public async fetchProblemStatements() {
    const httpResult = await APIservice.getProblemStatements();
    if (httpResult.status == 200 && typeof httpResult.content !== "undefined") { // everything ok 
      httpResult.content.forEach(element => this.add(element));
    }
    else {
      // something went wrong in the request => throw an error? try again?
    }
  }

}