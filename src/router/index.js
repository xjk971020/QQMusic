import Vue from "vue";
import VueRouter from "vue-router";

import Recommend from "@/views/recommend";
import SearchResult from "@/views/search-result";
import TopList from "@/views/top-list";
import TopDetail from "@/views/top-detail";
import Singers from "@/views/singers";
import SingerDetail from "@/views/singer-detail";
import SheetsIndex from "@/views/sheets-index";
import SheetDetail from "@/views/sheet-detail";
import NotFound from "@/views/notfound";

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
  },
  {
    path: "/topDetail/:id",
    name: "topDetail",
    component: TopDetail
  },
  {
    path: "/singers",
    name: "singers",
    component: Singers
  },
  {
    path: "/singer/:singerMid",
    name: "singer",
    component: SingerDetail
  },
  {
    path: "/sheets",
    name: "sheetsIndex",
    component: SheetsIndex
  },
  {
    path: "/sheet/:dissid",
    name: "sheetDetail",
    component: SheetDetail
  },
  {
    path: '*',
    component: NotFound
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
