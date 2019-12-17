import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;

// External libraries
import SmoothPageScroller from "./utils/SmoothPageScroller.js";

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

SmoothPageScroller();
