<template>
  <div class="top-list">
    <h2 class="title">QQ音乐巅峰榜</h2>
    <div class="content">
      <el-card v-for="(list, index) in topList" :key="index" shadow="hover">
        <div @click="toDetail(list.id)">
          <div class="image" @click="toDetail(list.id)">
            <div class="pic" v-lazy:background-image="list.picUrl">
              <div class="player">
                <div class="player-icon">
                  <i class="iconfont icon-player"></i>
                </div>
              </div>
              <div class="num">
                <i class="iconfont el-icon-headset"></i
                >{{ filterCount(list.listenCount) }}
              </div>
            </div>
          </div>
          <div>
            <p
              class="song-info"
              v-for="(song, index) in list.songList"
              :key="index"
            >
              {{ index + 1 + " " + song.songname + "- " + song.singername }}
            </p>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getTopList } from "@/api/topList";
export default {
  name: "VTopList",
  data() {
    return {
      topList: [],
      queryInfo: {
        page: 1,
        limit: 40
      }
    };
  },
  created() {
    this.getTopList();
  },
  methods: {
    getTopList() {
      this.$axios
        .get(getTopList, {
          params: this.queryInfo
        })
        .then(response => {
          if (response.data.response.code === 0) {
            this.topList = response.data.response.data.topList;
            console.log(this.topList[0]);
          } else {
            this.$message.error("获取榜单信息失败");
          }
        });
    },
    filterCount(n) {
      if (n > 9999) {
        let decimal = n / 10000;
        return this._cutDecimal(decimal, 1) + "万";
      } else {
        return n;
      }
    },
    _cutDecimal(n, num) {
      return parseInt(n * Math.pow(10, num) + 0.5, 10) / Math.pow(10, num);
    },
    toDetail(id) {
      this.$router.push({
        name: `topDetail`,
        params: { id: id }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/mixin";
@import "~@/assets/scss/variable";
.top-list {
  margin: 0 20px;
  height: 75%;
  .title {
    margin-top: 15px;
    padding-bottom: 10px;
    border-bottom: 1px solid #ebebeb;
  }
  .content {
    height: 100%;
    overflow: scroll;
    .el-card {
      position: relative;
      width: 400px;
      height: 170px;
      float: left;
      background-color: #fafafa;
      margin: 10px 10px;
      cursor: pointer;
      .image {
        position: relative;
        top: -20px;
        left: -20px;
        width: 165px;
        float: left;
        .pic {
          border-radius: 4px;
          width: 165px;
          height: 165px;
          background-repeat: no-repeat;
          background-position: center center;
          background-size: cover;
          .player {
            opacity: 0;
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            transition: opacity 0.18s ease-out;
            background-color: rgba(0, 0, 0, 0.6);
            .player-icon {
              position: absolute;
              left: 50%;
              top: 50%;
              transform: translate(-50%, -50%);
              width: 44px;
              height: 44px;
              text-align: center;
              line-height: 44px;
              border-radius: 50%;
              transition: all 0.18s ease-out;
              background-color: $white;
              &:hover {
                background-color: $select-bg-color;
              }
              .iconfont {
                transition: color 0.18s ease-out;
                font-size: 24px;
              }
            }
          }
          .num {
            position: absolute;
            color: $white;
            font-size: 12px;
            right: 8%;
            bottom: 8%;
            font-weight: bold;
            background-color: rgba(0, 0, 0, 0.8);
            height: 20px;
            line-height: 20px;
            text-align: center;
            width: 70px;
            border-radius: 40px;
            .iconfont {
              font-size: 12px;
              font-weight: bold;
            }
          }
        }
        &:hover .player {
          opacity: 1;
        }
      }
      .song-info {
        height: 20px;
        line-height: 20px;
        font-size: 15px;
        @include text-overflow;
        font-family: "Helvetica Neue", Helvetica, "PingFang SC",
          "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
      }
    }
    .el-card:hover {
      transform: translateY(-9px);
      transition: all 0.3s;
    }
  }
}
</style>
