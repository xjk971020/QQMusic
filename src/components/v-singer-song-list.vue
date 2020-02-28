<template>
  <div class="song-list">
    <el-table
      @row-dblclick="play"
      :data="songList"
      :highlight-current-row="true"
    >
      <el-table-column label="歌曲">
        <template slot-scope="scope">
          <div class="name-info">
            <span>{{ indexFilter(scope.$index) + " " }}</span>
            <span class="song-name">{{ scope.row.songname }}</span>
            <div class="now-play">
              <el-tooltip
                class="item"
                effect="dark"
                content="播放"
                placement="top-start"
              >
                <i
                  class="iconfont icon-Player"
                  @click="playMusic(scope.row)"
                ></i>
              </el-tooltip>
              <el-tooltip
                class="item"
                effect="dark"
                content="添加收藏"
                placement="top-start"
              >
                <i
                  class="iconfont icon-shoucang"
                  @click="addFavourite(scope.row)"
                ></i>
              </el-tooltip>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="专辑">
        <template slot-scope="scope">
          <span class="album-name">
            <router-link
              :to="{
                name: 'albumDetail',
                params: { albumId: scope.row.album.mid }
              }"
              >{{ scope.row.album.name }}</router-link
            ></span
          >
        </template>
      </el-table-column>
      <el-table-column label="时长">
        <template slot-scope="scope">
          {{ filterTime(scope.row.interval) }}
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination" v-if="!isHot">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="this.singerInfo.total"
        :current-page="queryInfo.page"
        :page-size="queryInfo.limit"
        @current-change="pageChange"
        @prev-click="prev"
        @next-click="next"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { getSingerDetail } from "@/api/singer";
import Song from "@/class/song";
export default {
  name: "VSingerSongList",
  props: {
    singermid: {
      type: String
    },
    isHot: {
      type: Boolean
    }
  },
  data() {
    return {
      songList: [],
      queryInfo: {
        page: 1,
        limit: 20
      },
      singerInfo: {
        total: 0
      }
    };
  },
  created() {
    if (this.isHot) {
      this.queryInfo.limit = 10;
    }
    this._getSingerDetail(
      this.singermid,
      this.queryInfo.page,
      this.queryInfo.limit
    );
  },
  methods: {
    _getSingerDetail(mid, begin, num) {
      getSingerDetail(mid, begin, num).then(res => {
        if (res.code === 0) {
          this.singerInfo = res.data;
          this.songList = this._createSonglist(res.data.list);
        }
      });
    },
    _createSonglist(list) {
      let result = [];
      list.forEach(item => {
        result.push(
          new Song({
            mid: item.musicData.songmid,
            albummid: item.musicData.albummid,
            songname: item.musicData.songname,
            singers: item.musicData.singer,
            albumname: item.musicData.albumname,
            interval: item.musicData.interval
          })
        );
      });
      return result;
    },
    ...mapActions(["selectPlay"]),
    indexFilter(value) {
      value = value + 1;
      if (value < 10) {
        value = "0" + value;
        return value;
      } else {
        return value;
      }
    },
    filterTime(time) {
      time = time | 0;
      let minute = (time / 60) | 0;
      let second = this._getzero(time % 60);
      return `${minute}:${second}`;
    },
    _getzero(time) {
      if (parseInt(time) < 10) {
        time = `0${time}`;
      }
      return time;
    },
    play(row) {
      this.selectPlay({
        list: row,
        index: 0
      });
    },
    playMusic(row) {
      this.play(row);
    },
    prev(page) {
      this.queryInfo.page = page;
      this._getSingerDetail(
        this.singermid,
        this.queryInfo.page,
        this.queryInfo.limit
      );
    },
    next(page) {
      this.queryInfo.page = page;
      this._getSingerDetail(
        this.singermid,
        this.queryInfo.page,
        this.queryInfo.limit
      );
    },
    pageChange(page) {
      this.queryInfo.page = page;
      console.log(this.queryInfo.page);
      this._getSingerDetail(
        this.singermid,
        this.queryInfo.page,
        this.queryInfo.limit
      );
    },
    toAlbumDetail(mid) {
      this.$router.push({
        name: "albumDetail",
        params: { albumId: mid }
      });
    }
  },
  watch: {
    singermid: function(newValue) {
      this._getSingerDetail(
        newValue,
        this.queryInfo.page,
        this.queryInfo.limit
      );
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/mixin";
@import "~@/assets/scss/variable";
.song-list {
  .el-table {
    .name-info {
      height: 20px;
      span {
        line-height: 20px;
        display: inline-block;
        @include text-overflow;
      }
    }
    .song-name {
      margin-left: 10px;
      width: 100px;
    }
    a {
      text-decoration: none;
      color: black;
    }
    .now-play {
      border-radius: 2px;
      color: grey;
      float: right;
      padding: 2px;
      cursor: pointer;
      margin-right: 20px;
      display: none;
      i {
        font-size: 16px;
        margin-right: 5px;
      }
    }
    tr:hover .now-play {
      display: block;
    }
    .singer-name {
      display: inline-block;
    }
    a:hover {
      color: $select-bg-color;
      cursor: pointer;
    }
    .album-name:hover {
      color: $select-bg-color;
      cursor: pointer;
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
</style>
