<template>
  <div class="header">
    <div class="pull-left history-btn" @click="back()">
      <i class="iconfont icon-prev"></i>
    </div>
    <div class="pull-left history-btn" @click="forward()">
      <i class="iconfont icon-next"></i>
    </div>
    <div class="pull-left">
      <input
        v-model="searchContent"
        type="text"
        class="search-input iconfont"
        placeholder="搜索音乐"
      />
      <button class="search-btn" @click="search()">
        <i class="iconfont icon-suosou"></i>
      </button>
    </div>
    <div class="clear"></div>
  </div>
</template>

<script>
export default {
  name: "VHeader",
  data() {
    return {
      searchContent: ""
    };
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    forward() {
      this.$router.go(1);
    },
    search() {
      if (this.searchContent.trim() === "") {
        this.$message.info("请输入搜索信息");
        return;
      }
      this.$router.push({
        name: "search",
        params: {
          searchContent: this.searchContent
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/variable";
.header {
  padding-left: 20px;
  padding-top: 10px;
  height: 50px;
  .history-btn {
    margin-right: $module-margin;
    height: 30px;
    line-height: 30px;
    cursor: pointer;
  }
  .search-input {
    border-radius: $border-radius-bg;
    outline: none;
    border: none;
    height: 30px;
    width: 250px;
    background-color: #e6e6e6;
    padding-left: 25px;
  }
  .search-btn {
    margin-left: -30px;
    z-index: 10;
    cursor: pointer;
    background-color: transparent;
    border: 0;
    outline: 0;
  }
  .search-btn:hover {
    color: #31c27c;
  }
  .clear {
    clear: both;
  }
}
</style>
