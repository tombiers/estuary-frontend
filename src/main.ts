import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueI18n from 'vue-i18n'
import { messages, defaultLocale } from "@/i18n";

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
import Dropdown from 'primevue/dropdown';
import InputSwitch from 'primevue/inputswitch';
import Textarea from 'primevue/textarea';
import ToggleButton from 'primevue/togglebutton';
import Tooltip from 'primevue/tooltip';

Vue.component("Button", Button);
Vue.component("AutoComplete", AutoComplete);
Vue.component("Calendar", Calendar);
Vue.component("Dropdown", Dropdown);
Vue.component("InputSwitch", InputSwitch);
Vue.component("Textarea", Textarea);
Vue.component("ToggleButton", ToggleButton);
Vue.component("VcAFrame", VcAFrame);
Vue.component("VcAColumn", VcAColumn);
Vue.component("VcABox", VcABox);
Vue.component("VcAInfoBox", VcAInfoBox);
Vue.component("VcAFilterTag", VcAFilterTag);

Vue.directive('tooltip', Tooltip);

Vue.config.productionTip = false;

Vue.use(VueI18n);

export const i18n = new VueI18n({
  messages,
  locale: defaultLocale,
  fallbackLocale: defaultLocale
});

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount("#app");
