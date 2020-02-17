<template>
  <div class="player">
    <div class="mini-player clearfix" :class="{ 'mini-opacity': fullScreen }">
      <v-progress-bar :percent="percent" @upPlay="onupplay"></v-progress-bar>
      <div class="play-intro pull-left">
        <div
          class="pull-left thrum"
          v-lazy:background-image="thrumUrl"
          @click="fullScreenToggle"
        ></div>
        <div class="play-music pull-left">
          <!--此刻正在播放歌曲-->
          <div class="play-music-intro" v-if="!isNull">
            <span @click="fullScreenToggle" class="song-name">
              {{ currentSong.title }}
            </span>
          </div>
          <div class="play-music-intro" v-else>聆听你的心动</div>
          <div class="play-music-time" v-if="!isNull">
            {{ filterTime(currentTime) }} /
            {{ filterTime(currentSong.interval) }}
          </div>
          <div class="play-music-time" v-else>00:00 / 00:00</div>
        </div>
      </div>
      <div class="play-config pull-left clearfix">
        <div @click="changeMode" class="pull-left play-mode">
          <i class="iconfont" :class="playMode"></i>
        </div>
        <div @click="prev" class="pull-left prev-song" :class="disableCls">
          <i class="iconfont icon-prev-song" ></i>
        </div>
        <div
          class="pull-left play-song"
          :class="disablePlaySong"
          @click="togglePlay"
        >
          <i class="iconfont" :class="playIcon" > </i>
        </div>
        <div @click="next" class="pull-left next-song" :class="disableCls">
          <i class="iconfont icon-next-song"></i>
        </div>
      </div>
    </div>
    <audio ref="audio" @canplay="ready" @timeupdate="timeUpdate"></audio>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import { mode } from "@/util/config";
