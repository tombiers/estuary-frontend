import { Module, VuexModule, Mutation, Action, getModule } from "vuex-module-decorators";
import store from "@/store";
import { ProblemStatement } from '@/shared/models/ProblemStatement.model';
import { ProblemStatementLink } from '@/shared/models/ProblemStatementLink.model';
import APIservice, { APIResult } from '@/api/api.service';
import WorkshopStore from './Workshops';
import { ProblemStatementWorkshopContent } from '@/shared/models/ProblemStatementWorkshopContent.model';
import { Workshop } from '@/shared/models/Workshop.model';

@Module({ dynamic: true, store, name: "ProblemStatementStore" })
export default class ProblemStatementStore extends VuexModule {
  private problemStatements: Map<number, ProblemStatement> = new Map();


  // returns problem statement with matching id or undefined
  get problemStatement() {
    return (id: number): ProblemStatement | undefined => {
      //return this.problemStatements.get(id); // TODO: why doesn't this work for ids > 5? 
      // The key value pairs are in the map!
      // If they weren't the following workaround wouldn't work
      // but this workaround works
      let re: ProblemStatement|undefined = undefined;
      this.problemStatements.forEach(entry => {
        if (entry.id == id) {
          re = entry;
        }
      });
      return re;
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
    //this.fetchProblemStatements();
  }

  @Action // get all problemstatements from backend
  public async fetchProblemStatements() {
    const httpResult = await APIservice.getProblemStatements();
    if (httpResult.status == 200 && typeof httpResult.content !== "undefined") { // everything ok 
      httpResult.content.forEach(element => this.add(element));
    }
    else {
      // something went wrong in the request => throw an error? try again?
    }
  }

  @Action // make sure that specified problemstatements are in vuex and request missing ones
  public async checkProblemStatements(ids: number[]):Promise<boolean> {

    let available = false;

    await Promise.all(ids.map(async (id) => {
      if (typeof this.problemStatement(id) === "undefined") {
        console.log("id " + id + " is missing, requesting it now");
        const result = await APIservice.getProblemStatement(id);
        if (result.status == 200 && typeof result.content !== "undefined") {
          this.add(result.content);
          console.log("fetched and added to vuex, ps with id " + id);
          available = true
        }
        else {
          console.log("unable to fetch missing ps with id " + id);
          available = false;
        }
      } else {
        console.log("id " + id + " is in store");
        available = true;
      }
    }));
    return available
  }

  @Action
  public async addProblemStatement(problemStatement: ProblemStatement): Promise<number> {
    const httpResult = await APIservice.addProblemStatement(problemStatement);
    if (httpResult.status == 201 && typeof httpResult.content !== "undefined") { // ps has been added
      this.add(httpResult.content); // add to vuex with id given by backend
      return httpResult.content.id
    } else {
      // something went wrong
      return -1;
    }
  }

  // create a new empty ProblemStatement, send it to the backend, add it to the given workshop
  @Action
  public async createProblemStatement(workshopID: number): Promise<number> {
    // create empty PS
    const ps = new ProblemStatement(-1, 0, "", "", "", "", "", []);
    const psID = await this.addProblemStatement(ps);
    const workshopStore = getModule(WorkshopStore);
    const workshop = workshopStore.selectedWorkshop as Workshop<ProblemStatementWorkshopContent>;
    workshop.content.problemStatementIds.push(psID);
    workshopStore.updateWorkshop(workshop);
    return psID;
  }

}