import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import "@/assets/scss/index.scss";

import axios from "axios";
import VIscroll from "viscroll";
import Lazyload from "vue-lazyload";
import "./plugins/element.js";
import x2js from "x2js"; //xml数据处理插件

Vue.prototype.$x2js = new x2js(); //创建x2js对象，挂到vue原型上
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

Vue.prototype.addFavourite = function(newSong) {
  // 将可获取音源的歌曲加入历史歌单中
  let favouriteSongs = window.localStorage.getItem("favourite_songs");
  if (
    favouriteSongs === undefined ||
    favouriteSongs === null ||
    favouriteSongs.trim() === ""
  ) {
    favouriteSongs = [];
    favouriteSongs.unshift(newSong);
    window.localStorage.setItem(
      "favourite_songs",
      JSON.stringify(favouriteSongs)
    );
  } else {
    favouriteSongs = JSON.parse(favouriteSongs);
    let exist = false;
    favouriteSongs.forEach(item => {
      if (item.mid === newSong.mid) {
        exist = true;
      }
    });
    if (!exist) {
      favouriteSongs.unshift(newSong);
      window.localStorage.setItem(
        "favourite_songs",
        JSON.stringify(favouriteSongs)
      );
      this.$message.success("添加成功");
    } else {
      this.$message.error("添加失败，该歌曲已在收藏列表中");
    }
  }
};

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
