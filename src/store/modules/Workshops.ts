import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators";
import { Workshop } from "@/shared/models/Workshop.model";
import { Place } from "@/shared/models/Place.model";
import store from "@/store"

@Module({ dynamic: true, store, name: 'workshopStore' })
export default class WorkshopStore extends VuexModule {
  allWorkshops: Workshop[] = [];

  get workshops(): Workshop[] {
    return this.allWorkshops;
  }

  @Mutation
  public addWorkshop(workshop: Workshop) {
    this.allWorkshops.push(workshop)
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