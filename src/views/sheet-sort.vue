<template>
  <div class="sheet-sort-wrap">
    <div class="sheet-sort">
      <h1 class="title">全部分类</h1>
      <div class="sheet-sort-info">
        <div
          class="category-single"
          v-for="(category, index) in categoriesList"
          :key="index"
        >
          <div class="category-title">{{ category.categoryGroupName }}</div>
          <div class="sort-info">
            <div
              class="sort-name"
              v-for="(sort, index) in changeArrayLength(category.items)"
              :key="index"
              @click="toSheetSingle(sort.categoryId, sort.categoryName)"
            >
              {{ transCharacter(sort.categoryName) }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getSongListCategories } from "@/api/sheet";
export default {
  name: "SheetSort",
  data() {
    return {
      categoriesList: []
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
          this.categoriesList.splice(0, 1);
          console.log(this.categoriesList);
        } else {
          this.$message.error("获取歌单分类信息失败");
        }
      });
    },
    changeArrayLength(array) {
      let length = array.length;
      let yu = length % 6;
      if (yu > 0) {
        let newLength = 6 * Math.ceil(length / 6);
        for (; length < newLength; length++) {
          array.push({});
        }
      }
      return array;
    },
    transCharacter(name) {
      if (name !== undefined) {
        return name.replace("&#38;", "&");
      }
    },
    toSheetSingle(categoryId, categoryName) {
      this.$router.push({
        name: "sheetSingle",
        params: {
          categoryId: categoryId,
          categoryName: categoryName
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.sheet-sort-wrap {
  height: 85%;
  width: 100%;
  overflow: scroll;
  .sheet-sort {
    margin: 10px 20px;
    height: 100%;
    .sheet-sort-info {
      width: 1230px;
      .category-single {
        font-family: "Helvetica Neue", Helvetica, "PingFang SC",
          "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
        background-color: #e6e6e6;
        border-radius: 5px;
        margin: 50px 20px;
        display: flex;
        .category-title {
          width: 170px;
          min-width: 170px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid #d0d0d0;
        }
        .sort-info {
          display: flex;
          flex-wrap: wrap;
          .sort-name {
            text-align: center;
            min-width: 170px;
            width: 170px;
            height: 50px;
            line-height: 50px;
            border: 1px solid #d0d0d0;
            cursor: pointer;
          }
          .sort-name:hover {
            background-color: #dfdfdf;
          }
        }
      }
    }
  }
}
</style>
