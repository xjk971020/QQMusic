<template>
  <div
    class="player"
    :style="fullScreen ? 'margin-left:0;' : 'margin-left:220px'"
  >
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
            <span
              @click="fullScreenToggle"
              class="song-name"
              :style="fullScreen ? 'color:white' : ''"
            >
              {{ currentSong.name }}
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
      <div
        class="play-config pull-left clearfix"
        :style="fullScreen ? 'left:45%' : ''"
      >
        <div @click="changeMode" class="pull-left play-mode">
          <i
            class="iconfont"
            :class="playMode"
            :style="fullScreen ? 'color:white' : ''"
          ></i>
        </div>
        <div
          @click="prev"
          class="pull-left prev-song"
          :class="disableCls"
          :style="fullScreen ? 'color:white' : ''"
        >
          <i class="iconfont icon-prev-song"></i>
        </div>
        <div
          class="pull-left play-song"
          :class="disablePlaySong"
          @click="togglePlay"
        >
          <i
            class="iconfont"
            :class="playIcon"
            :style="fullScreen ? 'color:black' : ''"
          >
          </i>
        </div>
        <div
          @click="next"
          class="pull-left next-song"
          :class="disableCls"
          :style="fullScreen ? 'color:white' : ''"
        >
          <i class="iconfont icon-next-song"></i>
        </div>
      </div>
    </div>
    <!--    歌词占满屏幕的div-->
    <div
      class="spread-player"
      v-if="!isNull"
      :class="{ 'spread-player-up': fullScreen }"
      :style="{ height: spreadHeight }"
    >
      <!--      图片背景-->
      <div
        class="background"
        :class="background"
        :style="{ 'background-image': 'url(' + thrumUrl + ')' }"
      ></div>
      <!-- 回退按钮-->
      <div class="back" @click="fullScreenToggle">
        <i class="iconfont icon-prev"></i>
      </div>
      <!-- 右侧的播放信息-->
      <div class="player-content">
        <div class="player-bd">
          <div class="player-mod">
            <div
              class="mod-thrum"
              :style="{ 'background-image': 'url(' + thrumUrl + ')' }"
            ></div>
            <div class="name">{{ currentSong.name }}</div>
            <div class="info">
              <span>歌手:</span>
              <span v-for="(singer, index) in currentSong.singer" :key="index">
                <span v-if="index != 0"> /</span>
                <span @click="fullScreenToggle()"
                  ><router-link
                    :to="{ path: '/singer/' + currentSong.singer[index].mid }"
                  >
                    {{ currentSong.singer[index].name }}
                  </router-link></span
                >
              </span>
              <span class="album-name">专辑:</span>
              <span @click="fullScreenToggle()"
                ><router-link
                  :to="{
                    name: 'albumDetail',
                    params: { albumId: currentSong.album.mid }
                  }"
                  >{{ currentSong.album.name }}</router-link
                ></span
              >
            </div>
            <!-- 歌词信息-->
            <div class="lyric-wrap" v-if="currentLyric">
              <div class="lyric-box" v-iscroll="getIscroll">
                <div
                  class="lyric-info"
                  ref="lyricInfo"
                  v-if="currentLyric.lines.length > 0"
                >
                  <p
                    v-for="(item, index) in currentLyric.lines"
                    :key="index"
                    ref="line"
                    :class="{ on: currentLineNum === index }"
                    v-html="item.txt"
                  ></p>
                </div>
                <div class="lyric-info lyric-default" ref="lyricInfo" v-else>
                  此歌曲为没有填词的纯音乐
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <audio
      ref="audio"
      @canplay="ready"
      @ended="end"
      @timeupdate="timeUpdate"
    ></audio>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import { mode } from "@/util/config";
