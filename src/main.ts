import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import "primevue/resources/themes/nova-vue/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";

import Button from "primevue/button";
import Card from "primevue/card";

Vue.component("Button", Button);
Vue.component("Card", Card);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
