<template>
  <div class="search">
    <div class="searchContent">
      <p>
        搜索内容: <span>{{ queryInfo.key | addQuotation }}</span>
      </p>
    </div>
    <div class="content">
      <div class="sort">
        <ul>
          <li :class="activeIndex === 1 ? 'active' : ''">歌曲</li>
          <li :class="activeIndex === 2 ? 'active' : ''">歌手</li>
          <li :class="activeIndex === 3 ? 'active' : ''">专辑</li>
        </ul>
      </div>
      <div class="list"></div>
    </div>
  </div>
</template>

<script>
import searchApi from "@/api/search";
export default {
  name: "searchResult",
  data() {
    return {
      songList: [],
      singerList: [],
      albumList: [],
      activeIndex: 1,
      queryInfo: {
        key: "",
        catZhida: "0",
        page: "1",
        limit: "10"
      }
    };
  },
  created() {
    this.queryInfo.key = this.$route.params.searchContent;
    this._search();
  },
  methods: {
    _search() {
      if (this.queryInfo.key.trim() === "") {
        return;
      }
      this.$axios
        .get(searchApi, {
          params: this.queryInfo
        })
        .then(response => {
          console.log(response);
          if (response.data.response.code === 0) {
            this.songList = response.data.response.data.song.list;
            console.log(this.songList);
          } else {
            alert("error");
          }
        });
    }
  },
  filters: {
    addQuotation: function(value) {
      return '"' + value + '"';
    }
  },
  watch: {
    $route() {
      this.queryInfo.key = this.$route.params.searchContent;
      this._search();
    }
  }
};
</script>

<style lang="scss" scoped>
.search {
  height: 709px;
  position: relative;
  top: -15px;
  .searchContent {
    height: 55px;
    width: 100%;
    background-color: #f3f3f3;
    p {
      padding-left: 20px;
      line-height: 55px;
      color: #7a7a7a;
    }
    span {
      font-weight: bold;
    }
  }

  .content {
    .sort {
      ul {
        list-style: none;
        padding-left: 30px;
      }
      li {
        margin-right: 25px;
        float: left;
        font-weight: 500;
      }
      li:hover {
        color: #31c27c;
        cursor: pointer;
      }
      .active {
        color: #31c27c;
        padding-bottom: 4px;
        border-bottom: 3px solid #31c27c;
      }
    }
  }
}
</style>
