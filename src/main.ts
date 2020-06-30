import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import {
  VcAFrame,
  VcAColumn,
  VcABox,
  VcAInfoBox,
  VcAFilterTag
} from "vca-widget-base";
import "vca-widget-base/dist/vca-widget-base.css";

import "primevue/resources/themes/nova-vue/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";

import Button from "primevue/button";
import AutoComplete from "primevue/autocomplete";
import Calendar from 'primevue/calendar';
import InputSwitch from 'primevue/inputswitch';

Vue.component("Button", Button);
Vue.component("AutoComplete", AutoComplete);
Vue.component("Calendar", Calendar);
Vue.component("InputSwitch", InputSwitch);
Vue.component("VcAFrame", VcAFrame);
Vue.component("VcAColumn", VcAColumn);
Vue.component("VcABox", VcABox);
Vue.component("VcAInfoBox", VcAInfoBox);
Vue.component("VcAFilterTag", VcAFilterTag);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
