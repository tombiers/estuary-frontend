import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators";
import { BaseWorkshop, WorkshopType } from "@/shared/models/BaseWorkshop.model";
import { Workshop, workshopStatus } from "@/shared/models/Workshop.model";
import { Place } from "@/shared/models/Place.model";
import store from "@/store";
import { WorkshopContent } from "@/shared/models/WorkshopContent.model";
import { ProblemStatementWorkshopContent } from "@/shared/models/ProblemStatementWorkshopContent.model";
import { ProblemStatement } from '@/shared/models/ProblemStatement.model';
import { ProblemStatementLink } from '@/shared/models/ProblemStatementLink.model';
import APIservice from '@/api/api.service';

@Module({ dynamic: true, store, name: "WorkshopStore" })
export default class WorkshopStore extends VuexModule {
  private allWorkshops: BaseWorkshop[] = [];
  private filterQuery: (string | number)[] = [];
  private selectedFullWorkshop: (Workshop<WorkshopContent> | null) = null;

  get workshops(): BaseWorkshop[] {
    return this.allWorkshops;
  }

  get filteredWorkshops(): BaseWorkshop[] {
    if (this.filterQuery.length == 0) return this.workshops;
    return this.allWorkshops.filter(ws => {
      return this.filterQuery.every(query => {
        let res = false;
        if (typeof query === "string") {
          res =
            ws.workshopTypeLocale.toLowerCase().includes(query.toLowerCase()) ||
            ws.place.name.toLowerCase().includes(query.toLowerCase()) ||
            ws.tags.some(tag =>
              tag.toLowerCase().includes(query.toLowerCase())
            );
        } else {
          const wsDate = new Date(ws.date);
          const queryDate = new Date(query);
          res =
            wsDate.getFullYear() == queryDate.getFullYear() &&
            wsDate.getMonth() == queryDate.getMonth();
        }
        return res;
      });
    });
  }

  get matchingQueries() {
    return (query: string): string[] => {
      const possibleQueries: string[] = [];
      this.allWorkshops.forEach(ws => {
        if (ws.workshopTypeLocale.toLowerCase().includes(query.toLowerCase())) {
          possibleQueries.push(ws.workshopTypeLocale);
        }
        if (ws.place.name.toLowerCase().includes(query.toLowerCase())) {
          possibleQueries.push(ws.place.name);
        }
        possibleQueries.push(
          ...ws.tags.filter(tag =>
            tag.toLowerCase().includes(query.toLowerCase())
          )
        );
      });
      return [...new Set(possibleQueries)]; // remove duplicates
    };
  }

  get activeFilterQueries() {
    return this.filterQuery;
  }

  get selectedWorkshop(): Workshop<WorkshopContent> {
    return this.selectedFullWorkshop!;
  }

  @Mutation
  private setSelectedWorkshop(workshop: Workshop<WorkshopContent>) {
    this.selectedFullWorkshop = workshop;
  }

  @Action
  public async selectWorkshop(id: number): Promise<boolean> {
    // TODO: get the workshop with that id from the backend

    // mock data for now
    const foundWorkshop = this.workshops.find(item => item!.id == id);
    if (typeof foundWorkshop !== "undefined") {
      const ws = new Workshop<WorkshopContent>(
        foundWorkshop.id,
        foundWorkshop.type,
        foundWorkshop.place,
        foundWorkshop.date,
        foundWorkshop.tags,
        foundWorkshop.upvotes,
        foundWorkshop.teaser,
        ["Anna", "Paul"],
        workshopStatus.PUBLIC,
        new ProblemStatementWorkshopContent([1,2,3,4,5])
      );
      this.setSelectedWorkshop(ws);
      return true;
    }
    else
    {
      return false;
    }
  }

  @Mutation
  public setFilter(query: (string | number)[]) {
    this.filterQuery = query;
  }

  @Mutation
  public addFilter(query: string | number) {
    if (!this.filterQuery.includes(query)) {
      this.filterQuery.push(query);
    }
  }

  @Mutation
  public removeFilter(query: string | number) {
    const index = this.filterQuery.indexOf(query);
    if (index > -1) {
      this.filterQuery.splice(index, 1);
    }
  }

  @Mutation
  public addWorkshop(workshop: BaseWorkshop) {
    this.allWorkshops.push(workshop);
  }

  @Action
  public async fetchWorkshops() {
    // get all workshops as BaseWorkshop
    const httpResult = await APIservice.getWorkshops();
    if (httpResult.status == 200 && typeof httpResult.content !== "undefined") { // everything ok
      httpResult.content.forEach(element => this.addWorkshop(element));
    }
    else {
      // something went wrong in the request => throw an error? try again?
    }
    // get all workshops with content
    // await APIservice.getWorkshopsWithContent();
  }
}
