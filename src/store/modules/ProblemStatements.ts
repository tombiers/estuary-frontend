import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators";
import store from "@/store";
import { ProblemStatement } from '@/shared/models/ProblemStatement.model';
import { ProblemStatementLink } from '@/shared/models/ProblemStatementLink.model';

@Module({ dynamic: true, store, name: "ProblemStatementStore" })
export default class ProblemStatementStore extends VuexModule {
  private problemStatements: ProblemStatement[] = [];


  // returns problem statement with matching id or undefined
  get problemStatement() {
    return (id: number): ProblemStatement | undefined=> {
      return this.problemStatements.find(ps => ps.id == id);
    };
  }

  @Mutation
  public addProblemStatement(problemStatement: ProblemStatement) {
    this.problemStatements.push(problemStatement);
  }

  @Action
  public generateTestData(): void {
    [
      new ProblemStatement(1, 456, "Supporter", "dass was passiert", "es passiert nichts", "Gründe", "traurig", [
        new ProblemStatementLink(2, ["grün", "blau"]),
        new ProblemStatementLink(3, ["blau", "rot"]),
        new ProblemStatementLink(4, [])
      ]),
      new ProblemStatement(2, 245, "Supporter", "dass was passiert", "es passiert nichts", "keine Ahnung", "komisch", [
        new ProblemStatementLink(1, ["grün", "blau"])
      ]),
      new ProblemStatement(3, 49, "Supporter", "dass was passiert", "es passiert nichts", "Gründe", "traurig", [
        new ProblemStatementLink(1, ["blau", "rot"])
      ]),
      new ProblemStatement(4, 12, "Entwickler", "Kekse", "ich bekomme keine", "jemand alle aufgegessen hat", "hungrig", [
        new ProblemStatementLink(2, ["grün", "blau"]),
        new ProblemStatementLink(3, ["blau", "rot"]),
        new ProblemStatementLink(1, []),
      ]),
      new ProblemStatement(5, 347, "Lorem ipsum",
        "dolor sit amet, consetetur sadipscing elitr",
        "sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat",
        "sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.",
        "Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.At vero eos et accusam et justo duo dolores et ea rebum.Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
        [
          new ProblemStatementLink(3, [])
        ]
      )
    ].forEach(ps => this.addProblemStatement(ps));


  }

}