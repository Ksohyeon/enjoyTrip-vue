import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";

// Import Bootstrap and BootstrapVue CSS files (order is important)
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import "../node_modules/timeline-vuejs/dist/timeline-vuejs.css";
// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);

Vue.config.productionTip = false;

Vue.filter("enterToBr", (value) => {
  if (!value) {
    return value;
  }
  // 문자열에 enter값을 <br />로 변경.(html상에서 줄바꿈 처리)
  return value.replace(/(?:\r\n|\r|\n)/g, "<br />");
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
