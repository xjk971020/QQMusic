<template>
  <div class="history-content-wrap">
    <div class="head-info">
      <h1 class="title">我的收藏</h1>
      <p class="num">共 {{ total }} 首</p>
      <div class="select clearfix">
        <button class="pull-left play-all" @click="playAll">
          <i class="iconfont icon-player"></i>全部播放
        </button>
        <input
          @blur="search = false"
          :style="search ? 'display:block' : ''"
          v-model="searchContent"
          type="text"
          class="search-input iconfont pull-right"
          placeholder="搜索音乐"
          ref="searchInput"
        />
        <button class="pull-right search-btn" @click="searchNow()">
          <i class="iconfont icon-suosou"></i>搜索
        </button>
      </div>
    </div>
    <v-history-song-list :songList="searchSongList"></v-history-song-list>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import VHistorySongList from "@/components/v-history-song-list";
export default {
  name: "Favourite",
  components: {
    VHistorySongList
  },
  data() {
    return {
      songList: [],
      total: 0,
      searchContent: "",
      search: false,
      searchSongList: []
    };
  },
  created() {
    this.songList = JSON.parse(window.localStorage.getItem("favourite_songs"));
    this.searchSongList = this.songList;
    if (this.songList !== null && this.songList.length !== 0) {
      this.total = this.songList.length;
    }
  },
  methods: {
    ...mapMutations([
      "SET_CURRENT_INDEX",
      "SET_PLAY_LIST",
      "SET_SEQUENCE_LIST",
      "SET_PLAYING_STATE"
    ]),
    playAll() {
      this.SET_PLAY_LIST(this.songList);
      this.SET_SEQUENCE_LIST(this.songList);
      this.SET_PLAYING_STATE(true);
      this.SET_CURRENT_INDEX(0);
    },
    searchNow() {
      this.search = true;
      this.$nextTick(() => {
        this.$refs.searchInput.focus();
      });
    }
  },
  watch: {
    searchContent: function(newValue) {
      let result = [];
      this.songList.forEach(item => {
        if (item.name.indexOf(newValue) !== -1) {
          result.push(item);
        }
      });
      this.searchSongList = result;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/variable";
.history-content-wrap {
  margin: 10px 20px;
  .head-info {
    .title {
      margin-top: 10px;
    }
    .num {
      color: #868686;
    }
    .select {
      height: 30px;
      .search-btn {
        outline: none;
        border: none;
        font-size: 15px;
      }
      .search-input {
        display: none;
        position: absolute;
        border-radius: $border-radius-bg;
        right: 20px;
        outline: none;
        border: none;
        height: 30px;
        width: 250px;
        background-color: #e6e6e6;
        padding-left: 25px;
      }
      .search-btn {
        margin-left: -30px;
        z-index: 10;
        cursor: pointer;
        background-color: transparent;
        border: 0;
        outline: 0;
      }
      .search-btn:hover {
        color: $select-bg-color;
      }
    }
    .play-all {
      cursor: pointer;
      outline: none;
      border: none;
      border-radius: 20px;
      background-color: #1fcfa1;
      font-size: 15px;
      font-family: "Helvetica Neue", Helvetica, "PingFang SC",
        "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
      color: #fff;
      font-weight: bold;
      height: 30px;
      width: 110px;
      .iconfont {
        margin-right: 5px;
      }
    }
    .play-all:hover {
      background-color: $select-bg-color;
    }
  }
}
</style>
