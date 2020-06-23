import Vue from "vue";
import Vuex from "vuex";

import WorkshopStore from "./modules/Workshops";

Vue.use(Vuex);

export interface RootState {
  workshops: WorkshopStore
}

// Declare empty store, register modules dynamically
export default new Vuex.Store<RootState>({});
