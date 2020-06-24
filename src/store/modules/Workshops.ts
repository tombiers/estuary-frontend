import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators";
import { Workshop } from "@/shared/models/Workshop.model";
import { Place } from "@/shared/models/Place.model";
import store from "@/store";

@Module({ dynamic: true, store, name: "WorkshopStore" })
export default class WorkshopStore extends VuexModule {
  allWorkshops: Workshop[] = [];
  filterQuery: (string | number)[] = [];
  filterDate: Date|null = null;

  get workshops(): Workshop[] {
    return this.allWorkshops;
  }

  get filteredWorkshops(): Workshop[] {
    if (this.filterQuery.length == 0) return this.workshops;
    return this.allWorkshops.filter(ws => {
      return this.filterQuery.every(query => {
        let res = false;
        if (typeof query === "string") {
          res =
            ws.type.toLowerCase().includes(query.toLowerCase()) ||
            ws.place.name.toLowerCase().includes(query.toLowerCase()) ||
            ws.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()));
        } else {
          const wsDate = new Date(ws.date);
          const queryDate = new Date(query);
          res = (wsDate.getFullYear() == queryDate.getFullYear())
            && (wsDate.getMonth() == queryDate.getMonth());
        }
        return res;
      }); 
    });
  }

  get matchingQueries() {
    return (query: string):string[] => {
      const possibleQueries: string[] = [];
      this.allWorkshops.forEach(ws => {
        if (ws.type.toLowerCase().includes(query.toLowerCase())) possibleQueries.push(ws.type);
        if (ws.place.name.toLowerCase().includes(query.toLowerCase())) possibleQueries.push(ws.place.name);
        possibleQueries.push(...ws.tags.filter(tag => tag.toLowerCase().includes(query.toLowerCase())));
      });
      return [...new Set(possibleQueries)]; // remove duplicates
    }
  }

  @Mutation
  public setFilter(query: (string | number)[]) {
    this.filterQuery = query;
  }

  @Mutation
  public addFilter(query: string | number) {
    if (!this.filterQuery.includes(query))
    this.filterQuery.push(query);
  }

  @Mutation
  public removeFilter(query: string | number) {
    const index = this.filterQuery.indexOf(query);
    if (index > -1) {
      this.filterQuery.splice(index, 1);
    }
  }

  @Mutation
  public addWorkshop(workshop: Workshop) {
    this.allWorkshops.push(workshop);
  }

  @Action
  public createTestData() {
    this.addWorkshop(
      new Workshop(
        24,
        "PS Workshop",
        new Place("Hamburg", "https://goo.gl/maps/mbnen1jr8C81J6vU9"),
        1592212009205,
        ["gelb", "blau", "grün", "rot"],
        987,
        "Ein Workshop teaser."
      )
    );
    this.addWorkshop(
      new Workshop(
        1,
        "PS Workshop",
        new Place("Berlin"),
        1592314101605,
        ["abcd", "fghi", "poiu"],
        37,
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ut facilisis metus. Mauris viverra ipsum in sollicitudin porttitor. Aliquam semper dolor ante, eget pellentesque arcu malesuada a."
      )
    );
    this.addWorkshop(
      new Workshop(
        33,
        "Idea Workshop",
        new Place("Berlin", "https://goo.gl/maps/TS79zqdFXi2tsekE6"),
        1591316104625,
        ["hjk", "sdf"],
        87,
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
      )
    );
    this.addWorkshop(
      new Workshop(
        31,
        "Idea Workshop",
        new Place("Berlin", "https://goo.gl/maps/TS79zqdFXi2tsekE6"),
        1291316104625,
        [
          "asdads",
          "asdasd",
          "iuiu",
          "uahduiasdojasd",
          "uhjoj",
          "iuoijoi",
          "ijojoi",
          "jiuhjiu"
        ],
        87,
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
      )
    );
    this.addWorkshop(
      new Workshop(
        93,
        "Idea Workshop",
        new Place("Berlin", "https://goo.gl/maps/TS79zqdFXi2tsekE6"),
        1191316104625,
        ["hjk", "sdf", "iuoi", "ioo easda asdasd"],
        87,
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
      )
    );
  }
}
