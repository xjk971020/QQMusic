<template>
  <div class="sheet-list-wrap">
    <div class="sheet-list">
      <div
        class="sheet-info pull-left"
        v-for="(sheet, index) in sheetList"
        :key="index"
      >
        <div class="image-area" @click="toSheetDetail(sheet.dissid)">
          <div class="img" v-lazy:background-image="sheet.imgurl">
            <div class="player">
              <div class="player-icon">
                <i class="iconfont icon-player"></i>
              </div>
            </div>
            <div class="num">
              <i class="iconfont el-icon-headset"></i
              >{{ filterCount(sheet.listennum) }}
            </div>
          </div>
          <div class="detail">
            <p class="dissname">{{ sheet.dissname }}</p>
            <p class="username">{{ sheet.creator.name }}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="pagination">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="totalNum"
        @current-change="pageChange"
        @prev-click="prev"
        @next-click="next"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { getSongLists } from "@/api/sheet";
export default {
  name: "SheetList",
  props: {
    categoryId: {
      type: Number
    },
    sortId: {
      type: Number
    }
  },
  data() {
    return {
      sheetList: [],
      queryInfo: {
        page: 1,
        limit: 20
      },
      totalNum: 0
    };
  },
  created() {
    this.getSongLists();
  },
  methods: {
    // 获取某个分类下的歌单信息
    getSongLists() {
      this.$axios
        .get(getSongLists, {
          params: {
            categoryId: this.categoryId,
            sortId: this.sortId,
            page: this.queryInfo.page,
            limit: this.queryInfo.limit
          }
        })
        .then(response => {
          if (response.data.response.code === 0) {
            this.sheetList = response.data.response.data.list;
            this.totalNum =
              response.data.response.data.sum / this.queryInfo.limit + 1;
          } else {
            this.$message.error("获取歌单分类信息失败");
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
    prev(page) {
      this.queryInfo.page = page;
      this.getSongLists();
    },
    next(page) {
      this.queryInfo.page = page;
      this.getSongLists();
    },
    pageChange(page) {
      this.queryInfo.page = page;
      this.getSongLists();
    },
    toSheetDetail(dissid) {
      this.$router.push({
        name: "sheetDetail",
        params: { dissid: dissid }
      });
    }
  },
  watch: {
    categoryId() {
      this.getSongLists();
    },
    sortId() {
      this.getSongLists();
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/variable";
@import "~@/assets/scss/mixin";
.sheet-list-wrap {
  height: 80%;
  width: 100%;
  overflow: scroll;
  .sheet-list {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    justify-content: flex-start;
    align-items: flex-start;
    .sheet-info {
      margin: 10px;
      cursor: pointer;
      width: 230px;
      height: 260px;
      .image-area {
        .img {
          height: 200px;
          width: 200px;
          background-repeat: no-repeat;
          background-size: cover;
          border-radius: 10px;
          position: relative;
          .player {
            opacity: 0;
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            transition: opacity 0.18s ease-out;
            background-color: rgba(0, 0, 0, 0.6);
            border-radius: 10px;
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
        .img:hover {
          transform: translateY(-10px);
          transition: all 0.3s;
          .player {
            opacity: 1;
          }
        }
        .detail {
          p {
            width: 200px;
            @include text-overflow;
          }
          p:nth-child(1) {
            font-size: 14px;
            margin-bottom: 0;
          }
          p:nth-child(1):hover {
            color: $select-bg-color;
          }
          p:nth-child(2) {
            font-size: 12px;
            color: grey;
          }
        }
      }
    }
  }
  .pagination {
    height: 30px;
    width: 100%;
    .el-pagination {
      width: 100%;
      display: flex;
      justify-content: center;
    }
  }
}
</style>
