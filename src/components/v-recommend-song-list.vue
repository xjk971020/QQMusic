<template>
  <div class="recommendSongList">
    <div class="title">
      <div class="btns">
        <div class="btn prev" @click="prev">
          <i class="iconfont icon-prev"></i>
        </div>
        <div class="btn next" @click="next">
          <i class="iconfont icon-next"></i>
        </div>
      </div>
    </div>
    <div class="body"></div>
  </div>
</template>

<script>
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
  created() {
    console.log(this.recommendNewSongInfo);
  },
  methods: {
    prev() {},
    next() {}
  }
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/variable";
.recommendSongList {
  background-color: $section-bg-color;
  .title {
    padding: $module-padding;
    border-bottom: 1px solid $border-color;
    overflow: hidden;
  }
  .btns {
    float: left;
    overflow: hidden;
  }
  .btn {
    float: left;
    margin-right: $module-margin;
    width: 20px;
    height: 20px;
    text-align: center;
    cursor: pointer;
    border-radius: 50%;
    border: 1px solid $select-bg-color;
    color: $select-bg-color;
    .iconfont {
      font-size: 12px;
    }

    &.active {
      cursor: default;
      border: 1px solid #e9e9e9;
      color: #e9e9e9;
    }
  }
}
</style>
