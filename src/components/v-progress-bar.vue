<template>
  <div class="progress-bar-wrap" @click="skipPlay">
    <div class="progress-bar" ref="progressBar">
      <div class="progress-inner" ref="progressInner"></div>
      <div
        class="progress-btn"
        ref="progressBtn"
        v-if="!isNull"
        @mousedown="progressBtnDown"
      ></div>
    </div>
  </div>
</template>

<script>
import { prefix } from "@/util/dom";
import { mapGetters } from "vuex";
//歌曲播放进度条
export default {
  name: "VProgressBar",
  props: {
    percent: {
      type: Number,
      default: function() {
        return 0;
      }
    }
  },
  computed: {
    ...mapGetters(["isNull"])
  },
  created() {
    this.move = {};
  },
  methods: {
    // 鼠标摁住播放条按钮触发事件
    progressBtnDown(e) {
      this.move.init = true;
      this.move.pageX = e.pageX;
      this.move.innerWidth = this.$refs.progressInner.clientWidth;
      document.addEventListener("mousemove", this.progressMove);
      document.addEventListener("mouseup", this.progressUp);
    },
    // 鼠标移动触发事件
    progressMove(e) {
      if (!this.move.init) {
        return;
      }
      e.preventDefault();
      let progressWidth = this.$refs.progressBar.clientWidth;
      let deltaX = e.pageX - this.move.pageX;
      let offsetX = Math.min(
        progressWidth,
        Math.max(0, this.move.innerWidth + deltaX)
      );
      if (!this.isNull) {
        this._calcOffset(offsetX);
      }
    },
    // 鼠标抬起出发事件
    progressUp() {
      this.move.init = false;
      this._upPlay();
      document.removeEventListener("mousemove", this.progressMove);
      document.removeEventListener("mouseup", this.progressUp);
    },
    _upPlay() {
      let progressWidth = this.$refs.progressBar.clientWidth;
      let percent = this.$refs.progressInner.clientWidth / progressWidth;
      this.$emit("upPlay", percent);
    },
    // 监听进度条的跳跃播放
    skipPlay(e) {
      if (!this.isNull) {
        let rect = this.$refs.progressBar.getBoundingClientRect();
        let offsetWidth = e.pageX - rect.left;
        this._calcOffset(offsetWidth);
        this._upPlay();
      }
    },
    _calcOffset(offset) {
      this.$refs.progressInner.style.width = `${offset}px`;
      prefix(this.$refs.progressBtn, `translateX(${offset}px)`);
    }
  },
  watch: {
    percent(newPercent) {
      if (newPercent >= 0 && !this.move.init) {
        let progressWidth = this.$refs.progressBar.clientWidth;
        let offsetWidth = newPercent * progressWidth;
        if (!this.isNull) {
          this._calcOffset(offsetWidth);
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/variable";
.progress-bar-wrap {
  margin: 0 10px;
  padding: 8px;
  width: 84%;
  .progress-bar {
    background-color: #ebebeb;
    width: 100%;
    height: 2px;
  }
  .progress-inner {
    left: 0;
    top: 0;
    bottom: 0;
    width: 0;
    height: 2px;
    background-color: $select-bg-color;
  }
  .progress-btn {
    position: relative;
    top: -5px;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: $select-bg-color;
  }
}
</style>
