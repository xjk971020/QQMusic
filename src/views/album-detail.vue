<template>
  <div class="album-detail">
    <div class="album-info">
      <div class="pull-left img" v-lazy:background-image="albumHeadPicUrl"></div>
      <div class="pull-left"><h1 class="album-name">{{ albumInfo.name }}</h1>
        <p>{{ albumInfo.singername }}</p>
        <p>
          <span>{{ albumInfo.aDate }}</span>
          <span>{{ albumInfo.genre }}</span>
        </p>
        <button class="play-all" @click="playAll()">
          <i class="iconfont icon-player"></i>播放全部
        </button></div>
    </div>
    <ul class="sort">
      <li
        class="pull-left"
        :class="songListShow ? 'sort-active' : ''"
        @click="showSongList()"
      >
        歌曲
      </li>
      <li
        class="pull-left"
        :class="!songListShow ? 'sort-active' : ''"
        @click="notShowSongList()"
      >
        专辑信息
      </li>
    </ul>
    <div v-if="songListShow">
      <v-album-song-list :songList="songList"></v-album-song-list>
      <h1 class="title">该歌手的其他专辑</h1>
      <div class="other-album-wrap">
        <div class="other-album" v-for="(album, index) in otherAlbumInfo" :key="index">
         <div class="image" @click="toAlbumDetail(album.mid)">
           <div class="pic" v-lazy:background-image="album.url">
             <div class="player">
               <div class="player-icon">
                 <i class="iconfont icon-player"></i>
               </div>
             </div>
           </div>
           <p class="name" @click="toAlbumDetail(album.mid)">{{album.name}}</p>
           <p class="time">{{album.time}}</p>
         </div>
        </div>
      </div>
    </div>
    <div class="album-detail-info" v-else>
      <p>
        <span>专辑：</span>
        <span>{{ albumInfo.name }}</span>
      </p>
      <p>
        <span>歌手：</span>
        <span>{{ albumInfo.singername }}</span>
      </p>
      <p>
        <span>流派：</span>
        <span>{{ albumInfo.genre }}</span>
      </p>
      <p>
        <span>语言：</span>
        <span>{{ albumInfo.lan }}</span>
      </p>
      <p>
        <span>唱片公司：</span>
        <span>{{ albumInfo.company }}</span>
      </p>
      <p>
        <span>专辑简介：</span>
        <pre class="desc">{{ albumInfo.desc }}</pre>
      </p>
    </div>
  </div>
</template>

<script>
  import Song from "@/class/song";
