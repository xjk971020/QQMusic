<template>
  <div class="sheet-detail">
    <div class="sheet-detail-info">
      <div class="image-area pull-left">
        <div class="img" v-lazy:background-image="cdlist.logo"></div>
      </div>
      <div class="info pull-left">
        <h1 class="title">{{ cdlist.dissname }}</h1>
        <p class="tags">
          <span class="nickname">
            <span
              class="head-pic"
              v-lazy:background-image="cdlist.headurl"
            ></span>
            {{ cdlist.nickname }}
          </span>
          <span class="tag" v-for="(tag, index) in cdlist.tags" :key="index">
            {{ "#" + tag.name }}
          </span>
        </p>
        <div class="bottom-detail" v-if="!show">
          <div class="desc">
            <span v-text="cdlist.desc"></span>
            <button class="pull-right" @click="show = !show">[详情]</button>
          </div>
          <div class="btn">
            <button class="play-all" @click="playAll">
              <i class="iconfont icon-player"></i>全部播放
            </button>
          </div>
        </div>
        <div class="bottom-detail-show" v-else>
          <div class="desc-show">
            <span v-html="cdlist.desc"></span>
            <button class="pull-right" @click="show = !show">[详情]</button>
          </div>
        </div>
      </div>
    </div>
    <ul class="sort">
      <li
        :class="songListShow ? 'sort-active' : ''"
        @click="songListShow = true"
      >
        歌曲
      </li>
      <li
        :class="!songListShow ? 'sort-active' : ''"
        @click="songListShow = false"
      >
        评论
      </li>
    </ul>
    <v-song-list :songList="songList" v-if="songListShow"></v-song-list>
    <v-comment-list v-else></v-comment-list>
  </div>
</template>

<script>
import { getSongListDetail } from "@/api/sheet";
import VSongList from "@/components/v-song-list";
import VCommentList from "@/components/v-comment-list";
import { mapMutations } from "vuex";
export default {
  name: "SheetDetail",
  components: { VSongList, VCommentList },
  data() {
    return {
      // 歌单id
      disstid: 0,
      // 歌单信息
      cdlist: {},
      show: false,
      //展示歌单页面, false展示评论界面
      songListShow: true,
      songList: []
    };
  },
  created() {
    this.disstid = this.$route.params.dissid;
    this.getSongListDetail();
  },
  methods: {
    ...mapMutations([
      "SET_CURRENT_INDEX",
      "SET_PLAY_LIST",
      "SET_SEQUENCE_LIST",
      "SET_PLAYING_STATE"
    ]),
    getSongListDetail() {
      this.$axios.get(getSongListDetail + this.disstid).then(response => {
        if (response.data.response.code === 0) {
          this.cdlist = response.data.response.cdlist[0];
          this.songList = this.cdlist.songlist;
        } else {
          this.$message.error("获取歌单信息失败");
        }
      });
    },
    playAll() {
      this.SET_PLAY_LIST(this.songList);
      this.SET_SEQUENCE_LIST(this.songList);
      this.SET_PLAYING_STATE(true);
      this.SET_CURRENT_INDEX(0);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/variable";
@import "~@/assets/scss/mixin";
.sheet-detail {
  height: 85%;
  width: 96%;
  margin: 15px auto;
  overflow: scroll;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  .sheet-detail-info {
    height: 190px;
    width: 100%;
    position: relative;
    z-index: 30;
    .image-area {
      .img {
        width: 170px;
        height: 170px;
        margin: 10px;
        background-repeat: no-repeat;
        background-size: cover;
        border-radius: 10px;
      }
    }
    .info {
      width: 80%;
      height: 190px;
      margin-left: 20px;
      .title {
        font-family: "Microsoft YaHei", 微软雅黑, "MicrosoftJhengHei", 华文细黑,
          STHeiti, MingLiu, serif;
        font-weight: bolder;
      }
      .tags {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        span {
          font-size: 14px;
          margin-right: 10px;
        }
        .nickname {
          display: flex;
          align-items: center;
          .head-pic {
            display: inline-block;
            height: 25px;
            width: 25px;
            background-repeat: no-repeat;
            background-size: cover;
            border-radius: 50%;
          }
        }
        .nickname:hover {
          color: $select-bg-color;
          cursor: pointer;
        }
        .tag {
          color: #868686;
        }
      }
      .bottom-detail {
        .desc {
          color: #868686;
          height: 20px;
          font-size: 14px;

          span {
            display: inline-block;
            height: 20px;
            width: 80%;
            @include text-overflow;
          }
          button {
            outline: none;
            border: none;
            cursor: pointer;
          }
          button:hover {
            color: $select-bg-color;
          }
        }
        .btn {
          margin-top: 15px;
          .play-all {
            cursor: pointer;
            outline: none;
            border: none;
            border-radius: 20px;
            background-color: #1fcfa1;
            font-size: 15px;
            font-family: "Helvetica Neue", Helvetica, "PingFang SC",
              "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial,
              sans-serif;
            color: #fff;
            font-weight: bold;
            height: 30px;
            width: 110px;
            .iconfont {
              margin-right: 5px;
            }
          }
        }
      }
      .bottom-detail-show {
        width: 100%;
        box-shadow: 0 0 33px #ccc;
        min-height: 50px;
        .desc-show {
          background-color: $white;
          color: #868686;
          font-size: 14px;
          padding: 10px;
          span {
            width: 90%;
          }
          button {
            outline: none;
            border: none;
            cursor: pointer;
          }
          button:hover {
            color: $select-bg-color;
          }
        }
      }
    }
  }
  .sort {
    list-style: none;
    height: 15px;
    /*margin: 10px;*/
    padding-left: 5px;
    position: relative;
    z-index: 20;
    li {
      float: left;
      margin-right: 10px;
      cursor: pointer;
    }
  }
  .sort-active {
    padding-bottom: 3px;
    border-bottom: 2px solid $select-bg-color;
  }
}
</style>
