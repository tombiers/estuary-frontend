import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import { VcAFrame, VcAColumn, VcABox, VcAInfoBox, VcAFilterTag } from 'vca-widget-base'
import 'vca-widget-base/dist/vca-widget-base.css'

import "primevue/resources/themes/nova-vue/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";

import Button from "primevue/button";
import Card from "primevue/card";

Vue.component("Button", Button);
Vue.component("Card", Card);
Vue.component("VcAFrame", VcAFrame);
Vue.component("VcAColumn",VcAColumn);
Vue.component("VcABox",VcABox);
Vue.component("VcAInfoBox",VcAInfoBox);
Vue.component("VcAFilterTag",VcAFilterTag);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