import { getAlbumInfo,getSingerAlbums, getAlbumDetail } from "@/api/album";
import VAlbumSongList from "@/components/v-album-song-list";
import List from '@/class/list';
import { mapMutations } from "vuex";
export default {
  name: "AlbumDetail",
  data() {
    return {
      albumId: "",
      albumInfo: {},
      albumHeadPicUrl: "",
      songList: [],
      otherAlbumInfo:[],
      singerAlbums: [],
      songListShow: true
    };
  },
  components: {
    VAlbumSongList
  },
  created() {
    this.albumId = this.$route.params.albumId;
    this._getAlbumInfo();
  },
  beforeRouteUpdate(to, from, next) {
    this.albumId = this.$route.params.albumId;
    this._getAlbumInfo();
    next();
  },
  methods: {
    _getAlbumInfo() {
      this.$axios.get(getAlbumInfo + this.albumId).then(response => {
        if (response.data.response.code === 0) {
          this.songList = this._createSonglist(response.data.response.data.list);
          this.albumInfo = response.data.response.data;
          console.log(this.songList);
          this._getSingerAlbums();
          this._getAlbumDetail();
        } else {
          this.$message.error("获取专辑信息失败");
        }
      });
    },
    _createSonglist(list) {
      let result = [];
      list.forEach(item => {
        result.push(
                new Song({
                  mid: item.songmid,
                  albummid: item.albumid,
                  songname: item.songname,
                  singers: item.singer,
                  albumname: item.albumname,
                  interval: item.interval
                })
        );
      });
      return result;
    },
    _getSingerAlbums() {
      getSingerAlbums(this.albumInfo.singermid,0,5).then(response => {
        if (response.code === 0) {
          this.otherAlbumInfo = this._createSingerAlbums(response.data.list)
          console.log(this.otherAlbumInfo)
        }
      });
    },
    _createSingerAlbums (list) {
      let result = []
      list.forEach(item => {
        result.push(new List({
          id: item.albumID,
          mid: item.albumMID,
          name: item.albumName,
          url: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${item.albumMID}.jpg?max_age=2592000`,
          time: item.pubTime
        }))
      });
      return result;
    },
    _getAlbumDetail() {
      getAlbumDetail(this.albumInfo.id).then(response => {
        if (response.code === 0) {
          this.albumHeadPicUrl = response.data.headpiclist[0].picurl
        }
      });
    },
    ...mapMutations([
      "SET_CURRENT_INDEX",
      "SET_PLAY_LIST",
      "SET_SEQUENCE_LIST"
    ]),
    playAll() {
      this.SET_PLAY_LIST(this.songList);
      this.SET_SEQUENCE_LIST(this.songList);
      this.SET_CURRENT_INDEX(0);
    },
    notShowSongList() {
      this.songListShow = false;
    },
    showSongList() {
      this.songListShow = true;
    },
    toAlbumDetail(albummid) {
      this.$router.push({
        name: "albumDetail",
        params: {albumId: albummid}
      })
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/mixin";
@import "~@/assets/scss/variable";
.album-detail {
  overflow: scroll;
  margin: 0 20px;
  height: 83%;
  font-family: "Microsoft YaHei", 微软雅黑, "MicrosoftJhengHei", 华文细黑,
    STHeiti, MingLiu, serif;
  .album-info {
    height: 200px;
    margin: 5px;
    .img{
      height: 180px;
      width: 180px;
      background-repeat: no-repeat;
      background-size: cover;
      margin-right: 25px;
      border-radius: 5px;
    }
    .album-name {
      margin: 5px 0;
    }
    p {
      font-size: 12px;
      margin: 25px 0;
      color: #868686;
    }
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
  .sort {
    list-style: none;
    height: 16px;
    padding: 0 5px;
    margin-top: 20px;
    margin-bottom: 10px;
    font-size: 15px;
    cursor: pointer;
    li {
      margin-right: 15px;
    }
  }
  .other-album-wrap {
    margin-top: 10px;
    display: flex;
    justify-content: flex-start;
    margin-bottom: 20px;
    .other-album {
      width: 20%;
      .image {
        .name {
          margin-bottom: 10px;
          margin-top: 15px;
          font-size: 14px;
          cursor: pointer;
        }
        .name:hover {
          color: $select-bg-color;
        }
        .time {
          margin: 10px 0;
          font-size: 14px;
          color: #868686;
        }
        .pic {
          width: 200px;
          cursor: pointer;
          border-radius: 10px;
          height: 200px;
          position: relative;
          .player {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            transition: opacity 0.18s ease-out;
            background-color: rgba(0, 0, 0, 0.6);
            border-radius: 10px;
            opacity: 0;
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
          &:hover {
            transform: translateY(-10px);
            transition: all 0.3s;
            .player{
              opacity: 1;
            }
          }
        }
      }
    }
  }
  .album-detail-info {
    margin-top: 30px;
    p {
      display: flex;
      font-size: 14px;
      span:first-child {
        width: 100px;
        min-width: 100px;
      }
      span {
        line-height: 23px;
      }
      .desc {
        margin: 0;
        width: 100%;
        font-family: "Microsoft YaHei", 微软雅黑, "MicrosoftJhengHei", 华文细黑,
          STHeiti, MingLiu, serif;
        line-height: 23px;
        font-size: 14px;
        white-space:pre-wrap;
      }
    }
    p:nth-child(1),
    p:nth-child(2),
    p:nth-child(4),
    p:nth-child(5),
    p:nth-child(6) {
      span:nth-child(2) {
        color: #868686;
      }
      pre {
        color: #868686;
      }
    }
  }
  .sort-active {
    font-weight: bold;
    padding-bottom: 5px;
    color: $select-bg-color;
    border-bottom: 2px solid $select-bg-color;
  }
}
</style>
