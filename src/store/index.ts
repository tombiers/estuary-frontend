import Vue from "vue";
import Vuex from "vuex";

import WorkshopStore from "./modules/Workshops";
import ProblemStatementStore from './modules/ProblemStatements';

Vue.use(Vuex);

export interface RootState {
  workshops: WorkshopStore;
  problemStatements: ProblemStatementStore;
}

// Declare empty store, register modules dynamically
export default new Vuex.Store<RootState>({});