import { shuffle } from "@/util/util";
import { prefix } from "@/util/dom";
import VKeyApi from "@/api/VKey";
import LyricApi from "@/api/GetLyric";
import defaultThrum from "./../assets/images/lazyloading.png";
import VProgressBar from "@/components/v-progress-bar";
import Lyric from "lyric-parser";
export default {
  name: "VPlayer",
  data() {
    return {
      spreadHeight: 0,
      songReady: false,
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
    this.spreadHeight = document.body.clientHeight + "px";
    window.addEventListener("resize", () => {
      this.spreadHeight = document.body.clientHeight + "px";
    });
  },
  methods: {
    ...mapMutations([
      "SET_ISNULL_STATE",
      "SET_FULL_SCREEN_STATE",
      "SET_SEQUENCE_LIST",
      "SET_PLAYING_STATE",
      "SET_PLAY_LIST",
      "SET_CURRENT_INDEX",
      "SET_MODE",
      "ADD_HISTORY_SONG",
      "ADD_SEQUENCE_SONG"
    ]),
    getIscroll(iscroll) {
      this._resetLyricOffset();
      if (this.currentLyric.lines.length === 0) {
        prefix(this.$refs.lyricInfo, "translate(0px, 0px)");
      } else {
        prefix(this.$refs.lyricInfo, "translate(0px, 200px)");
      }
      iscroll.on("scrollStart", () => {
        iscroll.y = -this.currentLineOffsetY;
      });
    },
    ready() {
      this.songReady = true;
    },
    // 点击播放上一首歌曲
    prev() {
      if (!this.songReady) {
        return;
      }
      if (this.mode === mode.loop || this.playList.length === 1) {
        this.loop();
        if (!this.playing) {
          this.togglePlay();
        }
        if (this.currentLyric) {
          this.currentLyric.seek(0);
        }
        return;
      }
      let index = this.currentIndex - 1;
      if (index === -1) {
        index = this.sequenceList.length - 1;
      }
      this.SET_CURRENT_INDEX(index);
      if (!this.playing) {
        this.togglePlay();
      }
      this.songReady = false;
    },
    // 点击播放下一首歌曲
    next() {
      if (!this.songReady) {
        return;
      }
      if (this.mode === mode.loop || this.sequenceList.length === 1) {
        this.loop();
        if (!this.playing) {
          this.togglePlay();
        }
        if (this.currentLyric) {
          this.currentLyric.seek(0);
        }
        return;
      }
      let index = this.currentIndex + 1;
      if (index === this.sequenceList.length) {
        index = 0;
      }
      this.SET_CURRENT_INDEX(index);
      if (!this.playing) {
        this.togglePlay();
      }
      this.songReady = false;
    },
    // 播放模式中的单曲循环
    loop() {
      this.$refs.audio.currentTime = 0;
      this.$refs.audio.play();
      if (this.currentLyric) {
        this.currentLyric.seek(0);
      }
    },
    // 当前歌曲播放完进行下一首歌曲的播放
    end() {
      if (this.mode === mode.loop) {
        this.loop();
      } else {
        this.next();
      }
    },
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
      this._setCurrentIndex(list);
      this.SET_PLAY_LIST(list);
    },
    _setCurrentIndex(list) {
      let index = list.findIndex(item => {
        return item.mid === this.currentSong.mid;
      });
      this.SET_CURRENT_INDEX(index);
    },
    // 点击全屏显示事件
    fullScreenToggle() {
      if (!this.isNull) {
        this.SET_FULL_SCREEN_STATE(!this.fullScreen);
        console.log(this.fullScreen);
      }
    },
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
    _resetLyricOffset() {
      prefix(this.$refs.lyricInfo, "1s", "TransitionDuration");
    },
    // 歌词滚动播放的监听事件
    _lyricPlay({ lineNum }) {
      if (!this.$refs.lyricInfo) {
        return;
      }
      this.currentLineNum = lineNum;
      if (lineNum > 0) {
        let lineEl = this.$refs.line[lineNum];
        this.currentLineOffsetY = lineEl.offsetTop - 200;
        prefix(
          this.$refs.lyricInfo,
          `translate(0px, ${-this.currentLineOffsetY}px)`
        );
        this._resetLyricOffset();
      }
    },
    // 监听audio标签监听的事件
    timeUpdate(e) {
      this.currentTime = e.target.currentTime;
    },
    // 传给子组件进度条的方法, 修改当前音乐播放的进度
    onupplay(percent) {
      let currentTime = percent * this.currentSong.interval;
      this.currentTime = this.$refs.audio.currentTime = currentTime;
      if (!this.playing) {
        this.togglePlay();
      }
      if (this.currentLyric) {
        this.currentLyric.seek(currentTime * 1000);
      }
    },
    // 点击播放按钮
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
    },
    // 监控是否全屏歌词界面
    background() {
      return this.fullScreen ? "spread-bg" : "";
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
          } else {
            // 将可获取音源的歌曲加入历史歌单中
            let historySongs = window.localStorage.getItem("history_songs");
            if (
              historySongs === undefined ||
              historySongs === null ||
              historySongs.trim() === ""
            ) {
              historySongs = [];
              historySongs.unshift(newSong);
              window.localStorage.setItem(
                "history_songs",
                JSON.stringify(historySongs)
              );
            } else {
              historySongs = JSON.parse(historySongs);
              let exist = false;
              historySongs.forEach(item => {
                if (item.mid === newSong.mid) {
                  exist = true;
                }
              });
              if (!exist) {
                historySongs.unshift(newSong);
                window.localStorage.setItem(
                  "history_songs",
                  JSON.stringify(historySongs)
                );
              }
            }
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
@import "~@/assets/scss/mixin";
@import "~@/assets/scss/variable";
.player {
  position: fixed;
  height: 9%;
  bottom: 0;
  width: 100%;
  background-color: white;
  z-index: 999;
  .mini-player {
    height: 100%;
    width: 100%;
    position: relative;
    z-index: 999;
    .play-config {
      position: absolute;
      top: 27px;
      left: 40%;
      height: 100%;
    }
    .play-song {
      margin-left: 4px;
      margin-right: 4px;
      border: 1px solid $select-bg-color;
      background-color: $select-bg-color;
      border-radius: 50%;
      height: 35px !important;
      width: 35px !important;
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
      background-color: #ccc;
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
  .spread-player {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 10;
    width: 100%;
    margin: 0 auto;
    transition: all 0.3s ease-out;
    transform: translateY(100%);
    background-color: $black;
    color: $white;
    /*点击全屏后Y轴偏移为0*/
    &.spread-player-up {
      transform: translateY(0);
    }
    .back {
      position: absolute;
      left: 0;
      top: 0;
      z-index: 50;
      padding: $module-padding;
      transform: rotate(-90deg);
      cursor: pointer;
      color: $white;
      &:hover {
        color: $select-bg-color;
      }
    }
    .background {
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      width: 100%;
      height: 100%;
      background-repeat: no-repeat;
      background-position: 50%;
      filter: blur(65px);
      opacity: 0.6;
      &.spread-bg {
        background-size: cover;
      }
    }
    .player-content {
      position: relative;
      z-index: 3;
      height: 100%;
      margin: 0 13%;
    }
    .player-bd {
      position: absolute;
      top: 18%;
      bottom: 18%;
      width: 100%;
      min-height: 408px;
    }
    .player-mod {
      margin-left: 500px;
      height: 100%;
      color: rgba(255, 255, 255, 0.4);
      .mod-thrum {
        position: absolute;
        left: 0;
        top: 50%;
        transform: translate(0, -50%);
        width: 336.65px;
        height: 336.65px;
        background-repeat: no-repeat;
        background-size: cover;
      }
      .name {
        height: 24px;
        @include text-overflow;
        font-size: 24px;
        color: $white;
        position: relative;
        top: -30px;
      }
      .info {
        margin-top: $module-margin;
        position: relative;
        top: -30px;
        font-size: 18px;
        .album-name {
          margin-left: 30px;
        }
        a {
          display: inline-block;
          max-width: 40%;
          height: 24px;
          line-height: 24px;
          @include text-overflow;
          text-decoration: none;
          transition: all 0.18s ease-out;
          color: rgba(255, 255, 255, 0.4);
          &:first-child {
            margin-left: 5px;
          }
          &:hover {
            color: $white;
          }
        }
      }
      .lyric-wrap {
        position: absolute;
        left: 0;
        top: 75px;
        bottom: 60px;
        width: 100%;
        overflow: hidden;
        mask-image: linear-gradient(
          to bottom,
          rgba(255, 255, 255, 0) 0,
          rgba(255, 255, 255, 0.6) 15%,
          rgba(255, 255, 255, 1) 25%,
          rgba(255, 255, 255, 1) 75%,
          rgba(255, 255, 255, 1) 85%,
          rgba(255, 255, 255, 0) 100%
        );
        p {
          margin: 0;
          line-height: 34px;
          color: $white;
          &.on {
            transition: all 0.18s ease-out;
            color: $select-bg-color;
          }
        }
      }
      .lyric-box {
        position: absolute;
        left: 500px;
        top: 0;
        right: 0;
        bottom: 0;
      }
    }
  }
  .lyric-default {
    position: relative;
    top: 150px;
  }
}
</style>
