<template>
  <div class="album-detail">
    <div class="album-info">
      <h1 class="album-name">{{ albumInfo.name }}</h1>
      <p>{{ albumInfo.singername }}</p>
      <p>
        <span>{{ albumInfo.aDate }}</span>
        <span>{{ albumInfo.genre }}</span>
      </p>
      <button class="play-all" @click="playAll()">
        <i class="iconfont icon-player"></i>播放全部
      </button>
    </div>
    <ul class="sort">
      <li
        class="pull-left"
        :class="songListShow ? 'sort-active' : ''"
        @click="showSongList()"
      >
        歌曲
      </li>
      <li
        class="pull-left"
        :class="!songListShow ? 'sort-active' : ''"
        @click="notShowSongList()"
      >
        专辑信息
      </li>
    </ul>
    <div v-if="songListShow">
      <v-album-song-list :songList="songList"></v-album-song-list>
      <div class="other-album-wrap">

      </div>
    </div>
    <div class="album-detail-info" v-else>
      <p>
        <span>专辑：</span>
        <span>{{ albumInfo.name }}</span>
      </p>
      <p>
        <span>歌手：</span>
        <span>{{ albumInfo.singername }}</span>
      </p>
      <p>
        <span>流派：</span>
        <span>{{ albumInfo.genre }}</span>
      </p>
      <p>
        <span>语言：</span>
        <span>{{ albumInfo.lan }}</span>
      </p>
      <p>
        <span>唱片公司：</span>
        <span>{{ albumInfo.company }}</span>
      </p>
      <p>
        <span>专辑简介：</span>
        <pre class="desc">{{ albumInfo.desc }}</pre>
      </p>
    </div>
  </div>
</template>

<script>
import { getAlbumInfo,getSingerAlbum } from "@/api/album";
import VAlbumSongList from "@/components/v-album-song-list";
import { mapMutations } from "vuex";
export default {
  name: "AlbumDetail",
  data() {
    return {
      albumId: "",
      albumInfo: {},
      songList: [],
      songListShow: true
    };
  },
  components: {
    VAlbumSongList
  },
  created() {
    this.albumId = this.$route.params.albumId;
    this.getAlbumInfo();
  },
  methods: {
    getAlbumInfo() {
      this.$axios.get(getAlbumInfo + this.albumId).then(response => {
        if (response.data.response.code === 0) {
          this.songList = response.data.response.data.list;
          this.albumInfo = response.data.response.data;
          console.log(this.albumInfo)
        } else {
          this.$message.error("获取专辑信息失败");
        }
      });
    },
    getSingerAlbum() {
      this.$axios.get(getSingerAlbum + this.albumInfo.singermid).then(response => {
        if (response.data.response.code === 0) {
          this.songList = response.data.response.data.list;
          this.albumInfo = response.data.response.data;
          console.log(this.albumInfo.desc);
        } else {
          this.$message.error("获取专辑信息失败");
        }
      });
    },
    ...mapMutations([
      "SET_CURRENT_INDEX",
      "SET_PLAY_LIST",
      "SET_SEQUENCE_LIST"
    ]),
    playAll() {
      this.SET_PLAY_LIST(this.songList);
      this.SET_CURRENT_INDEX(0);
    },
    notShowSongList() {
      this.songListShow = false;
    },
    showSongList() {
      this.songListShow = true;
    },
    replaceBr(value) {
      // console.log(value);
      let newValue = value.replace(/\\n/gm, "<br/>");
      // console.log(newValue);
      return newValue;
    }
  },
  watch: {
    $route() {
      this.albumId = this.$route.params.albumId;
      this.getAlbumInfo();
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/mixin";
@import "~@/assets/scss/variable";
.album-detail {
  overflow: scroll;
  margin: 0 20px;
  height: 83%;
  font-family: "Microsoft YaHei", 微软雅黑, "MicrosoftJhengHei", 华文细黑,
    STHeiti, MingLiu, serif;
  .album-info {
    height: 200px;
    box-shadow: 0 0 5px #999;
    margin: 5px;
    padding: 15px;
    .album-name {
      margin: 5px 0;
    }
    p {
      font-size: 12px;
      margin: 25px 0;
      color: #868686;
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
  .sort {
    list-style: none;
    height: 16px;
    padding: 0 5px;
    margin-top: 20px;
    margin-bottom: 10px;
    font-size: 15px;
    cursor: pointer;
    li {
      margin-right: 15px;
    }
  }
  .album-detail-info {
    margin-top: 30px;
    p {
      display: flex;
      font-size: 14px;
      span:first-child {
        width: 100px;
        min-width: 100px;
      }
      span {
        line-height: 23px;
      }
      .desc {
        margin: 0;
        width: 100%;
        font-family: "Microsoft YaHei", 微软雅黑, "MicrosoftJhengHei", 华文细黑,
          STHeiti, MingLiu, serif;
        line-height: 23px;
        font-size: 14px;
        white-space:pre-wrap;
      }
    }
    p:nth-child(1),
    p:nth-child(2),
    p:nth-child(4),
    p:nth-child(5),
    p:nth-child(6) {
      span:nth-child(2) {
        color: #868686;
      }
      pre {
        color: #868686;
      }
    }
  }
  .sort-active {
    font-weight: bold;
    padding-bottom: 5px;
    color: $select-bg-color;
    border-bottom: 2px solid $select-bg-color;
  }
}
</style>
