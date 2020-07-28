import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators";
import store from "@/store";
import { ProblemStatement } from '@/shared/models/ProblemStatement.model';
import { ProblemStatementLink } from '@/shared/models/ProblemStatementLink.model';
import APIservice, { APIResult } from '@/api/api.service';

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
  public async update(problemStatement: ProblemStatement) {
    const httpResult = await APIservice.updateProblemStatement(problemStatement);
    if (httpResult.status == 200 && typeof httpResult.content !== "undefined") { //everything ok
      this.add(httpResult.content);
    } else {
      // something went wrong
    }
  }

  @Action
  public generateTestData(): void {
    //const ps = new ProblemStatement(0, 0, "me", "want", "but", "not", "feels", []);
    //this.addProblemStatement(ps);
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

  @Action
  public async addProblemStatement(problemStatement: ProblemStatement) {
    const httpResult = await APIservice.addProblemStatement(problemStatement)
    if (httpResult.status == 201 && typeof httpResult.content !== "undefined") { // ps has been added
      this.add(httpResult.content); // add to vuex with id given by backend
    } else {
      // something went wrong
    }
  }

}