<template>
  <div class="nav">
    <div class="musicHall">
      <h4 class="title">
        {{ navTitle[0] }}
      </h4>
      <ul class="list">
        <li v-for="(item, index) in musicHall" :key="index">
          <router-link :to="item.link">
            <i class="iconfont" :class="item.iconName"></i>
            <span class="text">{{ item.name }}</span>
          </router-link>
        </li>
      </ul>
    </div>
    <div class="myMusic">
      <h4 class="title">
        {{ navTitle[1] }}
      </h4>
      <ul class="list">
        <li v-for="(item, index) in myMusic" :key="index">
          <router-link :to="item.link">
            <i class="iconfont" :class="item.iconName"></i>
            <span class="text">{{ item.name }}</span>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "VNav",
  props: {
    navTitle: {
      type: Array,
      default: () => ["error", "error"]
    },
    musicHall: {
      type: Array,
      default: () => []
    },
    myMusic: {
      type: Array,
      default: () => []
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/variable";
.nav {
  padding: 0 $module-padding;
  .list {
    list-style: none;
    padding: 0;
    margin: 0;
    font-size: 15px;
    font-weight: 600;
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    li {
      width: 100%;
      margin: 10px 0px;
      height: $nav-height;
      line-height: $nav-height;
      .iconfont {
        display: inline-block;
        margin-right: 4px;
      }
    }
    li:hover {
      background-color: #e4e4e4;
      border-radius: $border-radius-base;
    }
    a {
      padding: 0 $module-sm-padding;
      display: block;
      text-decoration: none;
      cursor: pointer;
      color: $black;
      padding-left: 10px;
    }
    .router-link-active {
      background-color: $select-bg-color;
      border-radius: $border-radius-base;
    }
  }
  .title {
    font-size: 13px;
    color: #878787;
  }
}
</style>
