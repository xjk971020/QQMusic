import Vue from "vue";
import VueRouter from "vue-router";

import Recommend from "@/views/recommend";
import SearchResult from "@/views/search-result";
import TopList from "@/views/top-list";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/recommend"
  },
  {
    path: "/recommend",
    name: "Recommend",
    component: Recommend
  },
  {
    path: "/search/:searchContent",
    name: "search",
    component: SearchResult
  },
  {
    path: "/topList",
    name: "topList",
    component: TopList
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
