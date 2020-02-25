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
import SheetSingle from "@/views/sheet-single";
import SheetSort from "@/views/sheet-sort";
import AlbumDetail from "@/views/album-detail";
import History from "@/views/history";
import Favourite from "@/views/favourite";
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
    path: "/sheet/single/:categoryId/:categoryName",
    name: "sheetSingle",
    component: SheetSingle
  },
  {
    path: "/all/sheet",
    name: "sheetSort",
    component: SheetSort
  },
  {
    path: "/album/:albumId",
    name: "albumDetail",
    component: AlbumDetail
  },
  {
    path: "/history",
    name: history,
    component: History
  },
  {
    path: "/favourite",
    name: Favourite,
    component: Favourite
  },
  {
    path: "*",
    component: NotFound
  }
];

const router = new VueRouter({
  routes
});

export default router;
