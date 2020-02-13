import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import "@/assets/scss/index.scss"

import axios from "axios";
import VIscroll from "viscroll";
import Lazyload from "vue-lazyload";

axios.defaults.baseURL = "http://127.0.0.1:3200/";
Vue.prototype.$axios = axios;

Vue.use(VIscroll, {
  mouseWheel: true,
  scrollbars: true,
  fadeScrollbars: true,
  interactiveScrollbars: true,
  preventDefault: true,
  tap: false,
  bounce: false,
  disableTouch: true,
  disableMouse: true,
  disablePointer: true
});

Vue.use(Lazyload, {
  error: require("./assets/images/lazyloading.png"),
  loading: require("./assets/images/lazyloading.png")
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
