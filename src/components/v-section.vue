<template>
  <div class="section">
    <v-header></v-header>
    <transition mode="out-in">
      <router-view></router-view>
    </transition>
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
.v-enter,
.v-leave-to {
  opacity: 0;
  transform: translateX(200px);
}
.v-enter-active,
.v-leave-active {
  transition: all 0.4s ease-in-out;
}
</style>
