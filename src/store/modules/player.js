import { mode } from "@/util/config";
import * as types from "../types";
import { shuffle } from "@/util/util";

const state = {
  isNull: true,
  playing: false,
  fullScreen: false,
  // 播放歌曲时, 记录的播放历史记录，当播放模式改变时，改变的是这个列表的顺序
  sequenceList: [],
  // 精选点击播放歌单时, 播放的歌单
  playList: [],
  // 播放历史的歌曲列表
  historyList: [],
  // 添加收藏的歌曲列表
  favouriteList: [],
  mode: mode.sequence,
  currentIndex: -1
};

const getters = {
  isNull: state => state.isNull,
  playing: state => state.playing,
  fullScreen: state => state.fullScreen,
  sequenceList: state => state.sequenceList,
  playList: state => state.playList,
  historyList: state => state.historyList,
  favouriteList: state => state.favouriteList,
  mode: state => state.mode,
  currentIndex: state => state.currentIndex,
  // 顺序播放的当前歌曲
  currentSong: state => {
    return state.playList[state.currentIndex] || {};
  }
};

const mutations = {
  [types.SET_ISNULL_STATE](state, flag) {
    state.isNull = flag;
  },
  [types.SET_PLAYING_STATE](state, flag) {
    state.playing = flag;
  },
  [types.SET_FULL_SCREEN_STATE](state, flag) {
    state.fullScreen = flag;
  },
  [types.SET_SEQUENCE_LIST](state, list) {
    state.sequenceList = list;
  },
  [types.ADD_SEQUENCE_SONG](state, list) {
    if (state.sequenceList.length > 0) {
      let songIndex = state.sequenceList.findIndex(item => {
        return item.mid === list.mid;
      });
      // 如果存在已经添加过的歌曲，则删去原来的元素，添加到首位
      if (songIndex >= 0) {
        state.sequenceList.splice(songIndex, 1);
      }
    }
    state.sequenceList.unshift(list);
    console.log("sequenceList:");
    state.sequenceList.forEach(item => {
      console.log(item.singer[0].name);
    });
  },
  [types.SET_PLAY_LIST](state, list) {
    state.playList = list;
  },
  [types.ADD_HISTORY_SONG](state, list) {
    // if (state.historyList.length > 0) {
    //   let songIndex = state.historyList.findIndex(item => {
    //     return item.mid === list.mid;
    //   });
    //   // 如果存在已经添加过的歌曲，则删去原来的元素，添加到首位
    //   if (songIndex >= 0) {
    //     state.historyList.splice(songIndex, 1);
    //   }
    // }
    // state.historyList.unshift(list);
    // console.log("historyList:");
    // state.historyList.forEach(item => {
    //   console.log(item.name);
    // });
    if(state) {
      return state;
    } else  {
      return list;
    }
  },
  [types.ADD_FAVOURITE_SONG](state, list) {
    state.favouriteList.unshift(list);
  },
  [types.SET_MODE](state, mode) {
    state.mode = mode;
  },
  [types.SET_CURRENT_INDEX](state, index) {
    state.currentIndex = index;
  }
};

const actions = {
  // list为新加入的歌曲信息
  selectPlay({ commit, state }, { list, index }) {
    commit(types.SET_PLAYING_STATE, true);
    commit(types.ADD_SEQUENCE_SONG, list);
    if (state.mode === mode.random) {
      let randomList = shuffle(state.sequenceList);
      commit(types.SET_PLAY_LIST, randomList);
      index = randomList.findIndex(item => {
        return item.mid === list.mid;
      });
    } else {
      commit(types.SET_PLAY_LIST, state.sequenceList);
    }
    commit(types.SET_CURRENT_INDEX, index);
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
