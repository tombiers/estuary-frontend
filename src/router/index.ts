import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import WorkshopOverview from "../views/WorkshopOverview.vue";
import WorkshopDetails from "../views/WorkshopDetails.vue";
import WorkshopStore from "@/store/modules/Workshops.ts";
import { getModule } from "vuex-module-decorators";
import { ProblemStatementWorkshopContent } from '@/shared/models/ProblemStatementWorkshopContent.model';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    redirect: '/WorkshopOverview'
  },
  {
    path: "/WorkshopOverview",
    name: "WorkshopOverview",
    component: WorkshopOverview,
    beforeEnter: (to, from, next) => {
      if (typeof to.params.searchTerm !== "undefined") {
        getModule(WorkshopStore).addFilter(to.params.searchTerm);
      }
      next();
    }
  },
  {
    path: "/WorkshopDetails/:id",
    name: "WorkshopDetails",
    component: WorkshopDetails,
    beforeEnter: (to, from, next) => {
      const tryGetWorkshop = getModule(WorkshopStore).selectWorkshop(Number(to.params.id));
      tryGetWorkshop.then(value => {
        if (value) {
          const pro = (getModule(WorkshopStore).selectedWorkshop.content as ProblemStatementWorkshopContent)
            .loadContent()
          pro.then(_ => next() );
        } else {
          next({ path: '/WorkshopOverview' })
        }
      });
    }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
