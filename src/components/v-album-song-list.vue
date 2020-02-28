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
      <el-table-column label="歌手">
        <template slot-scope="scope">
          <span
            class="singer-name"
            v-for="(singer, index) in scope.row.singer"
            :key="index"
          >
            <span v-if="index !== 0"> / </span>
            <router-link :to="{ path: '/singer/' + singer.mid }">{{
              singer.name
            }}</router-link>
          </span>
        </template>
      </el-table-column>
      <el-table-column label="时长">
        <template slot-scope="scope">
          {{ filterTime(scope.row.interval) }}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "VAlbumSongList",
  props: {
    songList: {
      type: Array
    }
  },
  methods: {
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
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/mixin";
@import "~@/assets/scss/variable";
.song-list {
  position: relative;
  z-index: 10;
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
</style>
