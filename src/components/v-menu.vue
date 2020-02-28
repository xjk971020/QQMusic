<template>
  <div class="menu">
    <img src="../assets/images/music-logo.png" alt="logo" />
    <div class="nav-wrap">
      <div>
        <v-nav
          :navTitle="navTitle"
          :musicHall="musicHall"
          :myMusic="myMusic"
        ></v-nav>
      </div>
    </div>
  </div>
</template>

<script>
import VNav from "@/components/v-nav";
export default {
  name: "VMenu",
  components: {
    VNav
  },
  created() {
    this.navTitle = ["音乐馆", "我的音乐"];
    this.musicHall = [
      {
        link: "/recommend",
        name: "精选",
        iconName: "icon-selected"
      },
      {
        link: "/topList",
        name: "排行",
        iconName: "icon-rank"
      },
      {
        link: "/sheets",
        name: "歌单",
        iconName: "icon-sheet"
      },
      {
        link: "/singers",
        name: "歌手",
        iconName: "icon-singer"
      }
    ];
    this.myMusic = [
      {
        link: "/history",
        name: "播放历史",
        iconName: "icon-history"
      },
      {
        link: "/favourite",
        name: "我的收藏",
        iconName: "icon-star"
      }
    ];
  }
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/variable";
.menu {
  background-color: #f0f0f0;
  height: 100%;
  width: 15%;
  position: relative;
  float: left;
  img {
    position: absolute;
    left: calc(42% - 136px / 2);
    top: 20px;
  }
  .nav-wrap {
    position: absolute;
    left: 0;
    right: 0;
    top: 80px;
    bottom: 0;
    width: 100%;
    overflow: hidden;
  }
}
</style>
