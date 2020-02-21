<template>
  <div class="singers-index">
    <div class="query-info">
      <div class="btns clearfix">
        <div class="area-info">
          <button
            :class="queryInfo.area === area.id ? 'btn-active' : ''"
            v-for="(area, index) in areaInfo"
            :key="index"
            @click="selectAreaInfo(area.id)"
          >
            {{ area.name }}
          </button>
        </div>
        <div class="sex-info pull-left">
          <button
            :class="queryInfo.sex === sex.id ? 'btn-active' : ''"
            v-for="(sex, index) in sexInfo"
            :key="index"
            @click="selectSexInfo(sex.id)"
          >
            {{ sex.name }}
          </button>
        </div>
        <div class="index-info pull-right">
          <el-select
            @change="selectIndexInfo"
            v-model="queryInfo.index"
            :popper-append-to-body="false"
          >
            <el-option
              v-for="index in indexInfo"
              :key="index.id"
              :label="index.name"
              :value="index.id"
            >
            </el-option>
          </el-select>
        </div>
        <div class="genre-info pull-right">
          <el-select
            @change="selectGenreInfo"
            v-model="queryInfo.genre"
            :popper-append-to-body="false"
          >
            <el-option
              v-for="genre in genreInfo"
              :key="genre.id"
              :label="genre.name"
              :value="genre.id"
            >
            </el-option>
          </el-select>
        </div>
      </div>
    </div>
    <v-singer-list :singerList="singerList"></v-singer-list>
  </div>
</template>

<script>
import { getSingerList } from "@/api/singer";
import VSingerList from "@/components/v-singer-list";
export default {
  name: "Singers",
  components: { VSingerList },
  created() {
    this.getSingerList();
  },
  methods: {
    selectAreaInfo(id) {
      this.queryInfo.area = id;
      this.getSingerList();
    },
    selectSexInfo(id) {
      this.queryInfo.sex = id;
      this.getSingerList();
    },
    selectIndexInfo(id) {
      this.queryInfo.index = id;
      this.getSingerList();
    },
    selectGenreInfo(id) {
      this.queryInfo.genre = id;
      this.getSingerList();
    },
    getSingerList() {
      this.$axios
        .get(getSingerList, {
          params: this.queryInfo
        })
        .then(response => {
          if (response.data.response.code === 0) {
            this.singerList = response.data.response.singerList.data.singerlist;
          } else {
            this.$message.error("获取歌手列表失败");
          }
        });
    }
  },
  data() {
    return {
      // 查询的地址信息
      areaInfo: [
        { id: -100, name: "全部" },
        { id: 200, name: "内地" },
        { id: 2, name: "港台" },
        { id: 5, name: "欧美" },
        { id: 4, name: "日本" },
        { id: 3, name: "韩国" },
        { id: 6, name: "其他" }
      ],
      // 流派信息
      genreInfo: [
        { id: -100, name: "全部" },
        { id: 1, name: "流行" },
        { id: 6, name: "嘻哈" },
        { id: 2, name: "摇滚" },
        { id: 4, name: "电子" },
        { id: 3, name: "民谣" },
        { id: 8, name: "R&B" },
        { id: 10, name: "民歌" },
        { id: 9, name: "轻音乐" },
        { id: 5, name: "爵士" },
        { id: 14, name: "古典" },
        { id: 25, name: "乡村" },
        { id: 20, name: "蓝调" }
      ],
      // 首字母查询信息
      indexInfo: [
        { id: -100, name: "热门" },
        { id: 1, name: "A" },
        { id: 2, name: "B" },
        { id: 3, name: "C" },
        { id: 4, name: "D" },
        { id: 5, name: "E" },
        { id: 6, name: "F" },
        { id: 7, name: "G" },
        { id: 8, name: "H" },
        { id: 9, name: "I" },
        { id: 10, name: "J" },
        { id: 11, name: "K" },
        { id: 12, name: "L" },
        { id: 13, name: "M" },
        { id: 14, name: "N" },
        { id: 15, name: "O" },
        { id: 16, name: "P" },
        { id: 17, name: "Q" },
        { id: 18, name: "R" },
        { id: 19, name: "S" },
        { id: 20, name: "T" },
        { id: 21, name: "U" },
        { id: 22, name: "V" },
        { id: 23, name: "W" },
        { id: 24, name: "X" },
        { id: 25, name: "Y" },
        { id: 26, name: "Z" },
        { id: 27, name: "#" }
      ],
      // 性别信息
      sexInfo: [
        { id: -100, name: "全部" },
        { id: 0, name: "男" },
        { id: 1, name: "女" },
        { id: 2, name: "组合" }
      ],
      queryInfo: {
        area: -100,
        genre: -100,
        index: -100,
        sex: -100
      },
      singerList: []
    };
  }
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/variable";
.singers-index {
  margin: 0 20px;
  height: 85%;
  .query-info {
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
      "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    .btns {
      height: 100px;
      .area-info {
        margin-bottom: 15px;
      }
      button {
        height: 30px;
        width: 80px;
        border-radius: 15px;
        border: #d8d8d8 1px solid;
        outline: none;
        cursor: pointer;
        margin-right: 10px;
      }
      button:hover {
        background-color: #f5f5f5;
        color: $select-bg-color;
      }
    }
  }
}
.btn-active {
  color: $white;
  font-weight: bold;
  background-color: $select-bg-color;
}

.btn-active:hover {
  background-color: $select-bg-color !important;
  color: $white !important;
}
</style>
