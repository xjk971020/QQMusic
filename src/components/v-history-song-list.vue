<template>
  <div class="song-list">
    <el-table
      @row-dblclick="play"
      :data="songList"
      :highlight-current-row="true"
    >
      <el-table-column label="歌曲" width="320px">
        <template slot-scope="scope">
          <div class="name-info">
            <span class="song-name">{{ scope.row.name }}</span>
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
    </el-table>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "VHistorySongList",
  props: {
    songList: {
      type: Array
    }
  },
  methods: {
    ...mapActions(["selectPlay"]),
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
</style>
