<template>
  <div class="recommendAlbumList">
    <div
      class="recommendAlbum"
      v-for="(album, index) in albumInfo"
      :key="index"
    >
      <div
        class="img"
        v-lazy:background-image="album.headpiclist[0].picurl"
        @click="toAlbum(album.album_mid)"
      >
        <div class="player">
          <div class="play-icon">
            <i class="iconfont icon-player"></i>
          </div>
        </div>
      </div>
      <p class="album-name" @click="toAlbum(album.album_mid)">{{ album.album_name }}</p>
      <p class="singers-name">
        <span
          class="singer-name"
          v-for="(singer, index) in album.singerinfo"
          :key="index"
        >
          <span v-if="index !== 0"> / </span>
          <router-link :to="{ path: '/singer/' + singer.singermid }">{{
            singer.singername
          }}</router-link>
        </span>
      </p>
      <p class="time">{{ album.publictime }}</p>
    </div>
  </div>
</template>

<script>
import { getAlbumDetail } from "@/api/album";
export default {
  name: "VRecommendSongList",
  props: {
    recommendNewSongInfo: {
      type: Array,
      default: function() {
        return [];
      }
    }
  },
  data() {
    return {
      albumInfo: []
    };
  },
  created() {},
  methods: {
    _getAllAlbumInfo() {
      this.recommendNewSongInfo.forEach(songInfo => {
        this._getAlbumDetail(songInfo.album.id);
      });
      console.log(this.albumInfo);
    },
    _getAlbumDetail(albumId) {
      getAlbumDetail(albumId).then(response => {
        if (response.code === 0) {
          this.albumInfo.unshift(response.data);
        }
      });
    },
    toAlbum(albummid) {
      this.$router.push({
        name: "albumDetail",
        params: {
          albumId: albummid
        }
      });
    }
  },
  watch: {
    recommendNewSongInfo: function(newVal) {
      if (newVal) {
        this._getAllAlbumInfo();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/mixin";
@import "~@/assets/scss/variable";
.recommendAlbumList {
  display: flex;
  position: relative;
  justify-content: space-between;
  .recommendAlbum {
    width: 200px;
    margin: 10px 4px;
    .img {
      width: 100%;
      border-radius: 10px;
      background-repeat: no-repeat;
      background-position: center center;
      background-size: cover;
      &:hover {
        z-index: 10;
        transition: all 0.3s ease-out;
        transform: translateY(-10px);
      }
      &:hover {
        .player {
          transition: all 0.3s ease-out;
          background-color: rgba(0, 0, 0, 0.6);
        }
      }
      .player {
        position: relative;
        width: 200px;
        height: 200px;
        border-radius: 10px;
        cursor: pointer;
        &:hover .play-icon {
          opacity: 1;
        }
        .play-icon {
          opacity: 0;
          position: absolute;
          left: calc(50% - 22px);
          top: calc(50% - 22px);
          width: 44px;
          height: 44px;
          text-align: center;
          line-height: 44px;
          border-radius: 50%;
          background-color: $select-bg-color;
          i {
            font-size: 24px;
            color: white;
          }
          &:hover {
            background-color: #5b9a72;
          }
        }
      }
    }
    p {
      font-size: 14px;
      margin: 5px 0;
    }
    .album-name {
      margin-top: 10px;
      @include text-overflow;
      cursor: pointer;
    }
    .album-name:hover {
      color: $select-bg-color;
    }
    .singers-name {
      span {
        a {
          color: #868686;
          text-decoration: none;
        }
        a:hover {
          color: $select-bg-color;
        }
      }
    }
    .time {
      color: #868686;
    }
  }
}
</style>

<!--p:nth-child(2) {-->

<!--}-->
<!--p:nth-child(3) {-->
<!--font-size: 12px;-->
<!--color: #778079;-->
<!--position: relative;-->
<!--top: -5px;-->
<!--@include text-overflow;-->
<!--}-->
<!--p:hover {-->
<!--color: $select-bg-color;-->
<!--cursor: pointer;-->
<!--}-->
