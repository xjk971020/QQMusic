<template>
  <div class="recommendSheetList">
    <div
      class="recommendSheet"
      v-for="(sheet, index) in recommendPlayList"
      :key="index"
    >
      <div class="img" v-lazy:background-image="sheet.cover">
        <div class="player">
          <div class="play-icon">
            <i class="iconfont icon-player"></i>
          </div>
        </div>
      </div>
      <p>{{ sheet.title | cutRecommendSheetName }}</p>
      <p>{{ sheet.username }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "VRecommendList",
  props: {
    recommendPlayList: {
      type: Array,
      default: function() {
        return [];
      }
    }
  },
  data() {
    return {};
  },
  filters: {
    cutRecommendSheetName(value) {
      if (value.length > 15) {
        return value.substr(0, 12) + "...";
      }
      return value;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/variable";
.recommendSheetList {
  display: flex;
  position: relative;
  justify-content: space-between;
  .recommendSheet {
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

    p:nth-child(2) {
      font-size: 14px;
    }
    p:nth-child(3) {
      font-size: 12px;
      color: #778079;
      position: relative;
      top: -5px;
    }
    p:hover {
      color: $select-bg-color;
      cursor: pointer;
    }
  }
}
</style>
