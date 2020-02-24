<template>
  <div class="singer-detail">
    <div class="singer-info clearfix">
      <img
        class="thumb pull-left"
        v-lazy="
          'https://y.gtimg.cn/music/photo_new/T001R300x300M000' +
            singerMid +
            '.jpg?max_age=2592000'
        "
        :onerror="errImg"
      />
      <div class="thumb-state">
        <h2 class="title">{{ singerInfo.singer_name }}的歌曲</h2>
        <p class="stars">粉丝数: {{ statNums }}</p>
        <p class="desc">
          <span>单曲: {{ singerInfo.total }}</span>
          |
          <span>专辑: {{ singerAlbumsLength }}</span>
        </p>
      </div>
    </div>
    <ul class="sort">
      <li :class="sortId === 1 ? 'sort-active' : ''" @click="sortId = 1">
        精选
      </li>
      <li :class="sortId === 2 ? 'sort-active' : ''" @click="sortId = 2">
        {{ "歌曲" + singerInfo.total }}
      </li>
      <li :class="sortId === 3 ? 'sort-active' : ''" @click="sortId = 3">
        {{ "专辑" + singerAlbumsLength }}
      </li>
      <li :class="sortId === 4 ? 'sort-active' : ''" @click="sortId = 4">
        详情
      </li>
    </ul>
    <div class="selected" v-if="sortId === 1">
      <div class="hot-song-wrap clearfix">
        <h2 class="title pull-left ">热门歌曲</h2>
        <span class="pull-right" @click="sortId = 2"
          >更多<i class="iconfont icon-next"></i
        ></span>
        <v-singer-song-list
          :singermid="singerMid"
          :isHot="true"
        ></v-singer-song-list>
      </div>
      <div class="hot-album-wrap clearfix">
        <h2 class="title pull-left">热门专辑</h2>
        <span class="pull-right" @click="sortId = 3"
          >更多<i class="iconfont icon-next"></i
        ></span>
        <div>
          <v-album-list :isHot="true" :singermid="singerMid"></v-album-list>
        </div>
      </div>
      <div class="simple-singer-wrap">
        <h2 class="title">相似歌手</h2>
        <v-singer-list :singerList="simSinger"></v-singer-list>
      </div>
    </div>
    <div class="song-list" v-if="sortId === 2">
      <v-singer-song-list :singermid="singerMid"></v-singer-song-list>
    </div>
    <div class="album-list" v-if="sortId === 3">
      <v-album-list
        :singermid="singerMid"
        :albumLength="singerAlbumsLength"
      ></v-album-list>
    </div>
    <div class="singer-detail-info" v-if="sortId === 4">
      <p>{{ singerDetailInfo.desc }}</p>
      <h4 class="basic">基本资料</h4>
      <div>
        <p
          class="basic-content"
          v-for="(basic, index) in singerDetailInfo.basic.item"
          :key="index"
        >
          <span class="label">{{ basic.key }}</span>
          <span class="value">{{ basic.value }}</span>
        </p>
      </div>
      <h4 class="congyi">{{ singerDetailInfo.other.item[0].key }}</h4>
      <p>{{ singerDetailInfo.other.item[0].value }}</p>
      <h4 class="rongyu">{{ singerDetailInfo.other.item[1].key }}</h4>
      <pre>{{ singerDetailInfo.other.item[1].value }}</pre>
    </div>
  </div>
</template>

