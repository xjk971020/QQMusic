import Vue from "vue";
import Vuex from "vuex";
import Player from "./modules/player";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    Player
  }
});
