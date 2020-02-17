import { mode } from "@/util/config";
import * as types from "../types";
import { shuffle } from "@/util/util";

const state = {
  isNull: true,
  playing: false,
  fullScreen: false,
  sequenceList: [],
  playList: [],
  mode: mode.sequence,
  currentIndex: -1
};

const getters = {
  isNull: state => state.isNull,
  playing: state => state.playing,
  fullScreen: state => state.fullScreen,
  // 播放歌曲时, 记录的播放历史记录
  sequenceList: state => state.sequenceList,
  // 精选点击播放歌单时, 播放的歌单
  playList: state => state.playList,
  mode: state => state.mode,
  currentIndex: state => state.currentIndex,
  // 顺序播放的当前歌曲
  currentSong: state => {
    return state.sequenceList[state.currentIndex] || {};
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
    state.sequenceList.unshift(list);
  },
  [types.SET_PLAY_LIST](state, list) {
    state.playList = list;
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
      commit(types.SET_SEQUENCE_LIST, randomList);
      index = randomList.findIndex(item => {
        return item[index].mid === list.mid;
      });
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
