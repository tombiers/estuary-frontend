import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../views/Home.vue";
import WorkshopOverview from "../views/WorkshopOverview.vue";
import WorkshopDetails from "../views/WorkshopDetails.vue";
import WorkshopStore from "@/store/modules/Workshops.ts";
import { getModule } from "vuex-module-decorators";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: "/WorkshopOverview",
    name: "WorkshopOverview",
    component: WorkshopOverview
  },
  {
    path: "/WorkshopDetails/:id",
    name: "WorkshopDetails",
    component: WorkshopDetails,
    beforeEnter: (to, from, next) => {
      const tryGetWorkshop = getModule(WorkshopStore).selectWorkshop(Number(to.params.id));
      tryGetWorkshop.then(value => {
        if (value) {
          next();
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
