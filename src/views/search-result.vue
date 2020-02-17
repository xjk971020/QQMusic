<template>
  <div class="search">
    <div class="searchContent">
      <p>
        搜索内容: <span>{{ queryInfo.key | addQuotation }}</span>
      </p>
    </div>
    <div class="content">
      <div class="sort">
        <ul>
          <li
            :class="queryInfo.catZhida === '0' ? 'active' : ''"
            @click.prevent="searchSongs()"
          >
            歌曲
          </li>
          <li
            :class="queryInfo.catZhida === '2' ? 'active' : ''"
            @click.prevent="searchSingers()"
          >
            歌手
          </li>
          <li v-if="songsShow" class="totalNum">
            <span>总共: {{ this.totalNum }} 首</span>
          </li>
        </ul>
      </div>
      <div class="list">
        <!--搜索的歌曲列表-->
        <el-table
          v-if="songsShow"
          ref="songsTable"
          height="600px"
          v-el-table-infinite-scroll="load"
          v-loading="loading"
          :element-loading-text="loadingText"
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(0, 0, 0, 0)"
          @row-dblclick="play"
          :data="tableData"
        >
          <el-table-column label="歌曲" width="300">
            <template slot-scope="scope">
              <span class="song-name">
                {{ scope.row.name }}
              </span>
              <div class="now-play">
                <el-tooltip
                  class="item"
                  effect="dark"
                  content="播放"
                  placement="top-start"
                >
                  <i
                    class="iconfont el-icon-video-play"
                    @click="playMusic(scope.row)"
                  ></i>
                </el-tooltip>
                <el-tooltip
                  class="item"
                  effect="dark"
                  content="添加收藏"
                  placement="top-start"
                >
                  <i class="iconfont el-icon-circle-plus-outline"></i>
                </el-tooltip>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="歌手" width="400">
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
                  :to="{ path: '/album/detail/' + scope.row.album }"
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
        <!--搜索歌手列表-->
        <div class="singer-list" v-if="singerShow">
          <router-link :to="'/singer/' + singerInfo.singerMID">
            <el-card v-if="hasSinger">
              <img :src="singerInfo.singerPic" class="image" />
              <div>
                <p>
                  <span class="singer-detail-name">{{
                    singerInfo.singerName
                  }}</span>
                </p>
                <p>
                  <span class="song-info">
                    {{ "单曲: " + singerInfo.songNum }}
                  </span>
                  <span class="song-info">
                    {{ "专辑: " + singerInfo.albumNum }}
                  </span>
                </p>
              </div>
            </el-card>
          </router-link>
          <div v-if="!hasSinger">
            没有歌手信息
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import searchApi from "@/api/search";
import { mapActions, mapMutations } from "vuex";
export default {
  name: "searchResult",
  data() {
    return {
      songsShow: true,
      singerShow: false,
      showPlayBtn: true,
      loading: true,
      loadingText: "",
      count: 100,
      tableData: [],
      totalNum: 0,
      singerInfo: "",
      hasSinger: false,
      scrollTop: 0,
      queryInfo: {
        key: "",
        catZhida: "0",
        page: 1,
        limit: 20
      }
    };
  },
  created() {
    this.queryInfo.key = this.$route.params.searchContent;
    this.loadingText = "拼命加载中..";
  },
  methods: {
    load() {
      this.queryInfo.limit = this.queryInfo.limit + 10;
      if (this.queryInfo.limit > 60) {
        if (this.queryInfo.catZhida === "0") {
          this.$refs.songsTable.bodyWrapper.scrollTop = 0;
        }
        this.queryInfo.limit = 20;
        this.queryInfo.page = this.queryInfo.page + 1;
        this.loadingText = "第" + this.queryInfo.page + "页拼命加载中..";
      }
      this._search();
    },
    searchSongs() {
      this.queryInfo.catZhida = "0";
      this.queryInfo.page = 1;
      this.queryInfo.limit = 20;
      this.songsShow = true;
      this.singerShow = false;
      this._search();
    },
    searchSingers() {
      this.songsShow = false;
      this.singerShow = true;
      this.queryInfo.catZhida = "2";
      this.queryInfo.page = 1;
      this.queryInfo.limit = 20;
      this._search();
    },
    _search() {
      if (this.queryInfo.key.trim() === "") {
        this.$message.info("请输入搜索信息");
        return;
      }
      this.loading = true;
      this.$axios
        .get(searchApi, {
          params: this.queryInfo
        })
        .then(response => {
          if (response.data.response.code === 0) {
            this.tableData = response.data.response.data.song.list;
            this.loading = false;
            this.totalNum = response.data.response.data.song.totalnum;
            this.singerInfo = response.data.response.data.zhida.zhida_singer;
            if (this.singerInfo === undefined) {
              if (this.queryInfo.catZhida === "2") {
                this.$message.info("查无歌手信息");
                this.hasSinger = false;
              }
              return;
            }
            if (
              this.singerInfo.singerMID !== undefined &&
              this.singerInfo.singerMID != null
            ) {
              this.hasSinger = true;
            } else {
              this.hasSinger = false;
            }
          } else {
            this.$message.error("error");
          }
        });
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
    ...mapActions(["selectPlay"]),
    ...mapMutations(["SET_PLAYING_STATE"])
  },
  filters: {
    addQuotation: function(value) {
      return '"' + value + '"';
    },
    deleteLastCharacter: function(value) {
      return value.substring(0, value.length - 1);
    }
  },
  watch: {
    $route() {
      this.queryInfo.key = this.$route.params.searchContent;
      this._search();
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/variable";
.search {
  height: 91%;
  position: relative;
  top: -15px;
  .searchContent {
    height: 55px;
    width: 100%;
    background-color: #f3f3f3;
    p {
      padding-left: 20px;
      line-height: 55px;
      color: #7a7a7a;
    }
    span {
      font-weight: bold;
    }
  }
  .content {
    .sort {
      ul {
        list-style: none;
        padding-left: 30px;
      }
      li {
        margin-right: 25px;
        float: left;
        font-weight: 500;
        font-size: 13px;
      }
      li:hover {
        color: $select-bg-color;
        cursor: pointer;
      }
      .active {
        color: $select-bg-color;
        padding-bottom: 4px;
        border-bottom: 3px solid $select-bg-color;
      }
      .totalNum {
        color: #a0dfa4;
        float: right;
      }
      .totalNum:hover {
        color: #a0dfa4;
        cursor: Auto;
      }
    }
    .list {
      .el-table {
        padding-left: 20px;
        padding-top: 20px;
        font-family: "Helvetica Neue", Helvetica, "PingFang SC",
          "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
        a {
          text-decoration: none;
          color: black;
        }
        .song-name {
          cursor: pointer;
        }
        .now-play {
          border-radius: 2px;
          color: grey;
          float: right;
          padding: 2px 6px;
          cursor: pointer;
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
        .el-icon-video-play:hover {
          color: $select-bg-color;
        }
        .el-icon-circle-plus-outline:hover {
          color: $select-bg-color;
        }
      }
      .singer-list {
        position: relative;
        left: 20px;
        top: 20px;
        width: 96%;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        a {
          text-decoration: none;
        }
        .el-card {
          width: 200px;
          height: 250px;
          text-align: center;
          p {
            margin-top: 10px;
            margin-bottom: 8px;
          }
          p:nth-child(2) {
            margin-top: 0px;
          }
          .image {
            border-radius: 50%;
            width: 100%;
            display: block;
          }
          .singer-detail-name {
            font-size: 14px;
            cursor: pointer;
          }
          .singer-detail-name:hover {
            color: $select-bg-color;
          }
          .song-info {
            font-size: 12px;
            color: #b4b4b4;
          }
        }
        .el-card:hover {
          transform: translateY(-5px);
          transition: all 0.5s;
          background-color: rgba(122, 122, 122, 0.3);
        }
      }
    }
  }
}
</style>
