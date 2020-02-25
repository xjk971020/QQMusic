<template>
  <div class="top-detail">
    <div class="top-list-info clearfix">
      <div
        class="img pull-left"
        v-lazy:background-image="topListDetail.frontPicUrl"
      >
        <div class="intro">
          <i class="iconfont el-icon-info"></i>
          <div class="top-rule">
            <h3>榜单规则:</h3>
            <p v-html="topListDetail.intro"></p>
          </div>
        </div>
      </div>
      <div class="info pull-left">
        <h1>{{ topListDetail.title }}</h1>
        <div class="detail">
          <p class="update-time">更新时间: {{ topListDetail.updateTime }}</p>
          <p class="detail-intro">简介: {{ topListDetail.titleShare }}</p>
        </div>
        <div class="btns">
          <button class="play-all" @click="playAll">
            <i class="iconfont icon-player"></i>全部播放
          </button>
        </div>
      </div>
    </div>
    <div class="songList">
      <v-song-list :songList="songList"></v-song-list>
    </div>
  </div>
</template>

<script>
import { getRankDetail } from "@/api/topList";
import VSongList from "@/components/v-song-list";
import { mapMutations } from "vuex";
export default {
  name: "TopDetail",
  data() {
    return {
      // 巅峰榜单详细信息
      topListDetail: {},
      // 歌曲信息
      songList: [],
      queryInfo: {
        topId: 0
      }
    };
  },
  components: {
    VSongList
  },
  created() {
    this.queryInfo.topId = this.$route.params.id;
    // 接口有问题, 不管topid为多少, 获取的全是 流行指数榜 的数据
    this.getListDetail();
  },
  methods: {
    getListDetail() {
      this.$axios
        .get(getRankDetail, { params: this.queryInfo })
        .then(response => {
          if (response.data.response.detail.code === 0) {
            this.songList = response.data.response.detail.data.songInfoList;
            this.topListDetail = response.data.response.detail.data.data;
            console.log(this.songList);
          }
        });
      console.log(this.songList);
    },
    ...mapMutations([
      "SET_CURRENT_INDEX",
      "SET_PLAY_LIST",
      "SET_SEQUENCE_LIST"
    ]),
    playAll() {
      this.SET_PLAY_LIST(this.songList);
      this.SET_CURRENT_INDEX(0);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/variable";
.top-detail {
  overflow: scroll;
  margin: 0 20px;
  height: 83%;
  .top-list-info {
    margin: 10px 20px;
    height: 210px;
    .img {
      height: 200px;
      width: 200px;
      border-radius: 12px;
      background-repeat: no-repeat;
      background-size: cover;
      background-position: center center;
      position: relative;
      z-index: 50;
      .intro {
        position: absolute;
        font-size: 14px;
        color: grey;
        left: 3%;
        bottom: 3%;
        .iconfont {
          cursor: pointer;
        }
        .iconfont:hover {
          color: rgba(0, 0, 0, 0.6);
        }
        &:hover .top-rule {
          display: block;
        }
        .top-rule {
          margin-top: 10px;
          display: none;
          box-shadow: 0 0 5px #999;
          position: absolute;
          line-height: 20px;
          font-size: 12px;
          width: 400px;
          background-color: $white;
          h3 {
            padding-left: 3px;
          }
          p {
            padding: 3px 3px;
          }
        }
      }
    }
    .info {
      height: 200px;
      padding-left: 15px;
      h1 {
        margin-top: 0px;
      }
      .detail {
        position: relative;
        z-index: 50;
        margin-top: 40px;
        .update-time {
          margin-top: 20px;
          font-size: 14px;
          color: grey;
        }
        .detail-intro {
          font-size: 14px;
        }
      }
      .btns {
        margin-top: 45px;
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
  }
  .songList {
    height: 65%;
    position: relative;
    margin: 10px 20px;
  }
}
</style>
