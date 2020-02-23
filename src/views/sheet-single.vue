<template>
  <div class="sheet-single">
    <div class="head-info">
      <h2 class="title pull-left">{{ "主题: " + categoryName }}</h2>
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
import VSheetList from "@/components/v-sheet-list";
export default {
  name: "SheetSingle",
  components: {
    VSheetList
  },
  data() {
    return {
      categoryName: "",
      categoryId: 0,
      //1:最新 2:最热
      sortId: 1
    };
  },
  created() {
    this.categoryName = this.$route.params.categoryName;
    this.categoryId = this.$route.params.categoryId;
  },
  methods: {
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
.sheet-single {
  height: 92%;
  width: 98%;
  margin: 15px auto;
  .head-info {
    height: 60px;
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
