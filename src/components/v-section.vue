<template>
  <div class="section">
    <!--      <div class="searchConfig"></div>-->
    <v-header></v-header>
    <router-view></router-view>
  </div>
</template>

<script>
import VHeader from "@/components/v-header";
export default {
  name: "VSection",
  components: {
    VHeader
  }
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/variable";
.section {
  position: relative;
  margin-left: $menu-width;
  height: 100%;
}
</style>
