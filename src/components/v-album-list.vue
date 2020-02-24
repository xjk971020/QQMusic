<template>
  <div class="album-list-wrap">
    <div class="album-list">
      <div
        class="album-single"
        v-for="(album, index) in singerAlbums"
        :key="index"
      >
        <div class="img" v-lazy:background-image="album.url" @click="toAlbumDetail(album.mid)">
          <div class="player">
            <div class="player-icon">
              <i class="iconfont icon-player"></i>
            </div>
          </div>
        </div>
        <div class="detail">
          <p class="name" @click="toAlbumDetail(album.mid)">{{ album.name }}</p>
          <p class="time">{{ album.time }}</p>
        </div>
      </div>
      <div class="pagination" v-if="!isHot">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="albumLength"
          @current-change="pageChange"
          @prev-click="prev"
          @next-click="next"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { getSingerAlbums } from "@/api/album";
import List from "@/class/list";
export default {
  name: "VAlbumList",
  props: {
    singermid: {
      type: String
    },
    albumLength: {
      type: Number
    },
    isHot: {
      type: Boolean
    }
  },
  data() {
    return {
      queryInfo: {
        page: 1,
        limit: 10
      },
      singerAlbums: []
    };
  },
  created() {
    if (this.isHot) {
      this.queryInfo.limit = 5;
    }
    this._getSingerAlbums(
      this.singermid,
      this.queryInfo.page,
      this.queryInfo.limit
    );
  },
  methods: {
    _getSingerAlbums(mid, begin, num) {
      getSingerAlbums(mid, begin, num).then(res => {
        if (res.code === 0) {
          this.singerAlbums = this._createSingerAlbums(res.data.list);
        }
      });
    },
    _createSingerAlbums(list) {
      let result = [];
      list.forEach(item => {
        result.push(
          new List({
            id: item.albumID,
            mid: item.albumMID,
            name: item.albumName,
            url: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${item.albumMID}.jpg?max_age=2592000`,
            time: item.pubTime
          })
        );
      });
      return result;
    },
    prev(page) {
      this.queryInfo.page = page;
      this._getSingerAlbums(
        this.singermid,
        this.queryInfo.page,
        this.queryInfo.limit
      );
    },
    next(page) {
      this.queryInfo.page = page;
      this._getSingerAlbums(
        this.singermid,
        this.queryInfo.page,
        this.queryInfo.limit
      );
    },
    pageChange(page) {
      this.queryInfo.page = page;
      this._getSingerAlbums(
        this.singermid,
        this.queryInfo.page,
        this.queryInfo.limit
      );
    },
    toAlbumDetail(mid) {
      this.$router.push({
        name: 'albumDetail',
        params: { albumId: mid }
      })
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/variable";
@import "~@/assets/scss/mixin";
.album-list-wrap {
  .album-list {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    .album-single {
      width: 200px;
      height: 250px;
      margin: 20px;
      .detail {
        p {
          width: 200px;
          @include text-overflow;
        }
        p:nth-child(1) {
          font-size: 14px;
          margin-bottom: 0;
          cursor: pointer;
        }
        p:nth-child(1):hover {
          color: $select-bg-color;
        }
        p:nth-child(2) {
          font-size: 12px;
          color: grey;
        }
      }
      .img {
        cursor: pointer;
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