<script>
import {
  getSimSingers,
  getSingerDetail,
  getSingerStarNum,
  getSingerDetailApi
} from "@/api/singer";
import { getSingerAlbums } from "@/api/album";
import List from "@/class/list";
import Song from "@/class/song";
import Singer from "@/class/singer";
import VAlbumList from "@/components/v-album-list";
import VSingerSongList from "@/components/v-singer-song-list";
import VSingerList from "@/components/v-singer-list";
export default {
  name: "SingerDetail",
  components: {
    VAlbumList,
    VSingerSongList,
    VSingerList
  },
  data() {
    return {
      errImg: 'this.src="' + require("@/assets/images/error_singer.png") + '"',
      singerMid: "",
      simSinger: [],
      songList: [],
      singerAlbumsLength: 0,
      singerAlbums: [],
      singerInfo: {},
      singerDetailInfo: {},
      statNums: 0,
      //精选中的十首歌曲
      hotSongLists: [],
      // 判断当前所属标签: 1、精选  2、歌曲 3、专辑 4、简介
      sortId: 1
    };
  },
  created() {
    if (this.$route.params.singerMid.trim() === "") {
      return;
    }
    this.singerMid = this.$route.params.singerMid;
    this._getData(this.singerMid);
  },
  beforeRouteUpdate(to, from, next) {
    this.singerMid = to.params.singermid;
    this._getData(this.singerMid);
    next();
  },
  methods: {
    _getData() {
      this._getSimSinger(this.singerMid, 0, 5);
      this._getSingerDetail(this.singerMid, 0, 10);
      this._getSingerAlbums(this.singerMid, 0, 5);
      this._getSingerStarNum(this.singerMid);
      this._getSingerDetailInfo(this.singerMid);
    },
    _getSingerDetailInfo(mid) {
      this.$axios.get(getSingerDetailApi + mid).then(response => {
        let res = this.$x2js.xml2js(response.data.response);
        if (res.result.code === "0") {
          this.singerDetailInfo = res.result.data.info;
          console.log(this.singerDetailInfo);
        }
      });
    },
    _getSingerStarNum(mid) {
      this.$axios.get(getSingerStarNum + mid).then(response => {
        if (response.data.response.code === 0) {
          this.statNums = this.filterCount(response.data.response.num);
        }
      });
    },
    _getSimSinger(mid, start, num) {
      getSimSingers(mid, start, num).then(res => {
        this.simSinger = this._createSimSingers(res.singers.items);
        console.log(this.simSinger);
      });
    },
    _getSingerDetail(mid, begin, num) {
      getSingerDetail(mid, begin, num).then(res => {
        if (res.code === 0) {
          this.singerInfo = res.data;
          console.log(this.singerInfo);
          this.songList = this._createSonglist(res.data.list);
        }
      });
    },
    _getSingerAlbums(mid, begin, num) {
      getSingerAlbums(mid, begin, num).then(res => {
        if (res.code === 0) {
          this.singerAlbumsLength = res.data.total;
          this.singerAlbums = this._createSingerAlbums(res.data.list);
        }
      });
    },
    _createSimSingers(list) {
      let result = [];
      list.forEach(item => {
        result.push(
          new Singer({
            singer_mid: item.mid,
            singer_pic: item.pic,
            singer_name: item.name
          })
        );
      });
      return result;
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
    _createSonglist(list) {
      let result = [];
      list.forEach(item => {
        result.push(
          new Song({
            mid: item.musicData.songmid,
            albummid: item.musicData.albumid,
            songname: item.musicData.songname,
            singers: item.musicData.singer,
            albumname: item.musicData.albumname,
            interval: item.musicData.interval
          })
        );
      });
      return result;
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
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/variable";
.singer-detail {
  height: 85%;
  overflow: scroll;
  margin: 0 20px;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  .singer-info {
    .thumb {
      height: 200px;
      width: 200px;
      border-radius: 50%;
      margin-right: 20px;
    }
    .thumb-state {
      .title {
        margin: 10px 0;
        font-family: "Microsoft YaHei", 微软雅黑, "MicrosoftJhengHei", 华文细黑,
          STHeiti, MingLiu, serif;
      }
      .stars {
        margin-top: 110px;
        color: #868686;
        font-size: 14px;
      }
      .desc {
        span {
          color: $select-bg-color;
        }
        font-size: 14px;
      }
    }
  }
  .sort {
    list-style: none;
    height: 15px;
    padding-left: 5px;
    position: relative;
    margin-top: 30px;
    li {
      float: left;
      margin-right: 20px;
      cursor: pointer;
    }
  }
  .selected {
    .title {
      margin: 10px 0;
    }
    span {
      margin-right: 10px;
      font-size: 14px;
      color: #868686;
      cursor: pointer;
      line-height: 44px;
    }
    span:hover {
      color: $select-bg-color;
    }
    .iconfont {
      font-size: 14px;
    }
  }
  .singer-detail-info {
    margin-left: 20px;
    margin-right: 20px;
    margin-top: 30px;
    p,
    span,
    pre {
      font-size: 13px;
      line-height: 20px;
      color: #868686;
      font-family: "Helvetica Neue", Helvetica, "PingFang SC",
        "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    }
    .basic-content {
      display: flex;
      span:first-child {
        display: inline-block;
        min-width: 100px;
      }
    }
  }
  .sort-active {
    padding-bottom: 3px;
    border-bottom: 2px solid $select-bg-color;
  }
}
</style>
