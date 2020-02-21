<template>
  <div class="sheet-index">
    <div class="sort-info">
      <button v-for="(sort, index) in categoriesList" :key="index">
        {{ sort.categoryGroupName }}
      </button>
      <button>全部</button>
    </div>
    <!-- 精选歌单-->
    <div class="selected-sheet-info clearfix">
      <h2 class="title pull-left">
        精选歌单
      </h2>
      <ul class="sort-name-list pull-right">
        <li
          class="pull-left"
          :class="sortId === 1 ? 'sort-active' : ''"
          @click="changeSortIdByNew"
        >
          最新
        </li>
        <li
          class="pull-left"
          :class="sortId === 2 ? 'sort-active' : ''"
          @click="changeSortIdByHot"
        >
          最热
        </li>
      </ul>
    </div>
      <v-sheet-list :categoryId="categoryId" :sortId="sortId"></v-sheet-list>
  </div>
</template>

<script>
import { getSongListCategories } from "@/api/sheet";
import VSheetList from "@/components/v-sheet-list";
export default {
  name: "SheetIndex",
  components: {
    VSheetList
  },
  data() {
    return {
      categoriesList: [],
      //1:最新 2:最热
      sortId: 2,
      categoryId: 10000000
    };
  },
  created() {
    this.getSongListCategories();
  },
  methods: {
    //获取所有的歌单的分类
    getSongListCategories() {
      this.$axios.get(getSongListCategories).then(response => {
        if (response.data.response.code === 0) {
          this.categoriesList = response.data.response.data.categories;
        } else {
          this.$message.error("获取歌单分类信息失败");
        }
      });
    },
    changeSortIdByHot() {
      this.sortId = 2;
    },
    changeSortIdByNew() {
      this.sortId = 1;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/variable";
.sheet-index {
  height: 85%;
  width: 96%;
  margin: 15px auto;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  .sort-info {
    height: 6%;
    width: 100%;
    button {
      width: 90px;
      height: 30px;
      font-size: 15px;
      outline: none;
      border: none;
      background-color: #e6e6e6;
      border-radius: 5px;
      cursor: pointer;
      margin-right: 15px;
    }
    button:hover {
      color: $select-bg-color;
    }
  }
  .selected-sheet-info {
      height:60px;
    .sort-name-list {
      list-style: none;
      li {
        font-size: 14px;
        margin-right: 10px;
        cursor: pointer;
      }
      li:hover {
        color: $select-bg-color;
      }
    }
  }
  .sort-active {
    padding-bottom: 3px;
    border-bottom: 2px solid $select-bg-color;
  }
}
</style>
