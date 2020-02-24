<template>
  <div class="history-content-wrap">
    <div class="head-info">
      <h1 class="title">播放历史</h1>
      <p class="num">共 {{ total }} 首</p>
      <div class="select clearfix">
        <button class="pull-left play-all" @click="playAll">
          <i class="iconfont icon-player"></i>全部播放
        </button>
        <button class="pull-right search">
          <i class="iconfont icon-suosou"></i>搜索
        </button>
      </div>
    </div>
    <v-history-song-list :songList="songList"></v-history-song-list>
  </div>
</template>

<script>
  import { mapMutations} from "vuex";
import VHistorySongList from "@/components/v-history-song-list";
export default {
  name: "History",
  components: {
    VHistorySongList
  },
  data() {
    return {
      songList: [],
      total: 0
    };
  },
  created() {
    this.songList = JSON.parse(window.localStorage.getItem("history_songs"));
    if (this.songList !== null && this.songList.length !== 0) {
      this.total = this.songList.length;
    }
  },
  methods: {
    ...mapMutations([
      "SET_CURRENT_INDEX",
      "SET_PLAY_LIST",
      "SET_SEQUENCE_LIST"
    ]),
    playAll() {
      this.SET_PLAY_LIST(this.songList);
      this.SET_SEQUENCE_LIST(this.songList);
      this.SET_CURRENT_INDEX(0);
    },
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
