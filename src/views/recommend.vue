<template>
  <div class="recommendContent">
    <el-carousel trigger="click" :interval="4000" type="card" height="200px">
      <el-carousel-item v-for="(imgInfo, index) in focus" :key="index">
        <a
          :href="
            'https://y.qq.com/n/yqq/album/' +
              imgInfo.jump_info.url +
              '.html'
          "
          target="_blank"
        >
          <img
            class="focusImg"
            :src="imgInfo.pic_info.url"
            alt="获取图片失败"
          />
        </a>
      </el-carousel-item>
    </el-carousel>
    <!-- 推荐歌单 -->
    <div class="recommend">
      <p class="recommendName">
        <span class="title">推荐歌单</span>
        <router-link to="/sheet">
          <span class="more">更多<i class="iconfont icon-next"></i></span>
        </router-link>
      </p>
      <v-recommend-list
        :recommendPlayList="recommendPlayList"
      ></v-recommend-list>
    </div>
    <div class="recommend">
      <p class="recommendName">
        <span class="title">最新发行</span>
      </p>
      <v-recommend-song-list
        :recommendNewSongInfo="recommendNewSongInfo"
      ></v-recommend-song-list>
    </div>
  </div>
</template>

<script>
import recommendApi from "@/api/recommend";
import VRecommendList from "@/components/v-recommend-list";
import VRecommendSongList from "@/components/v-recommend-song-list";
export default {
  name: "VSelected",
  components: { VRecommendSongList, VRecommendList },
  data() {
    return {
      // 推荐的轮播图
      focus: [],
      recommendPlayList: [],
      recommendNewSongInfo: []
    };
  },
  created() {
    this.getRecommend();
  },
  methods: {
    getRecommend() {
      this.$axios.get(recommendApi).then(response => {
        if (response.data.response.code == 0) {
          this.focus = response.data.response.focus.data.content;
          this.recommendPlayList = response.data.response.recomPlaylist.data.v_hot.splice(
            0,
            5
          );
          this.recommendNewSongInfo = response.data.response.new_song.data.songlist;
          console.log(response.data.response.focus.data.content);
        }
      });
    }
  },
  component: {
    VRecommendList
  }
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/variable";
.recommendContent {
  width: 100%;
  height: 85%;
  overflow: scroll;
  .recommendName {
    height: 20px;
  }
}

.recommend {
  width: 92%;
  margin: 10px auto;
  .title {
    font-weight: 600;
    float: left;
    font-size: 25px;
  }
  .more {
    line-height: 20px;
    float: right;
    color: #778079;
  }
  .more:hover {
    color: $select-bg-color;
  }
}

/*轮播图相关*/
.el-carousel {
  height: 38%;
  width: 92%;
  margin: 10px auto;
}

.focusImg {
  width: 100% !important;
  height: 200px;
}
</style>
