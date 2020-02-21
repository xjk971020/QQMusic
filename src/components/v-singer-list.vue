<template>
  <div class="singer-list">
    <div class="singer-list-info">
      <div
        class="singer-info"
        v-for="(singer, index) in singerList"
        :key="index"
      >
        <router-link :to="'/singer/' + singer.singer_mid">
          <div class="img" v-lazy:background-image="singer.singer_pic"></div>
          <div class="singer-name">{{ singer.singer_name }}</div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "VSingerList",
  props: {
    singerList: {
      type: Array
    }
  },
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/variable";
.singer-list {
  height: 85%;
  overflow: scroll;
  .singer-list-info {
    margin: 0 auto;
    height: 100%;
    width: 99%;
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
      "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    .singer-info {
      float: left;
      margin: 22px 22px;
      a {
        text-decoration: none;
        color: $black;
      }
      .img {
        height: 200px;
        width: 200px;
        border-radius: 50%;
      }
        .img:hover {
            box-shadow: 0 0 5px #999;
        }
      .singer-name {
        padding-top: 10px;
        width: 200px;
        text-align: center;
      }
      .singer-name:hover {
        color: $select-bg-color;
      }
    }
      .singer-info:hover {
          transition: all 0.3s;
          transform: scale(1.2);
      }
  }
}
</style>