import { shuffle } from "@/util/util";
import VKeyApi from "@/api/VKey";
import LyricApi from "@/api/GetLyric";
import defaultThrum from "./../assets/images/lazyloading.png";
import VProgressBar from "@/components/v-progress-bar";
import Lyric from "lyric-parser";
export default {
  name: "VPlayer",
  data() {
    return {
      songReady: true,
      thrumUrl: "",
      currentTime: 0,
      currentLyric: null,
      currentLineNum: 0,
      currentLineOffsetY: 0
    };
  },
  components: {
    VProgressBar
  },
  created() {
    this.thrumUrl = defaultThrum;
  },
  methods: {
    ...mapMutations([
      "SET_ISNULL_STATE",
      "SET_FULL_SCREEN_STATE",
      "SET_PLAYING_STATE",
      "SET_CURRENT_INDEX",
      "SET_MODE",
      "SET_PLAY_LIST"
    ]),
    ready() {
      this.songReady = true;
    },
    // 点击播放上一首歌曲
    prev() {},
    // 点击播放下一首歌曲
    next() {},
    // 改变播放模式
    changeMode() {
      if (this.isNull) {
        return;
      }
      let playmode = (this.mode + 1) % 3;
      this.SET_MODE(playmode);
      let list = [];
      if (playmode === mode.random) {
        list = shuffle(this.sequenceList);
      } else {
        list = this.sequenceList;
      }
      // this._setCurrentIndex(list);
      this.SET_SEQUENCE_LIST(list);
    },
    // 点击全屏显示事件
    fullScreenToggle() {},
    // 过滤歌曲播放时间
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
    // 歌词滚动播放的监听事件
    _lyricPlay() {
      return "1";
    },
    // 监听audio标签监听的事件
    timeUpdate(e) {
      this.currentTime = e.target.currentTime;
    },
    // 传给子组件进度条的方法, 修改当前音乐播放的进度
    onupplay(percent) {
      let currentTime = percent * this.currentSong.interval;
      this.currentTime = this.$refs.audio.currentTime = currentTime;
    },
    togglePlay() {
      if (!this.songReady) {
        return;
      }
      if (!this.isNull) {
        this.SET_PLAYING_STATE(!this.playing);
      }
      if (this.currentLyric) {
        this.currentLyric.togglePlay();
      }
    }
  },
  computed: {
    ...mapGetters([
      "isNull",
      "playing",
      "playList",
      "fullScreen",
      "currentIndex",
      "mode",
      "currentSong",
      "sequenceList"
    ]),
    // 监控播放图标
    playIcon() {
      return this.playing ? "icon-pause" : "icon-player";
    },
    // 监控播放模式 顺序 单曲  随机
    playMode() {
      return this.mode === mode.sequence
        ? "icon-sequence"
        : this.mode === mode.loop
        ? "icon-loop"
        : "icon-random";
    },
    // 监控前一首后一首播放按钮的样式
    disableCls() {
      return this.songReady ? "" : "disable";
    },
    // 监控播放按钮的样式
    disablePlaySong() {
      return this.songReady ? "" : "disablePlay";
    },
    // 当前歌曲播放到的时间进度
    percent() {
      return this.currentTime / this.currentSong.interval;
    }
  },
  watch: {
    // 当当前歌曲被替换时, 播放组件选择新的歌曲播放
    currentSong(newSong, oldSong) {
      console.log(newSong);
      if (!newSong.mid) {
        return;
      }
      if (newSong.mid === oldSong.mid) {
        return;
      }
      // 如果当前有正在播放的歌曲，则先清除当前播放的歌曲
      if (this.currentLyric) {
        this.currentLyric.stop();
        this.currentLyric = null;
        this.currentTime = 0;
        this.currentLineNum = 0;
      }
      this.$nextTick(() => {
        this.songReady = true;
        this.thrumUrl = `https://y.gtimg.cn/music/photo_new/T002R300x300M000${newSong.album.mid}.jpg?max_age=2592000`;
        this.$axios.get(VKeyApi + newSong.mid).then(response => {
          const url = response.data.response.playLists[0];
          if (url === "http://ws.stream.qqmusic.qq.com/") {
            this.$message.error("音源获取失败(或许收听该歌曲需要vip)");
          }
          this.$refs.audio.src = url;
          this.$refs.audio.play();
          this.SET_ISNULL_STATE(false);
          // 获取歌词
          this.$axios
            .get(LyricApi + newSong.mid)
            .then(response => {
              let lyric = response.data.response.lyric;
              this.currentLyric = new Lyric(lyric, this._lyricPlay);
              // console.log(lyric);
              if (this.playing) {
                this.currentLyric.play();
              }
              if (this.songReady) {
                this.currentLyric.seek(this.currentTime * 1000);
              }
            })
            .catch(() => {
              this.currentLyric = null;
              this.currentLineNum = 0;
              this.currentLineOffsetY = 0;
            });
        });
      });
    },
    // 监控是否在播放
    playing(newPlaying) {
      if (!this.songReady) {
        return;
      }
      let audio = this.$refs.audio;
      this.$nextTick(() => {
        newPlaying ? audio.play() : audio.pause();
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/variable";
.player {
  position: fixed;
  height: 9%;
  bottom: 0;
  width: 100%;
  margin-left: 220px;
  background-color: white;
  z-index: 999;
  .mini-player {
    height: 100%;
    width: 100%;
    z-index: 20;
    .play-config {
      position: relative;
      top: 3px;
      left: 25%;
      height: 100%;
      padding: 8px 5px;
    }
    .play-song {
      margin-left: 4px;
      margin-right: 4px;
      border: 1px solid $select-bg-color;
      background-color: $select-bg-color;
      border-radius: 50%;
      height: 35px !important;
      width: 35px !important;
      z-index: 30;
      position: relative;
      top: -6px;
      line-height: 35px;
      text-align: center;
      cursor: pointer;
      .iconfont {
        font-size: 18px;
        color: $white;
      }
    }
    .prev-song,
    .next-song {
      color: $black;
      font-weight: bold;
      .iconfont {
        font-size: 24px;
      }
    }
    .prev-song,
    .next-song {
      position: relative;
      top: -4px;
      width: 30px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      cursor: pointer;
      .iconfont {
        position: relative;
        top: -1px;
      }
    }
    .play-mode {
      position: relative;
      left: -10px;
      width: 25px;
      height: 25px;
      line-height: 25px;
      text-align: center;
      cursor: pointer;
      .iconfont {
        color: $black;
        position: relative;
        top: -2px;
        font-size: 24px;
      }
      .disable {
        border: 0;
        color: #ccc;
      }
    }
    .disable {
      color: #ccc;
    }
    .disablePlay {
      color: #ccc;
      border: 1px #ccc solid;
    }

    .play-intro {
      height: 100%;
      padding-left: $module-padding;
      padding-right: $module-padding;
      padding-top: 5px;
      padding-bottom: 25px;
      .thrum {
        width: 36px;
        height: 100%;
        background-size: cover;
        cursor: pointer;
      }
      .play-music {
        margin: 0 10px;
        .play-music-intro {
          margin-top: 4px;
          font-size: 13px;
          font-weight: bold;
        }
        .play-music-time {
          margin-top: 5px;
          font-size: 13px;
          color: grey;
        }
      }
    }
  }
}
</style>
