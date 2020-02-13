import Vue from "vue";
import VueRouter from "vue-router";

import Selected from "@/components/v-selected";
import SearchResult from "@/views/search-result";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/selected"
  },
  {
    path: "/selected",
    name: "selected",
    component: Selected
  },
  {
    path: "/search/:searchContent",
    name: "search",
    component: SearchResult
  }
];

const router = new VueRouter({
  routes
});

const routerPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error => error);
};

export default router;
